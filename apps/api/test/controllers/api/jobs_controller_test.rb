require 'test_helper'

class Api::JobsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @other_user = users(:two)
    @job = jobs(:one)
    @other_job = jobs(:three)
  end

  test 'index requires authentication' do
    get api_jobs_url, as: :json

    assert_response :unauthorized
  end

  test 'index returns only current user jobs' do
    login_as(@user)

    get api_jobs_url, as: :json

    assert_response :success
    body = JSON.parse(response.body)
    job_ids = body['jobs'].map { |job| job['id'] }
    assert_includes job_ids, jobs(:one).id
    assert_includes job_ids, jobs(:two).id
    assert_not_includes job_ids, jobs(:three).id
  end

  test 'create job for current user' do
    login_as(@user)

    assert_difference('Job.count', 1) do
      post api_jobs_url, params: {
        job: {
          title: 'Software Engineer',
          company: 'Vance Refrigeration',
          status: 1,
          salary: 80000,
          location: 'Scranton',
        },
      }, as: :json
    end

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 'Software Engineer', body['job']['title']
    assert_equal @user.id, body['job']['user_id']
  end

  test 'destroy only allows deleting own jobs' do
    login_as(@user)

    assert_difference('Job.count', -1) do
      delete api_job_url(@job), as: :json
    end

    assert_response :no_content
  end

  test 'destroy does not remove another users job' do
    login_as(@user)

    assert_no_difference('Job.count') do
      delete api_job_url(@other_job), as: :json
    end

    assert_response :not_found
  end
end
