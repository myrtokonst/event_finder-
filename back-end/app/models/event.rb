class Event < ApplicationRecord
    belongs_to :category
    has_many :bookings
    has_many :users, through: :bookings
end
