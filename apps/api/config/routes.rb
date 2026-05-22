Rails.application.routes.draw do
  root 'static#index'

  namespace :api, defaults: { format: 'json' } do
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/logged_in', to: 'sessions#is_logged_in?'

    resources :users, only: [:index, :create, :show, :update]

    resources :projects, param: :key, only: [:index, :show, :create]

    scope 'projects/:key', as: :project do
      get 'workflow_states', to: 'workflow_states#index'
      get 'issues', to: 'issues#index', as: :issues
      post 'issues', to: 'issues#create'
      get 'issues/:number', to: 'issues#show', as: :issue, constraints: { number: /\d+/ }
    end

    resources :issues, only: [:update, :destroy]
    resources :issues, only: [] do
      resources :activities, only: [:index, :create]
    end
  end
end
