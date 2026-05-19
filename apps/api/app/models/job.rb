class Job < ApplicationRecord
  belongs_to :user
  has_many :events, dependent: :destroy
  attribute :events
end
