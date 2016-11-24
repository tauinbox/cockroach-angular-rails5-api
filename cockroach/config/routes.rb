Rails.application.routes.draw do

  namespace :api do
    resources :articles
    resources :users

    mount_devise_token_auth_for 'User', at: 'auth'    
  end

  match "api" => proc { [404, {}, ['Invalid API endpoint']] }, :via => [:get]
  match "api/*path" => proc { [404, {}, ['Invalid API endpoint']] }, :via => [:get]  

  # TODO: make it work correctly!
  # match "/*path" => redirect("/?goto=%{path}"), :via => [:get]
  match "/*path" => redirect("/"), :via => [:get]  

  root to: "home#index"  
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
