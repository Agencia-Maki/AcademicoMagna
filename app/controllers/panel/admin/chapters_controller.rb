class Panel::Admin::ChaptersController < ApplicationController
  before_action :set_chapter, only: [:show, :update, :destroy]

  def index_by_course
    @chapters = Chapter.where(course_id: params[:course_id])
    render json: {
      data: @chapters,      
      status: :ok
    }
  end

  def create
    @chapter = Chapter.new
    @chapter.name = params[:name]
    @chapter.start_date = params[:start_date]
    @chapter.end_date = params[:end_date]
    @chapter.course_id = params[:course_id]
    if @chapter.save 
      render json: {
        message: "Módulo registrado con exito",
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
    if @chapter.update(chapter_params)
      render json: {
        message: "Módulo actualizado con exito",
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
    @chapter.destroy
    render json: { 
      message: 'Módulo eliminado con exito', 
      status: :ok
    }
  end

  private
    def set_chapter
      @chapter = Chapter.find(params[:id])
    end

    def chapter_params
      chapter_params = %i[name start_date end_date course_id]
      params.require(:chapter).permit(chapter_params)
    end
end