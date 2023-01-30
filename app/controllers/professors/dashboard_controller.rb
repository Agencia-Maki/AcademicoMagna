class Professors::DashboardController < ApplicationController
  before_action :set_current_professor, only: [:get_current_professor]

  def index
    # redirect_to '/admins/sign_in' if !current_admin
  end

  def get_current_professor
    render json: @professor
  end

  private
    def set_current_professor
      @professor = current_professor
    end
end
