ENV['RAILS_ENV'] ||= 'test'
ENV['DEMO_MODE'] = 'false'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  parallelize(workers: :number_of_processors)
  fixtures :all
end

class ActionDispatch::IntegrationTest
  def login_as(user, password: 'password')
    post api_login_url, params: { user: { email: user.email, password: password } }, as: :json
    assert_response :success, "Expected login to succeed for #{user.email}"
  end

  def logout
    delete api_logout_url, as: :json
    assert_response :success
  end
end
