class Panel::Admin::ProfessorsController < ApplicationController
  before_action :set_professor, only: [:show, :update, :destroy, :send_credentials]

  def index
    professors = Professor.all.order(created_at: :desc).page(params[:page])
    render json: {
      data: professors,
      current_page: professors.current_page,
      total_pages: professors.total_pages,
      per_pages: professors.limit_value
    }, status: :ok
  end

  #############################################################

  def get_all
    professors = Professor.where.not(id: 1).order(:id)
    render json: professors, status: :ok
  end

  def show
    render json: @professor
  end

  def new
    @professor = Professor.new
  end
  #############################################################

  def create
    yearNow = Time.now.year%2000
    yearNow = yearNow.to_s

    monthNow = Time.now.month
    monthNow = monthNow.to_s

    @professor = Professor.new
    @professor.email = params[:email]
    @professor.password = params[:document_number]
    @professor.password_confirmation = params[:document_number]
    @professor.first_name = params[:first_name]
    @professor.last_name = params[:last_name]
    @professor.document_type = params[:document_type]
    @professor.document_number = params[:document_number]
    @professor.gender = params[:gender]
    @professor.code = yearNow + monthNow + "-DOC-" + params[:document_number] + "-MGN"
    @professor.phone = params[:phone]
    @professor.avatar = params[:avatar]

    if @professor.save      
      render json: {
        message: "Profesor registrado con exito",
        status: :ok
      }
    else
      render json: {
        message: @professor.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  def send_credentials
    ProfessorMailer.with(@professor).welcome_email.deliver_now
    render json: {
      message: "Credenciales enviadas al profesor"
    }, status: :ok
  end

  def update
    if @professor.update(professor_params)
      render json: { 
        message: 'Profesor actualizado con exito', 
        status: :ok
      }
    else 
      render json: {
        message: @professor.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  def set_signature
    professor = Professor.find(params[:id])
    professor.signature = params[:signature]
    professor.save ? (render json: { message: 'Firma guardada con exito', status: :ok }) : (render json: { message: @profesor.errors.full_messages, status: :unprocessable_entity })
  end

  def destroy
    @courses = @professor.courses
    flag_update = false
    if @courses.count > 0
      @courses.each do |course| 
        course.professor_id = 1
        if course.save!
          flag_update = true
        end
      end
      if flag_update
        @professor.destroy
      end
    else
      @professor.destroy
    end
    render json: { 
      message: 'Registro de profesor eliminado con exito', 
      status: :ok
    }
  end

  private
    def set_professor
      @professor = Professor.find(params[:id])
    end

    def professor_params
      professor_attributes = %i[email document_number document_type code password password_confirmation first_name last_name phone avatar gender]
      params.require(:professor).permit(professor_attributes)
    end
end
