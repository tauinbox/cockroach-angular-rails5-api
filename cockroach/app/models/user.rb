class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable

  include DeviseTokenAuth::Concerns::User

  before_create :skip_confirmation!

  has_one :profile, dependent: :destroy
  has_many :comments, dependent: :destroy
  
end
