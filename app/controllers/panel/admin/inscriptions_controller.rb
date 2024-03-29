class Panel::Admin::InscriptionsController < ApplicationController
  before_action :set_inscription, only: [:show, :update, :destroy]

  def index
    @inscriptions = Inscription.all.order(created_at: :desc).page(params[:page])
    render json: {
      data: @inscriptions,
      current_page: @inscriptions.current_page,
      total_pages: @inscriptions.total_pages,
      per_pages: @inscriptions.limit_value
    }, status: :ok
  end

  def detail_by_course
    @inscriptions = Inscription.where(course_id: params[:course_id])
    render json: @inscriptions.map { |inscription| {
      id: inscription.id,
      course: inscription.course,
      professor: inscription.course.professor,
      students: inscription.course.students
      }
    }
  end

  def get_all_by_courses
    @courses = Course.all.order(Arel.sql("CASE courses.status
              WHEN '0' THEN 0
              WHEN '2' THEN 1
              WHEN '1' THEN 2
              ELSE 3
            END, end_date DESC"))
              render json: @courses.map { |course| {
        id: course.id,
        name: course.name,
        professor: course.professor,
        students_count: course.students.count,
        status: course.status,
        category: course.course_category.name
      }
    }
  end

  ################################################### 08 Julio 2022 ##############################################################
  def get_students_by_course
    students = Course.find_by(id: params[:course_id]).students
    render json: students.map { |student| {
      id: student.id,
      full_name: student.first_name + " " + student.last_name, 
      email: student.email,
      phone: student.phone,
      inscription: student.inscriptions.where(course_id: params[:course_id]).first
      }
    }
  end

  def delete_inscription_by_student
    inscription = Inscription.find_by(student_id: params[:student_id], course_id: params[:course_id])
    inscription.destroy
    render json: {
      data: {
        message: "Matricula eliminada correctamente",
        status: :ok
      }
    }
  end



  ################################################################################################################################

  def create
    @inscription = Inscription.new
    @inscription.course_id = params[:course_id]
    @inscription.student_id = params[:student_id]
    @inscription.date_inscription = params[:date_inscription]
    if @inscription.save
      render json: {
        message: "Alumno matriculado con exito",
        status: :ok
      }
    else
      render json: {
        message: @inscription.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  ################################################################################################################################
  #                                                INSCRIPTIONS BY STUDENT IN BLOCK                                              #
  ################################################################################################################################

  def create_inscriptions_in_block
    params[:student_ids].each do |user|
      Inscription.create(course_id: (params[:course_id]).to_i, student_id: user, date_inscription: Time.now) if Inscription.where(course_id: (params[:course_id]).to_i, student_id: user).blank?
    end
    render json: {
      message: "Alumno(s) matriculado(s) con exito",
      status: :ok
    }, status: :ok
  end




  # def update
  #   @course.update(inscription_params)
  #   render json: { notice: 'Programa actualizado con exitro' }, status: :ok
  # end

  # def destroy
  #   @course.destroy
  #   render json: { notice: 'Programa eliminado con exito' }, status: :ok
  # end

  private
    def set_inscription
      @inscription = Inscription.find(params[:id])
    end

    def inscription_params
      inscription_attributes = [:course_id, :student_id, :date_inscription, :status]
      params.require(:inscription).permit(inscription_attributes)
    end
end
