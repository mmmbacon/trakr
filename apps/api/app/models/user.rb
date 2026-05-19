class User < ApplicationRecord
  has_secure_password

  validates :first_name, :last_name, presence: true
  validates :email, uniqueness: true, presence: true, on: :create
  # validates :password, presence: true

  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  has_many :jobs, dependent: :destroy

  def as_json(options = {})
    super(options.merge({ except: [:password_digest] }))
  end

end