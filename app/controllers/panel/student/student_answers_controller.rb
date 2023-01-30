class Panel::Student::StudentAnswersController < ApplicationController
  before_action :set_student_answer, only: [:show, :edit, :update, :destroy]
  before_action :set_course, only: :index_exams

  def index_exams
    @exams = @course.exams.order(created_at: :desc)
    render json: {
      data: @exams,      
      status: :ok
    }
  end

  def get_calification
    answer = StudentAnswer.where(exam_id: params[:exam_id], student_id: params[:student_id]).first
    if answer.nil?
      render json: {
        data: {
          feedback: "No ha realizado una entrega para este examen",
          score: 0
        },
        status: :not_found
      }
    else
      render json: {
        data: {
          exam_score: answer.exam_score,
          exam_all_data: answer.exam
        },
        status: :ok
      }
    end
  end

  def check_send_answer
    student_answer = current_student.student_answers.find_by(exam_id: params[:exam_id])
    current_exam = Exam.find(params[:exam_id])
    # byebug
    if student_answer.attempt < current_exam.attempt
      render json: {
        status: 200,      # si es 200 se puede intentar resolver el examen
      }
    else
      render json: {
        status: 400,      # si es 400 no se puede intentar resolver el examen
      }
    end
  end


  def show_exam
    @exam = Exam.find(params[:exam_id])
    render json: {
      exam: @exam,
      questions: @exam.exam_questions.map { |question| {   
        id: question.id,
        enunciate: question.enunciate,
        score: question.score,
        question_options: question.question_options .map { |option| {
          id: option.id,
          enunciate: option.enunciate,
          score: option.score,
          status: option.status
        }}
        }
      }
    }
  end

  def create
    exam = Exam.find(params[:exam_id])
    if params[:type_answer] == 'manual'
      flag = true
      respuesta = StudentAnswer.where(:student_id => params[:student_id], :exam_id => params[:exam_id]).first_or_create(
        :exam_id => params[:exam_id], 
        :student_id => params[:student_id], 
        :status => params[:status], 
        :file => params[:file],
        :attempt => 1
      )
      
      unless respuesta.update(:exam_id => params[:exam_id], :student_id => params[:student_id], :status => params[:status], :file => params[:file])  
        flag = false
      end
    else 
      respuesta = StudentAnswer.find_by(student_id: params[:student_id], exam_id: params[:exam_id])
      # byebug
      if respuesta.nil?
        # puts "no existe"
        respuesta = StudentAnswer.new(student_answer_params)
        respuesta.attempt = 1
        respuesta.status = 'ungraded'
        respuesta.percent = exam.percent
        respuesta.save
      else
        aux_attempt = respuesta.attempt
        respuesta.destroy 
        respuesta.exam_score.destroy if respuesta.exam_score.present?

        respuesta = StudentAnswer.new(student_answer_params)
        respuesta.attempt = aux_attempt + 1
        respuesta.status = 'ungraded'
        respuesta.percent = exam.percent
        # byebug
        respuesta.save
        # aux_data = StudentAnswer.new(student_answer_params)
        # respuesta.question_answers.each_with_index do |answer, index|
        #   answer.answer_options.each_with_index do |option, index_opt|
        #     pivot = aux_data.question_answers[index].answer_options[index_opt]
        #     option.update(marked: pivot.marked)
        #   end
        # end

        
        # respuesta.attempt += 1
      end
      flag = false
      flag = true if respuesta.save
    end
    
    if flag
      render json: {
        message: "Entrega registrada con exito",
        status: :ok
      }
    else
      render json: {
        message: "Error al registrar la entrega",
        status: :unprocessable_entity
      }
    end
  end

  private
    def set_student_answer
      @student_answer = StudentAnswer.find(params[:id])
    end

    def set_student
      @student = Student.find(params[:student_id])
    end

    def set_course
      @course = Course.find(params[:course_id])
    end

    def student_answer_params
      answer_option_attributes = %i[id enunciate marked score status _destroy]
      question_answer_attributes = [:id,:enunciate, :_destroy, answer_options_attributes: [answer_option_attributes]]
      student_answer_attributes = %i[exam_id student_id name file status attempt created_at updated_at]
      params.require(:student_answer).permit(student_answer_attributes, question_answers_attributes: [question_answer_attributes])
    end

    def exam_params
      question_option_attributes = %i[id enunciate score status _destroy]
      exam_question_attributes = [:id, :score, :enunciate, :feedback, :_destroy, question_options_attributes: [question_option_attributes]]
      exam_attributes = %i[course_id name file type_exam status start end created_at updated_at]
      params.require(:exam).permit(exam_attributes, exam_questions_attributes: [exam_question_attributes])
    end
end
