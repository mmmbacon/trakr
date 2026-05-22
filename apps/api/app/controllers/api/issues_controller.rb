class Api::IssuesController < ApplicationController
  include ProjectScoped
  before_action :logged_in_user
  before_action :set_project, only: [:index, :create, :show]
  before_action :set_issue_by_id, only: [:update, :destroy]

  def index
    issues = @project.issues
      .includes(:workflow_state, :project, :activities)
      .order(:number)

    render json: {
      issues: issues.map { |issue| issue.as_json(include_activities: true) },
    }
  end

  def show
    issue = find_issue_by_number!
    render json: { issue: issue.as_json(include_activities: true) }
  end

  def create
    workflow_state = resolve_workflow_state(@project)

    issue = @project.issues.new(issue_params.except(:workflow_state_id, :workflow_slug))
    issue.user = current_user
    issue.workflow_state = workflow_state

    unless issue.save
      return render json: { errors: issue.errors.full_messages }, status: :unprocessable_entity
    end

    create_activity_if_present(issue)

    render json: { issue: issue.reload.as_json(include_activities: true) }, status: :created
  end

  def update
    return unless @issue
    return head :not_found unless @issue.user_id == current_user.id

    previous_state_id = @issue.workflow_state_id

    if @issue.update(issue_update_params)
      record_status_change(previous_state_id) if previous_state_id != @issue.workflow_state_id
      create_activity_if_present(@issue)
      render json: { issue: @issue.reload.as_json(include_activities: true) }
    else
      render json: { errors: @issue.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    return unless @issue
    return head :not_found unless @issue.user_id == current_user.id

    @issue.destroy
    head :no_content
  end

  private

  def set_project
    @project = find_owned_project!(params[:key])
  end

  def set_issue_by_id
    @issue = Issue.find_by(id: params[:id], user_id: current_user.id)
    return if @issue

    head :not_found
  end

  def find_issue_by_number!
    @project.issues
      .includes(:workflow_state, :project, :activities)
      .find_by!(number: params[:number])
  end

  def resolve_workflow_state(project)
    if issue_params[:workflow_state_id].present?
      return project.workflow_states.find(issue_params[:workflow_state_id])
    end

    if issue_params[:workflow_slug].present?
      return project.workflow_states.find_by!(slug: issue_params[:workflow_slug])
    end

    project.backlog_state
  end

  def issue_params
    params.require(:issue).permit(
      :title,
      :description,
      :priority,
      :workflow_state_id,
      :workflow_slug,
    )
  end

  def issue_update_params
    permitted = issue_params
    if permitted[:workflow_slug].present?
      state = @issue.project.workflow_states.find_by!(slug: permitted.delete(:workflow_slug))
      permitted[:workflow_state_id] = state.id
    end
    permitted
  end

  def activity_params
    return nil unless params[:activity]

    params.require(:activity).permit(:body, :kind)
  end

  def create_activity_if_present(issue)
    activity = activity_params
    return if activity.blank? || activity[:body].blank?

    issue.activities.create!(
      kind: activity[:kind].presence || "comment",
      actor_type: "human",
      actor_id: current_user.id,
      body: activity[:body],
    )
  end

  def record_status_change(previous_state_id)
    from_state = WorkflowState.find(previous_state_id)
    to_state = @issue.workflow_state

    @issue.activities.create!(
      kind: "status_change",
      actor_type: "human",
      actor_id: current_user.id,
      body: "Moved from #{from_state.name} to #{to_state.name}",
      metadata: {
        from_state_id: from_state.id,
        to_state_id: to_state.id,
        from_slug: from_state.slug,
        to_slug: to_state.slug,
      },
    )
  end
end
