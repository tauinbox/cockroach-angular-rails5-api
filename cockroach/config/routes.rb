Rails.application.routes.draw do

  scope path: '/api' do
    resources :articles
    resources :users
    resources :profiles, only: [:show, :update, :destroy]

    mount_devise_token_auth_for 'User', at: 'auth'    
  end

  match "api" => proc { [404, {}, ['Invalid API endpoint']] }, :via => [:get]
  match "api/*path" => proc { [404, {}, ['Invalid API endpoint']] }, :via => [:get]  

  match "/*path" => redirect("/?goto=%{path}"), :via => [:get]
  
  root to: "home#index"  
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
