module WorkflowTemplate
  STATES = [
    { name: "Backlog", slug: "backlog", position: 0, category: "backlog" },
    { name: "Triage", slug: "triage", position: 1, category: "backlog" },
    { name: "Ready", slug: "ready", position: 2, category: "active" },
    { name: "In Progress", slug: "in_progress", position: 3, category: "active" },
    { name: "Done", slug: "done", position: 4, category: "done" },
  ].freeze

  module_function

  def seed_for_project!(project)
    STATES.each do |attrs|
      project.workflow_states.find_or_create_by!(slug: attrs[:slug]) do |state|
        state.assign_attributes(attrs)
      end
    end
  end
end
