class Api::JobsController < ApplicationController
  before_action :logged_in_user

  def index
    @user = User.find(session[:user_id])
    @user_jobs = Job.where(user_id: @user.id) #collection
    puts @user.inspect

    if @user_jobs
      render json: {
        jobs: @user_jobs
      }
    else 
      render json: {
        status: 500,
        errors: ['job not found']
      }
    end
  end
  
  def show
    @user = User.find(session[:user_id])
    @job = Job.where(user_id: @user.id, id: params[:id])

    if @job
      render json: {
        job: @job
      }
    else 
      render json: {
        status: 500,
        errors: ['job not found']
      }
    end
  end

  def create
    @user = User.find(session[:user_id])
    @job = Job.new(job_params)
    @job.user_id = @user.id

    unless @job.save
      return render json: { errors: @job.errors.full_messages }, status: :unprocessable_entity
    end

    @event = nil
    if params[:event]
      @event = Event.new(event_params)
      @event.job_id = @job.id
      unless @event.save
        return render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
      end
    end

    if @event
      render json: { job: @job, event: @event }
    else
      render json: { job: @job }
    end
  end

  def destroy
    @job = Job.find_by(user_id: session[:user_id], id: params[:id])
    if @job
      @job.destroy
      head :no_content
    else
      head :not_found
    end
  end

  def update
    @job = Job.find_by(user_id: session[:user_id], id: params[:id])
    return head :not_found unless @job

    @event = nil
    if params[:event]
      @event = Event.find_by(job_id: params[:id])
      if @event
        unless @event.update(event_params)
          return render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end
      else
        @event = Event.new(event_params)
        @event.job_id = @job.id
        unless @event.save
          return render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end

    if @job.update(job_params)
      if @event
        render json: { job: @job, event: @event }
      else
        render json: { job: @job }
      end
    else
      render json: { errors: @job.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  
    def job_params
      params.require(:job).permit(
        :id,
        :user_id,
        :company,
        :title,
        :status,
        :salary,
        :url,
        :location,
        :details,
        :contact_name,
        :contact_email,
        :contact_phone,
        :contact_socialmedia,
        :resume_url,
        :coverletter_url,
        :extra_url,
      )
    end
  
    def event_params
      params.require(:event).permit(
        :id,
        :job_id,
        :title,
        :date,
        :location,
        :details,
      )
    end
end