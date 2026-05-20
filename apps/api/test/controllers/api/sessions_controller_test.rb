require 'test_helper'

class Api::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test 'login with valid credentials' do
    post api_login_url, params: { user: { email: @user.email, password: 'password' } }, as: :json

    assert_response :success
    body = JSON.parse(response.body)
    assert body['logged_in']
    assert_equal @user.email, body['user']['email']
  end

  test 'login with invalid credentials returns 401' do
    post api_login_url, params: { user: { email: @user.email, password: 'wrong' } }, as: :json

    assert_response :unauthorized
    body = JSON.parse(response.body)
    assert_equal 401, body['status']
  end

  test 'logged_in returns user when session exists' do
    login_as(@user)

    get api_logged_in_url, as: :json

    assert_response :success
    body = JSON.parse(response.body)
    assert body['logged_in']
    assert_equal @user.email, body['user']['email']
  end

  test 'logged_in returns false when not authenticated' do
    get api_logged_in_url, as: :json

    assert_response :success
    body = JSON.parse(response.body)
    assert_not body['logged_in']
  end

  test 'logout clears session' do
    login_as(@user)
    logout

    get api_logged_in_url, as: :json
    body = JSON.parse(response.body)
    assert_not body['logged_in']
  end
end
