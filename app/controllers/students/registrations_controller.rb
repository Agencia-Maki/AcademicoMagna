# frozen_string_literal: true

class Students::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  def new
    # super
    redirect_to '/alumnos'
  end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   student_attibute = [:dni, :code, :first_name, :last_name, :status, :gender, :avatar, :phone, :email, :password, :password_confirmation, :remember_me]
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:student_attibute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    # byebug
    student_attibute = [:email, :avatar, :phone, :password, :password_confirmation, :current_password]
    devise_parameter_sanitizer.permit(:account_update, keys: student_attibute)
  end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
