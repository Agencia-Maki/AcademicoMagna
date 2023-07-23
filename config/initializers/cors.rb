Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://crm.magna.edu.pe'
    resource '*', headers: :any, methods: %i[get post]
  end

  allow do
    origins 'https://administracion.magna.edu.pe'
    resource '*', headers: :any, methods: %i[get post put]
  end

  allow do
    origins 'http://127.0.0.1:3000'
    resource '*', headers: :any, methods: %i[get post]
  end

  allow do
    origins 'http://127.0.0.1:8845'
    resource '*', headers: :any, methods: %i[get post]
  end

  allow do
    origins 'http://147.182.136.178'
    resource '*', headers: :any, methods: %i[get post]
  end

  # allow do
  #   origins "*"
  #   resource "*",
  #     headers: :any,
  #     methods: [:get, :post, :put, :patch, :delete, :options, :head],
  #     expose: %w[Authorization Uid]
  # end
  
end