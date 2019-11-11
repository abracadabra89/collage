class BoardSerializer < ActiveModel::Serializer
  attributes :id, :likes
  has_one :user_id
end
