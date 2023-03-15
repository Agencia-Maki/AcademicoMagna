class Panel::Admin::LessonsController < ApplicationController
  before_action :set_chapter, only: %i[create index]
  before_action :set_lesson, only: [:update, :destroy]

  def index
    @lessons = @chapter.lessons.order(id: :asc)
    render json: {
      data: @lessons.map { |lesson| {
          id: lesson.id,
          name: lesson.name,
          topics: lesson.topics,
          link_video: lesson.link_video
          }
        }
    }, status: :ok
  end

  def create
    @lesson = Lesson.new
    @lesson.name = params[:name]
    @lesson.topics = params[:topics]
    @lesson.link_video = params[:link_video]
    @lesson.chapter_id = params[:chapter_id]
    if @lesson.save 
      render json: {
        message: "Sesion registrada con exito",
        status: :ok
      } 
    else
      render json: {
        message: @chapter.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  def update
    if @lesson.update(lesson_params)
      render json: {
        message: "Sesion actualizada con exito",
        status: :ok
      }
    else
      render json: {
        message: "Error al actualizar la sesion",
        status: :unprocessable_entit
      }
    end
  end

  def destroy
    @lesson = Lesson.find(params[:id])
    @lesson.destroy
    render json: { 
      message: 'Sesion eliminada con exito', 
      status: :ok
    }
  end

  private
    def set_chapter
      @chapter = Chapter.find(params[:chapter_id])
    end

    def set_lesson
      @lesson = Lesson.find(params[:id])
    end

    def lesson_params
      lesson_attributes = %i[name topics link_video chapter_id]
      params.require(:lesson).permit(lesson_attributes)
    end
end