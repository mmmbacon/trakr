require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module ApplicationTrackerFinal
  class Application < Rails::Application
    config.load_defaults 7.2

    config.api_only = false

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
  end
end
