Rails.application.routes.draw do
  root 'homepage#index'
  resources :homepage, only: [:index], as: "/"
  namespace :api do
    namespace :v1 do
      resources :weather_data, only: [:index, :create, :destroy]
    end
  end
end