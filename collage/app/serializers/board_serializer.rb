class BoardSerializer < ActiveModel::Serializer
  attributes :id, :likes, :images, :comments
  belongs_to :user
  has_many :images
  has_many :comments
end
