Rails.application.routes.draw do
  get '/events', to: 'events#events_index'
  get '/your_events', to: 'events#specific_events'
  post '/search', to: 'events#search'

  get '/eb_categories', to: 'categories#categories_index'
  get '/categories', to: 'categories#index'
  
  get '/users', to: 'users#index'
  post '/users', to: 'users#create'
  get '/users/:id', to: 'users#show'
  
  post '/signin', to: 'users#signin'
  post '/signup', to: 'users#signup'
  get '/validate', to: 'users#validate'
  
  post '/usecats', to: 'usecats#create_cat'
  get '/usecats', to: 'usecats#user_cats'
  delete '/usecats', to: 'usecats#delete_cat'

  post '/bookings', to: 'bookings#create_booking'
  delete '/bookings', to: 'bookings#delete_booking'
  get '/bookings', to: 'bookings#user_index'
end
