class EventsController < ApplicationController

    #maybe unnecessary
    def events_index
        token = ENV['EVENT_BRITE_TOKEN']
        response = RestClient.get 'https://www.eventbriteapi.com/v3/events/search?location.address=london&expand=venue', {:Authorization => 'Bearer I6TB7UGQSPAWLDN3LH7C'}
        # second_response = RestClient.get 'https://www.eventbriteapi.com/v3/events/search?location.address=london&expand=venue&page=2', {:Authorization => 'Bearer I6TB7UGQSPAWLDN3LH7C'}
        json_response = JSON.parse(response)["events"]
        render json: json_response
    end 

    def specific_events
        token = ENV['EVENT_BRITE_TOKEN']
        user = get_current_user
        category_ids = user.categories.map(&:id)

        response = RestClient.get 'https://www.eventbriteapi.com/v3/events/search?location.address=london&location.within=10km&expand=venue', {:Authorization =>  "Bearer #{token}"}
        json_response = JSON.parse(response)["events"].select{|event| category_ids.each{|c| c = event["category_id"].to_i}}
    
        render json: json_response
     
        json_response.each do |event| 
            Event.find_or_create_by(id: event["id"], category_id: event["category_id"])
        end 
    end 

    def search
        token = ENV['EVENT_BRITE_TOKEN']
        date = params[:day]
        category = params[:cat]
        response = RestClient.get "https://www.eventbriteapi.com/v3/events/search?location.address=london&location.within=10km&expand=venue&start_date.keyword=#{date}", {:Authorization =>  "Bearer #{token}"}
        json_response = JSON.parse(response)["events"].select{|event|  event["category_id"] == category}
        render json: json_response
    end 

end