class Panel::Admin::StudentsController < ApplicationController
  before_action :set_student, only: [:show, :update, :destroy]

  def index
    @students = Student.all.order(created_at: :desc).page(params[:page])
    render json: {
      data: @students,
      current_page: @students.current_page,
      total_pages: @students.total_pages,
      per_pages: @students.limit_value
    }, status: :ok
  end

  def get_all
    @students = Student.where.not(id: 2)  # tener cuidado con el id:2
    render json: @students, status: :ok
  end

  def show
    render json: @student
  end

  def new
    @student = Student.new
  end

  def create
    yearNow = Time.now.year%2000
    yearNow = yearNow.to_s

    monthNow = Time.now.month
    monthNow = monthNow.to_s

    @student = Student.new
    @student.email = params[:email]
    @student.password = params[:document_number]
    @student.password_confirmation = params[:document_number]
    @student.first_name = params[:first_name]
    @student.last_name = params[:last_name]
    @student.document_type = params[:document_type]
    @student.document_number = params[:document_number]
    @student.status = params[:status]
    @student.gender = params[:gender]
    @student.code = yearNow + monthNow + "-EST-" + params[:document_number] + "-MGN"
    @student.phone = params[:phone]

    # byebug
    # puts @student.save?
    if @student.save
      StudentMailer.with(@student).welcome_email.deliver_later
      render json: {
        message: "Alumno registrado con exito",
        status: :ok
      }
    else
      render json: {
        message: @student.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  def update
    if @student.update(student_params)
      render json: { 
        message: 'Alumno actualizado exitosamente', 
        status: :ok
      }
    else 
      render json: {
        message: @student.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  def destroy
    if @student.destroy
      render json: { 
        message: 'Alumno eliminado exitosamente', 
        status: :ok
      }
    else 
      render json: {
        message: @student.errors.full_messages,
        status: :unprocessable_entity
      }
    end
    
  end

  private
    def set_student
      @student = Student.find(params[:id])
    end

    def student_params
      student_attibutes = %i[email document_type document_number code password password_confirmation first_name last_name phone gender status]
      params.require(:student).permit(student_attibutes)
    end
end