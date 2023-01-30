class Panel::Admin::ExamsController < ApplicationController
  before_action :set_exam, only: [:show, :edit, :update, :destroy, :show_scores]
  before_action :set_exam_for_calificate, only: [:revise_exam, :enable_set_answers]
  before_action :set_course, only: [:index]

  def index
    @exams = @course.exams.order(created_at: :desc)
    render json: {
      data: @exams,      
      status: :ok
    }
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

  def manual_calification_by_student
    # byebug
    current_score = StudentAnswer.find(params[:id]).exam_score
    # current_score = ExamScore.find(params[:id])
    if current_score.update!(score: params[:score]) and current_score.student_answer.update!(score: params[:score])
      render json: {
        message: "Nota actualizada con exito!",
        status: :ok
      }
    else
      render json: {
        message: "Error al actualizar la nota",
        status: :unprocessable_entity
      }
    end
  end

  # revisar examen

  def revise_exam
    course = @exam.course
    students = course.students
    answers = @exam.student_answers

    # verificamos si la cantidad de entregas es igual a la cantidad de alumnos
    if answers.count < students.count
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
            attempt: 1
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
          student_answer.update(status: "graded", score: acumulate_score)
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
      student_answers = @exam.student_answers
      student_answers.map { |student_answer| 
        if student_answer.status == "ungraded"
          acumulate_score = 0
          student_answer.question_answers.map { |question|
            question.answer_options.map { |option| 
              if option.marked && option.status == "correct"
                acumulate_score += option.score
              end
            }
          }
          exam_score = ExamScore.new(student_answer_id: student_answer.id, student_id: student_answer.student_id, score: acumulate_score)
          exam_score.save
          student_answer.update(status: "graded", score: acumulate_score)
          acumulate_score = 0
        end
      }

      @exam.status = :graded
      @exam.save
      render json: {
        message: "Todos los alumnos han presentado su entrega, se cerro todas las entregas",
        status: :ok
      }
    end
  
  end

  # funciones netamente administrativas

  def enable_set_answers
    @exam.status = "on_hold"
    @exam.save
    render json: {
      message: "Examen habilitado para entregas",
      status: :ok
    }
  end

  def show_scores
    all_scores_by_exam = []
    render json: {
      data: {
        scores: @exam.student_answers.map { |student_answer| {
          id: student_answer.id,
          score: student_answer.exam_score ? student_answer.exam_score.score : "0.0",
          student: student_answer.student.first_name + " " + student_answer.student.last_name,
          calificated: student_answer.updated_at,
          status: student_answer.status,
        }}
      }
    }
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
      exam_attributes = %i[course_id name file type_exam status start end attempt student_visibility duration percent created_at updated_at]
      params.require(:exam).permit(exam_attributes, exam_questions_attributes: [exam_question_attributes])
    end
end