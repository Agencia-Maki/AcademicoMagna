class Panel::Professor::ExamsController < ApplicationController
  before_action :set_exam, only: [:edit, :update, :destroy, :show]
  before_action :set_exam_for_calificate, only: [:revise_exam]
  before_action :set_course, only: :index

  def index
    @exams = @course.exams.order(created_at: :desc)
    render json: {
      data: @exams,
      status: :ok
    }
  end

  def get_all_califications_by_course
    course = Course.find(params[:course_id])
    render json: {
      program: course.name,
      exams: course.exams.map { |exam| {
        name: exam.name,
        percent: exam.percent,
        answers: exam.student_answers.map { |student_answer| {
          student: student_answer.student.first_name + " " + student_answer.student.last_name,
          score: student_answer.exam_score ? student_answer.exam_score.score : "0.0",
          total_value: student_answer.exam_score ? (student_answer.exam_score.score * exam.percent)/100 : "0.0",
          student_id: student_answer.student_id
        }}
      }}
    }
  end

  def show
    @questions = @exam.exam_questions
    render json: {
      exam: {
        id: @exam.id,
        course_id: @exam.course_id,
        file: @exam.file,
        name: @exam.name,
        start: @exam.start,
        end: @exam.end,
        percent: @exam.percent,
        status: @exam.status,
        student_visibility: @exam.student_visibility,
        duration: @exam.duration,
        attempt: @exam.attempt,
        type_exam: @exam.type_exam,
        exam_questions_attributes: @questions.map { |question| {
          id: question.id,
          score: question.score,
          enunciate: question.enunciate,
          feedback: question.feedback,
          exam_id: question.exam_id,
          question_options_attributes: question.question_options
        }}
      },
      status: :ok
    }
  end

  def update 
    flag = false
    if params[:type_exam] == 'manual'
      @exam.name = params[:name]
      @exam.file = params[:file] if params[:file] != "[object Object]"
      @exam.start = params[:start]
      @exam.end = params[:end]
      @exam.percent = params[:percent]
      @exam.status = params[:status]
      @exam.duration = params[:duration]
      @exam.attempt = params[:attempt]
      @exam.student_visibility = params[:student_visibility]
      flag = true if @exam.save
    else
      flag = true if @exam.update(exam_params)
    end
    if flag
      render json: {
        message: "Examen actualizado con exito!",
        status: :ok
      }
    else
      render json: {
        message: "Error al actualizar el examen",
        status: :unprocessable_entity
      }
    end
  end

  def create
    if params[:type_exam] == 'manual'
      @exam = Exam.new()
      @exam.type_exam = params[:type_exam]
      @exam.name = params[:name]
      @exam.file = params[:file]
      @exam.start = params[:start]
      @exam.end = params[:end]
      @exam.percent = params[:percent]
      @exam.course_id = params[:course_id]
      @exam.student_visibility = params[:student_visibility]
    else
      @exam = Exam.new(exam_params)
    end

    if @exam.save
      render json: {
        message: "Examen registrado con exito",
        status: :ok
      }
    else
      render json: {
        message: "Error al registrar el examen",
        status: :unprocessable_entity
      }
    end
  end

  def change_status
    @exam = Exam.find(params[:exam_id])
    @exam.status = params[:status]
    if @exam.save
      render json: {
        message: "Estado del examen cambiado con exito",
        status: :ok
      }
    else
      render json: {
        message: "Error al cambiar el estado del examen",
        status: :unprocessable_entity
      }
    end
  end
  
  # def revise_exam
  #   if @exam.status != "graded" 
  #     acumulate_score = 0
  #     student_answers = @exam.student_answers
  #     student_answers.map { |student_answer|
  #       student_answer.question_answers.map { |question|
  #         question.answer_options.map { |option| 
  #           if option.marked && option.status == "correct"
  #             acumulate_score += option.score
  #           end
  #         }
  #       }
  #       exam_score = ExamScore.new(student_answer_id: student_answer.id, student_id: student_answer.student_id, score: acumulate_score)
  #       exam_score.save
  #       # puts "#{student_answer.student.first_name} CALIFICADO: #{acumulate_score}"
  #       acumulate_score = 0
  #     }
  #     @exam.status = :graded
  #     @exam.save
  #     render json: {
  #       message: "Examen calificado con exito",
  #       status: :ok
  #     }
  #   else
  #     render json: {
  #       message: "El examen ya ha sido calificado",
  #       status: :unprocessable_entity
  #     }
  #   end 
  # end

  def revise_exam
    course = @exam.course
    students = course.students
    answers = @exam.student_answers

    aux = 0
    answers.each do |answer|
      answer.exam_score.present? ? aux += 1 : aux+=0
    end

    # verificamos si la cantidad de entregas es igual a la cantidad de alumnos
    if answers.count < students.count || answers.count > aux
      # si no es igual, faltan entregas
      students.each do |student|
        ## obtenemos todos los almunos que no han presentado una entrega
        unless answers.where(student_id: student.id).exists?
          # creamos una entrega para ese alumno con nota 0
          StudentAnswer.create(
            student_id: student.id,
            exam_id: @exam.id,
            status: 'on_hold',
            percent: 0,
            score: 0,
            attempt: 1,
            duration: @exam.duration
          )
        end
      end
      if @exam.status != "graded" 
        acumulate_score = 0
        student_answers = @exam.student_answers
        student_answers.map { |student_answer|
          student_answer.question_answers.map { |question|
            question.answer_options.map { |option| 
              if option.marked && option.status == "correct"
                acumulate_score += option.score
              end
            }
          }
          exam_score = ExamScore.new(student_answer_id: student_answer.id, student_id: student_answer.student_id, score: acumulate_score)
          exam_score.save
          student_answer.update(status: "graded", score: acumulate_score) if @exam.type_exam == "automatic"
          acumulate_score = 0
        }
        @exam.status = :graded
        @exam.save
        render json: {
          message: "Examen calificado con exito",
          status: :ok
        }
      else
        render json: {
          message: "El examen ya ha sido calificado",
          status: :unprocessable_entity
        }
      end
    else
      @exam.status = :graded
      @exam.save
      render json: {
        message: "Todos los alumnos han presentado su entrega, se cerro todas las entregas",
        status: :ok
      }
    end  
  end

  def get_manual_exam_answers
    @exam = Exam.find(params[:exam_id])
    @student_answers = @exam.student_answers
    render json: {
      data: @student_answers.map { |student_answer| {
          answer_id: student_answer.id,
          student_id: student_answer.student_id,
          student_name: student_answer.student.first_name + " " + student_answer.student.last_name,
          file: student_answer.file,
          status: student_answer.status,
          score: student_answer.score,
          exam_id: student_answer.exam_id,
          status: student_answer.status,
          created_at: student_answer.created_at,
          updated_at: student_answer.updated_at
        }},
      status: :ok
    }
  end

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

  private
    def set_exam
      @exam = Exam.find(params[:id])
    end

    def set_exam_for_calificate
      @exam = Exam.find(params[:exam_id])
    end

    def set_course
      @course = Course.find(params[:course_id])
    end

    def exam_params
      question_option_attributes = %i[id enunciate score status _destroy]
      exam_question_attributes = [:id, :score, :enunciate, :feedback, :_destroy, question_options_attributes: [question_option_attributes]]
      # exam_attributes = %i[course_id name file type_exam status start end percent created_at updated_at]
      exam_attributes = %i[course_id name file type_exam status start end attempt student_visibility duration percent created_at updated_at]
      params.require(:exam).permit(exam_attributes, exam_questions_attributes: [exam_question_attributes])
    end
end
