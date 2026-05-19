Rails.application.routes.draw do
  root 'static#index'
  #get 'static/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  namespace :api, defaults: { format: 'json' } do
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/logged_in', to: 'sessions#is_logged_in?'
    
    resources :users, only: [:index, :create, :show, :update]
    resources :jobs, only: [:index, :show, :create, :destroy, :update]
    resources :events, only: [:index, :show, :create, :destroy, :update]

  end
  
end


# EXAMPLE
# namespace :admin do
#   root to: 'dashboard#show'
#   resources :products, except: [:edit, :update, :show]
#   resources :categories, except: [:edit, :update, :show]
# end