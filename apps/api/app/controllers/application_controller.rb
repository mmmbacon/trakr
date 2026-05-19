include Api::SessionsHelper
include DemoAuthentication

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  before_action :ensure_demo_user_logged_in, if: :demo_mode?

  helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!

  def login!
    session[:user_id] = @user.id
  end

  def logged_in?
    !!session[:user_id]
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if
    session[:user_id]
  end

  def authorized_user?
    @user == current_user
  end

  def logout!
    reset_session
    @user = nil
  end

  def store_location
    session[:forwarding_url] = request.original_url if request.get?
  end

  private
  def logged_in_user
      unless logged_in?
        store_location
        flash[:danger] = "Please log in."
        redirect_to '/login'
      end
  end
end
