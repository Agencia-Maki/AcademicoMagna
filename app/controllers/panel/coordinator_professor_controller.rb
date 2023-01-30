class Panel::CoordinatorProfessorController < ApplicationController
  before_action :check_sessions_professor_and_coordinator

  def manual_calification_by_student
    puntuation = ExamScore.where(:student_answer_id => params[:student_answer_id], 
                                :student_id =>params[:student_id]
                                ).first_or_create(
                                  :student_answer_id => params[:student_answer_id], 
                                  :student_id =>params[:student_id], 
                                  :score => params[:score], 
                                  :feedback => params[:feedback] )
    puntuation.update(  :student_answer_id => params[:student_answer_id], 
                        :student_id =>params[:student_id], 
                        :score => params[:score], 
                        :feedback => params[:feedback])
    if puntuation.student_answer.update(:status => params[:status], :score => params[:score], percent: params[:percent])
      render json: {
        message: "Calificacion registrada con exito",
        status: :ok
      }
    else
      render json: {
        message: "Error al registrar la calificacion",
        status: :unprocessable_entity
      }
    end    
  end

  def update_date_exam
    exam = Exam.find(params[:id])
    exam.update(end: params[:end], status: params[:status])
    render json: {
      data: {
        message: "Examen actualizado",
        status: :ok
      }
    }
  end

  def consolidate_score_by_course
    # course = Course.find(params[:course_id])
    # render json: {

    # }
  end

  protected
    def check_sessions_professor_and_coordinator
      if current_professor.nil? and current_admin.nil?
        render json: {
          data: {
            message: "No tienes permiso para realizar esta acción",
            status: :unauthorized
          }
        }
      end
    end

end