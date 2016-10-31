class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :timeoutable

  validates :email, :password, presence: true
  validates :password, confirmation: true, length: { in: 8..20 }         

  has_many :articles
end
