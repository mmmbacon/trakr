class Activity < ApplicationRecord
  belongs_to :issue

  KINDS = %w[comment status_change claim release agent_run pr_linked created].freeze
  ACTOR_TYPES = %w[human agent system].freeze

  validates :kind, inclusion: { in: KINDS }
  validates :actor_type, inclusion: { in: ACTOR_TYPES }

  def as_json(options = {})
    {
      id: id,
      kind: kind,
      body: body,
      actor: actor_json,
      metadata: metadata,
      created_at: created_at,
      updated_at: updated_at,
    }
  end

  private

  def actor_json
    case actor_type
    when "human"
      user = User.find_by(id: actor_id)
      { type: "human", id: actor_id, name: user ? "#{user.first_name} #{user.last_name}" : "You" }
    when "agent"
      { type: "agent", id: actor_id, name: "Agent" }
    else
      { type: "system", id: nil, name: "System" }
    end
  end
end
