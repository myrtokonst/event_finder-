class BookingsController < ApplicationController

    def create_booking
        user = get_current_user
        event_id = params[:booking][:event_id].to_i
        Booking.find_or_create_by(user_id: user.id, event_id: event_id)
        render json: user.events
    end`

    def delete_booking
        user = get_current_user
        event_id = params[:booking][:event_id].to_i
        Booking.find_by(user_id: user.id, event_id: event_id).destroy
    end 

    def user_index
        token = ENV['EVENT_BRITE_TOKEN']
        user = get_current_user
        event_ids = user.bookings.map(&:event_id)
        events = []
        event_ids.each do |id| 
         response = RestClient.get "https://private-anon-b2c5536763-eventbriteapiv3public.apiary-proxy.com/v3/events&venue&logo/#{id}/", {:Authorization =>  "Bearer #{token}"} 
          json_response = JSON.parse(response)
          events << json_response
        end 
        
        render json: events
    end 
end
