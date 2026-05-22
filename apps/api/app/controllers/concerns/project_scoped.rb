module ProjectScoped
  extend ActiveSupport::Concern

  private

  def current_user
    @current_user ||= User.find(session[:user_id])
  end

  def find_owned_project!(key)
    current_user.projects.find_by!(key: key.to_s.upcase)
  end
end
