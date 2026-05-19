class Api::UsersController < ApplicationController
  before_action :logged_in_user, only: [:index, :show]
  def index
    render json: {
      users: User.all
    }

    # if @users
    #   render json: {
    #     users: @users
    #   }
    # else
    #   render json: {
    #     stats: 500,
    #     errors: ['no users found']
    #   }
    # end
    # render json: User.all.to_json
  end

  def show
    @user = User.find(params[:id])

    if @user
      render json: {
        user: @user
      }
    else 
      render json: {
        status: 500,
        errors: ['user not found']
      }
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!
      render json: {
        status: :created,
        user: @user
      }
    else
      render json: {
        status: 400,
        errors: @user.errors.full_messages
      }, status: 400
    end
  end

  def update
    @user = User.find_by(id: session[:user_id])
    @user.update(user_params)

    if @user.save
      render json: {
        status: :updated,
        user: @user
      }
    else
      render json: {
        status: 400,
        errors: @user.errors.full_messages
      }, status: 400
    end
  end

  private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
