class Api::ActivitiesController < ApplicationController
  before_action :logged_in_user
  before_action :set_issue

  def index
    activities = @issue.activities.order(created_at: :desc)
    render json: { activities: activities.map(&:as_json) }
  end

  def create
    activity = @issue.activities.new(activity_params)
    activity.actor_type = "human"
    activity.actor_id = session[:user_id]
    activity.kind = "comment" if activity.kind.blank?

    if activity.save
      render json: { activity: activity.as_json }, status: :created
    else
      render json: { errors: activity.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_issue
    @issue = Issue.find_by(id: params[:issue_id], user_id: session[:user_id])
    head :not_found unless @issue
  end

  def activity_params
    params.require(:activity).permit(:body, :kind)
  end
end
