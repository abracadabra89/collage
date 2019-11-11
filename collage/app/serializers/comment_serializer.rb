class CommentSerializer < ActiveModel::Serializer
  attributes :id, :description
  has_one :board_id
end
