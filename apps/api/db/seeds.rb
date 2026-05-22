# Demo user and sample projects/issues for portfolio / local development (see DEMO_MODE)

user = User.find_or_initialize_by(email: 'beetman@shrutefarms.com')
user.assign_attributes(
  first_name: 'Dwight',
  last_name: 'Schrute',
  password: 'demo',
  password_confirmation: 'demo'
)
user.save!

return if user.projects.exists?

def seed_issues(project, user, issue_data)
  issue_data.each do |attrs|
    state = project.workflow_states.find_by!(slug: attrs.delete(:workflow_slug))
    issue = project.issues.create!(
      user: user,
      title: attrs[:title],
      description: attrs[:description],
      priority: attrs[:priority] || 'none',
      workflow_state: state,
    )

    (attrs[:comments] || []).each do |comment|
      issue.activities.create!(
        kind: 'comment',
        actor_type: 'human',
        actor_id: user.id,
        body: comment,
      )
    end
  end
end

trakr = user.projects.create!(
  name: 'Trakr',
  key: 'TRK',
  color: '#5E6AD2',
  description: 'Solo issue tracker pivot — agent coordination layer',
)

seed_issues(trakr, user, [
  {
    title: 'Phase 1 domain pivot',
    description: 'Replace jobs with projects, issues, and activities.',
    workflow_slug: 'in_progress',
    priority: 'high',
    comments: ['API and Redux refactor in progress'],
  },
  {
    title: 'Issue panel with URL routing',
    description: 'Slide-over panel replacing modal; deep links.',
    workflow_slug: 'ready',
    priority: 'medium',
  },
  {
    title: 'Board drag-and-drop',
    description: 'Move issues between workflow columns with optimistic updates.',
    workflow_slug: 'backlog',
    priority: 'medium',
  },
  {
    title: 'MCP server v1',
    description: 'Cursor tools: list, create, transition, claim issues.',
    workflow_slug: 'triage',
    priority: 'high',
  },
  {
    title: 'Command palette',
    description: 'Cmd+K search and navigation.',
    workflow_slug: 'backlog',
    priority: 'low',
  },
  {
    title: 'Agent profiles and queue view',
    description: 'Triage and Implementer assignees with claim semantics.',
    workflow_slug: 'backlog',
    priority: 'high',
  },
  {
    title: 'Design token pass',
    description: 'Linear-like density; workflow state colors.',
    workflow_slug: 'done',
    priority: 'none',
    comments: ['Completed in Phase 0'],
  },
])

portfolio = user.projects.create!(
  name: 'Portfolio',
  key: 'BMP',
  color: '#43AA8B',
  description: 'bm-portfolio site and blog',
)

seed_issues(portfolio, user, [
  {
    title: 'Blog post: agent-native backlog',
    description: 'Write-up of Trakr pivot for portfolio.',
    workflow_slug: 'triage',
    priority: 'medium',
  },
  {
    title: 'Update projects section',
    description: 'Refresh Trakr description and screenshot.',
    workflow_slug: 'backlog',
    priority: 'low',
  },
  {
    title: 'Modernizing Trakr post',
    description: 'Published stack modernization article.',
    workflow_slug: 'done',
    priority: 'none',
  },
])
