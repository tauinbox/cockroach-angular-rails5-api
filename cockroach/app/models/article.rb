class Article < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  def num_of_comments
    comments.count
  end
end
