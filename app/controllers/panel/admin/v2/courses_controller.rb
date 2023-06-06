class Panel::Admin::V2::CoursesController < ApplicationController

  def index
    courses = Course.all
    render json: {
      courses: courses
    }, status: :ok
  end

  def active_index
    courses = Course.where(status: [:in_progress, :on_hold]).order(:id)
    render json: {
      courses: courses
    }, status: :ok
  end

  def inactive_index
    courses = Course.where(status: :completed).order(:id)
    render json: {
      courses: courses
    }, status: :ok
  end

end