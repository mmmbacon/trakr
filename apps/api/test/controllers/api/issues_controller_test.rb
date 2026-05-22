require 'test_helper'

class Api::IssuesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @other_user = users(:two)
    @project = @user.projects.create!(name: 'Trakr', key: 'TRK', color: '#5E6AD2')
    @backlog = @project.workflow_states.find_by!(slug: 'backlog')
    @ready = @project.workflow_states.find_by!(slug: 'ready')
    @issue = @project.issues.create!(
      user: @user,
      title: 'Test issue',
      description: 'Details',
      workflow_state: @backlog,
      number: 1,
    )
    @other_project = @other_user.projects.create!(name: 'Other', key: 'OTH', color: '#111111')
    @other_issue = @other_project.issues.create!(
      user: @other_user,
      title: 'Other issue',
      workflow_state: @other_project.backlog_state,
      number: 1,
    )
  end

  test 'index requires authentication' do
    get api_project_issues_url(key: @project.key), as: :json
    assert_response :unauthorized
  end

  test 'index returns project issues' do
    login_as(@user)

    get api_project_issues_url(key: @project.key), as: :json

    assert_response :success
    body = JSON.parse(response.body)
    identifiers = body['issues'].map { |issue| issue['identifier'] }
    assert_includes identifiers, 'TRK-1'
  end

  test 'create issue for project' do
    login_as(@user)

    assert_difference('Issue.count', 1) do
      post api_project_issues_url(key: @project.key), params: {
        issue: {
          title: 'New issue',
          description: 'Body',
          priority: 'medium',
          workflow_slug: 'ready',
        },
      }, as: :json
    end

    assert_response :created
    body = JSON.parse(response.body)
    assert_equal 'New issue', body['issue']['title']
    assert_equal 'TRK-2', body['issue']['identifier']
    assert_equal 'ready', body['issue']['workflow_state']['slug']
  end

  test 'update issue workflow state' do
    login_as(@user)

    patch api_issue_url(@issue), params: {
      issue: { workflow_slug: 'ready' },
    }, as: :json

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 'ready', body['issue']['workflow_state']['slug']
  end

  test 'destroy only allows deleting own issues' do
    login_as(@user)

    assert_difference('Issue.count', -1) do
      delete api_issue_url(@issue), as: :json
    end

    assert_response :no_content
  end

  test 'destroy does not remove another users issue' do
    login_as(@user)

    assert_no_difference('Issue.count') do
      delete api_issue_url(@other_issue), as: :json
    end

    assert_response :not_found
  end
end
