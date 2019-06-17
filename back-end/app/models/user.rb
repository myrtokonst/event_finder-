class User < ApplicationRecord
    has_many :usecats
    has_many :categories, through: :usecats
    has_many :bookings
    has_many :events, through: :bookings
    has_secure_password
end
