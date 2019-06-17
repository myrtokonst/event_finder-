class UsecatsController < ApplicationController
    require 'rest-client'
    require 'json'

 def index 
    usecats = Usecat.all
    render json: usecats
 end 

 def user_cats
   user = get_current_user
   render json: user.categories
 end 

 def create_cat 
    user = get_current_user
    params[:categories].map{|c| c[:id]}
        .each do |c| 
         Usecat.find_or_create_by(user_id: user.id, category_id: c)
        end 
     render json: user.categories
      end 

 def delete_cat
   user = get_current_user
   cat_id = params[:cat_id]
   user_cat = Usecat.find_by(user_id: user.id, category_id: cat_id)
   user_cat.destroy
   render json: user.categories
 end
end 