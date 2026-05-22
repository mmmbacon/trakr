require 'test_helper'

class Api::ProjectsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @other_user = users(:two)
  end

  test 'index requires authentication' do
    get api_projects_url, as: :json
    assert_response :unauthorized
  end

  test 'index returns user projects' do
    login_as(@user)
    project = @user.projects.create!(name: 'Trakr', key: 'TRK', color: '#5E6AD2')

    get api_projects_url, as: :json

    assert_response :success
    body = JSON.parse(response.body)
    assert_includes body['projects'].map { |p| p['key'] }, project.key
  end

  test 'create project seeds workflow states' do
    login_as(@user)

    assert_difference('Project.count', 1) do
      post api_projects_url, params: {
        project: { name: 'New', key: 'NEW', color: '#000000' },
      }, as: :json
    end

    assert_response :created
    project = Project.find_by(key: 'NEW')
    assert_equal 5, project.workflow_states.count
    assert project.workflow_states.exists?(slug: 'backlog')
  end
end
