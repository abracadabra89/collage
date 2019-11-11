class ImageSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :link
  has_one :board_id
end
