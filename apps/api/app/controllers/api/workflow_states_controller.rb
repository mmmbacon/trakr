class Api::WorkflowStatesController < ApplicationController
  include ProjectScoped
  before_action :logged_in_user

  def index
    project = find_owned_project!(params[:key])
    render json: { workflow_states: project.workflow_states }
  end
end
