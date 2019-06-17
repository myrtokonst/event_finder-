class CategoriesController < ApplicationController

    def categories_index
         token = ENV['EVENT_BRITE_TOKEN']
        response = RestClient.get 'https://www.eventbriteapi.com/v3/categories/', {:Authorization => "Bearer #{token}"}
        json_response = JSON.parse(response)["categories"]
       render json: json_response
       json_response.each{|category| Category.find_or_create_by(id: category["id"], name: category["name"])}
    end 

    def index 
        cats = Category.all
        render json: cats
    end 

end
