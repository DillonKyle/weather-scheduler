Rails.application.routes.draw do
  root 'homepage#index'
  resources :homepage, only: [:index], as: "/"
  namespace :api do
    namespace :v1 do
      get 'locations/fetch_all', to: 'locations#fetch_all'
      resources :locations, only: [:index, :create, :destroy]
    end
  end
end