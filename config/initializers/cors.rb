Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost' # Replace with the actual domain of your React app, or use '*' for development/testing

    resource '*',
      headers: :any,
      methods: [:get, :post, :patch, :put, :delete, :options, :head],
      credentials: true # Set to false if you don't need to pass cookies or authentication headers across domains
  end
end
