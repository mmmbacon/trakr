class Issue < ApplicationRecord
  PRIORITIES = %w[none low medium high urgent].freeze

  belongs_to :project
  belongs_to :user
  belongs_to :workflow_state
  has_many :activities, -> { order(created_at: :desc) }, dependent: :destroy

  validates :title, presence: true
  validates :number, presence: true, uniqueness: { scope: :project_id }
  validates :priority, inclusion: { in: PRIORITIES }

  before_validation :assign_number, on: :create
  after_create :record_created_activity

  def identifier
    "#{project.key}-#{number}"
  end

  def as_json(options = {})
    include_activities = options.delete(:include_activities)

    payload = {
      id: id,
      number: number,
      identifier: identifier,
      title: title,
      description: description,
      priority: priority,
      project: project.as_json,
      workflow_state: workflow_state.as_json,
      created_at: created_at,
      updated_at: updated_at,
    }

    if include_activities
      payload[:activities] = activities.map { |activity| activity.as_json }
    end

    payload
  end

  private

  def assign_number
    return if number.present?

    project.with_lock do
      self.number = (project.issues.maximum(:number) || 0) + 1
    end
  end

  def record_created_activity
    activities.create!(
      kind: "created",
      actor_type: "human",
      actor_id: user_id,
      body: "Issue created",
    )
  end
end
