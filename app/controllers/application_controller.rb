class ApplicationController < ActionController::Base

  protected
  
  def success_response(_resource, _action)
    render json: {
      message: I18n.t("activerecord.models.#{_resource.class.to_s.downcase}.one") + " " + 
              I18n.t("activerecord.methods.#{_resource.class.to_s.downcase}.#{_action}")
    }, status: :ok
  end

  def error_response(_resource, _action)
    render json: {
      message: I18n.t("general_errors.#{_action}"),
      errors: _resource.errors.full_messages
    }, status: :unprocessable_entity
  end
  
end
