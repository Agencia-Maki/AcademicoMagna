class Panel::Admin::CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy]

  def index
    @courses = Course.all.order(created_at: :desc).page(params[:page])
    render json: {
      data: @courses,
      current_page: @courses.current_page,
      total_pages: @courses.total_pages,
      per_pages: @courses.limit_value
    }, status: :ok
  end

  def get_all
    @courses = Course.all
    render json: @courses, status: :ok
  end

  def show
    render json: @course
  end

  def new
    @course = Course.new
  end

  def create
    @course = Course.new
    @course.name = params[:name]
    @course.description = params[:description]
    @course.start_date = params[:start_date]
    @course.end_date = params[:end_date]
    @course.status = params[:status]
    @course.cover = params[:cover]
    @course.professor_id = params[:professor_id]
    @course.course_category_id = params[:course_category_id]
    @course.conference_link = params[:conference_link]
    if @course.save
      render json: {
        message: "Programa registrado con exito",
        status: :ok
      }
    else
      render json: {
        message: @course.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  def update
    curso = Course.find(params[:id])
    curso.name = params[:name]
    curso.description = params[:description]
    curso.start_date = params[:start_date]
    curso.end_date = params[:end_date]
    curso.status = params[:status]

    unless params[:cover] == "[object Object]"
      curso.cover = params[:cover]
    end
    curso.professor_id = params[:professor_id]
    curso.course_category_id = params[:course_category_id]
    curso.conference_link = params[:conference_link]

    if curso.save
      render json: {
        message: "Programa actualizado con exito",
        status: :ok
      }
    else
      render json: {
        message: @course.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  def destroy
    @course.destroy
    render json: { 
      notice: 'Programa eliminado con exito', 
      status: :ok
    }
  end


  def get_all_lessons_by_chapter
    @lessons = Lesson.where(chapter_id: params[:chapter_id])
    render json: {
      data: @lessons
    }, status: :ok
  end

  private
    def set_course
      @course = Course.find(params[:id])
    end

    def course_params
      course_attributes = %i[name description start_date end_date status cover conference_link professor_id course_category_id]
      params.require(:course).permit(course_attributes)
    end
end
