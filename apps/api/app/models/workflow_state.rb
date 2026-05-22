class WorkflowState < ApplicationRecord
  belongs_to :project
  has_many :issues, dependent: :restrict_with_exception

  validates :name, :slug, :category, presence: true
  validates :slug, uniqueness: { scope: :project_id }

  def as_json(options = {})
    super(options.merge(only: [:id, :name, :slug, :position, :category]))
  end
end
