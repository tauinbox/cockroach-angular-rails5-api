Rails.application.routes.draw do
  get 'home/index'

  root to: "home#index"

  resources :articles
  resources :users
  
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
