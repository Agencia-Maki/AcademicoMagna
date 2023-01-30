class Students::DashboardController < ApplicationController
  before_action :set_current_student, only: [:get_current_student]

  def index
  end

  def get_current_student
    render json: @student
  end

  private
    def set_current_student
      @student = current_student
    end
end
