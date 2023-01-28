source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"

gem "rails", "~> 7.0.4", ">= 7.0.4.1"
gem "sprockets-rails"
gem "pg", "~> 1.1"
gem "puma", "~> 5.0"
gem "jsbundling-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]
gem "bootsnap", require: false

gem "devise"
gem "kaminari"
gem "carrierwave"
gem "rmagick"
gem "pundit"
gem "sidekiq", "~> 6.5.7"
gem "sidekiq-cron", "~> 1.7.0"
gem 'redis'

gem 'active_model_serializers', '~> 0.10.0'
gem 'rack-cors'
gem 'httparty'

gem "dotenv-rails", :groups => [:development, :test, :production]

group :development, :test do
  gem "byebug", platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
