class Project < ApplicationRecord
  belongs_to :user
  has_many :workflow_states, -> { order(:position) }, dependent: :destroy
  has_many :issues, dependent: :destroy

  validates :name, :key, presence: true
  validates :key, uniqueness: { scope: :user_id }
  validates :key, format: { with: /\A[A-Z0-9]+\z/, message: "must be uppercase letters and numbers" }

  before_validation :normalize_key

  after_create :seed_workflow_states

  def as_json(options = {})
    super(options.merge(only: [:id, :name, :key, :color, :description, :created_at, :updated_at]))
  end

  def backlog_state
    workflow_states.find_by!(slug: "backlog")
  end

  private

  def normalize_key
    self.key = key.to_s.upcase.strip if key.present?
  end

  def seed_workflow_states
    WorkflowTemplate.seed_for_project!(self)
  end
end
