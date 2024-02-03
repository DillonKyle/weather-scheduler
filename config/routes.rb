Rails.application.routes.draw do
  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      resources :articles, only: [:index] do
      end
    end
  end
end