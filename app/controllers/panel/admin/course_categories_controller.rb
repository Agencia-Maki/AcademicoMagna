class Panel::Admin::CourseCategoriesController < ApplicationController
  before_action :set_category, only: %i[show update destroy]

  def index
    @categories = CourseCategory.where.not(id: 1)
    render json: @categories
  end

  def new
    @category = CourseCategory.new
  end

  def create
    @category = CourseCategory.new(category_params)
    if @category.save
      render json: {
        message: "Categoria registrada con exito",
        status: :ok
      }
    else
      render json: {
        message: "Error al registrar la categoria",
        status: :unprocessable_entity
      }
    end
  end

  def update
    if @category.update(category_params)
      render json: {
        message: "Categoria actualizada con exito",
        status: :ok
      }
    else
      render json: {
        message: "Error al actualizar la categoria",
        status: :unprocessable_entit
      }
    end
  end

  def destroy
    @courses = @category.courses
    flag_update = false
    if @courses.count > 0
      @courses.each do |course| 
        course.course_category_id = 1
        if course.save!
          flag_update = true
        end
      end
      if flag_update
        @category.destroy
      end
    else
      @category.destroy
    end
    render json: {
      message: "Categoria eliminada con exito",
      status: :ok
    }
  end

  def show
    @courses = @category.courses
    render json: {
      category: @category,
      courses: @courses
    }
  end

  private
    def set_category
      @category = CourseCategory.find(params[:id])
    end

    def category_params
      params.require(:course_category).permit(:name, :slug)
    end
end