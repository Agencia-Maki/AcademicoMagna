Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://crm.magna.edu.pe'
    resource '*', headers: :any, methods: %i[get post]
  end
  allow do
    origins 'http://127.0.0.1:3000'
    resource '*', headers: :any, methods: %i[get post]
  end
end