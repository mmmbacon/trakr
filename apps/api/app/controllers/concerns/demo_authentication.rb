module DemoAuthentication
  extend ActiveSupport::Concern

  DEMO_USER_EMAIL = ENV.fetch('DEMO_USER_EMAIL', 'beetman@shrutefarms.com')

  def demo_mode?
    ENV.fetch('DEMO_MODE', Rails.env.development? ? 'true' : 'false') == 'true'
  end

  def ensure_demo_user_logged_in
    return if logged_in?

    demo_user = User.find_by(email: DEMO_USER_EMAIL)
    return unless demo_user

    @user = demo_user
    login!
  end
end
