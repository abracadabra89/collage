class Board < ApplicationRecord
  belongs_to :user
  has_many :images
  has_many :comments
end
