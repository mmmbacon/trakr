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
    @job.save!
    
    if params[:event]
      @event = Event.new(event_params)
      @event.job_id = @job.id
      @event.save!
    end

    if @job
      if @event
        render json: {
          job: @job,
          event: @event
        }
      elsif 
        render json: {
          job: @job
        }
      end
    else 
      render json: {
        status: 500,
        errors: ['Job or Event could not be created']
      }
    end
  end

  def destroy
    @job = Job.find_by(user_id: session[:user_id], id: params[:id])
    @job.destroy
  end

  def update
    @job = Job.find_by(user_id: session[:user_id], id: params[:id])

    if params[:event]
      @event = Event.find_by(job_id: params[:id])
      #If event exists, update it
      if @event 
        @event.update(event_params)
      else
        #Otherwise, create a new event
        @event = Event.new(event_params)
        @event.save!
      end
    end

    @job.update(job_params)
  
    if @job
      if @event
        render json: {
          job: @job,
          event: @event
        }
      elsif 
        render json: {
          job: @job
        }
      end
    else 
      render json: {
        status: 500,
        errors: ['Job or Event could not be created']
      }
    end
    # if @job
    #   render json: {
    #     status: 200,
    #     job: @job
    #   }
    # else 
    #   render json: {
    #     status: 500,
    #     errors: ['Job or Event could not be updated']
    #   }
    # end
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