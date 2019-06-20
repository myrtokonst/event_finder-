class UsersController < ApplicationController
    def index 
        users = User.all 
        render json: users
    end 

    def show
        user = User.find_by(username: params[:username])
        render json: user
    end 

    def create 
        user = User.find_or_create_by(username: params[:username])
        if user
            render json: user
          else
            render json: {error: "Couldn't create user"}, status: 400
          end
    end 

    def signin
        user = User.find_by(username: params[:user][:username])
        # 
        if user and user.authenticate(params[:user][:password])
            render json: {token: issue_token({id: user.id})}
        else
            render json: {error: "Username and password don't match"}, status: 400 
        end
    end 

    def signup
        user = User.find_by(username: params[:user][:username])
        if user and user.authenticate(params[:user][:password])
            render json: {error: "User already exists"}
        else 
         user = User.create(username: params[:user][:username], password: params[:user][:password])
            if user and user.authenticate(params[:user][:password])
            render json: {token: issue_token({id: user.id})}
            else
            render json: {error: "Creating user failed"}, status: 400 
            end 
        end
    end 

    def validate 
        user = get_current_user
        if user
            render json: {username: user.username}
        else 
            render json: {error: 'Invalid id'}, status: 404 
        end 
    end 
end
