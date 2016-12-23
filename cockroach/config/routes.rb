Rails.application.routes.draw do

  scope path: '/api' do
    resources :articles do
      resources :comments, only: [:create, :update, :destroy]
    end
    
    resources :users do
      resource :profile, only: [:show, :update, :destroy]
    end

    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      # override devise_token_auth registrations_controller
      registrations: 'devise_token_auth_custom/registrations'
    }  
  end

  match "api" => proc { [404, {}, ['Invalid API endpoint']] }, :via => [:get]
  match "api/*path" => proc { [404, {}, ['Invalid API endpoint']] }, :via => [:get]  

  match "/*path" => redirect("/?goto=%{path}"), :via => [:get]
  
  root to: "home#index"  
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
