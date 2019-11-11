class ImageSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :link
  belongs_to :board
end
