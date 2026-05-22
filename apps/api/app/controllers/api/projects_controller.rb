class Api::ProjectsController < ApplicationController
  include ProjectScoped
  before_action :logged_in_user

  def index
    projects = current_user.projects.order(:name)
    render json: { projects: projects }
  end

  def show
    project = find_owned_project!(params[:key])
    render json: { project: project }
  end

  def create
    project = current_user.projects.new(project_params)

    if project.save
      render json: { project: project }, status: :created
    else
      render json: { errors: project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :key, :color, :description)
  end
end
