class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :categories, :events
end
