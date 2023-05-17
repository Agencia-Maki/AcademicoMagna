class Panel::Admin::CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy]

  def index
    @courses = Course.includes(:professor, :course_category, :inscriptions, :chapters)
    .order(Arel.sql("CASE courses.status
                        WHEN '0' THEN 0
                        WHEN '2' THEN 1
                        WHEN '1' THEN 2
                        ELSE 3
                      END, end_date DESC"))
              .map { |course|
                {
                  id: course.id,
                  name: course.name,
                  professor: "#{course.professor.first_name} #{course.professor.last_name}",
                  start_date: course.start_date,
                  end_date: course.end_date,
                  category: course.course_category.name,
                  status: course.status,
                  import_data: course.chapters.count.zero? ? "yes" : "no",
                  delete_course: course.inscriptions.count.zero? ? "yes" : "no"
                }
              }
    render json: {
      data: @courses, status: :ok
    }
  end

  def get_all
    @courses = Course.all
    render json: @courses, status: :ok
  end

  def get_active
    courses = Course.where.not(status: "closed")
    render json: {
      courses: courses
    }, status: :ok
  end

  def show
    render json: @course.as_json(include: [:professor, :course_category]), status: :ok
  end

  def new
    @course = Course.new
  end

  def create
    @course = Course.new
    @course.name = params[:name]
    @course.description = params[:description]
    @course.start_date = params[:start_date]
    @course.end_date = params[:end_date].to_date - 1.minute
    @course.status = params[:status]
    @course.cover = params[:cover]
    @course.show_magna_class_link = params[:show_magna_class_link]
    @course.magna_class_link = params[:magna_class_link]   
    @course.duration = params[:duration]   
    @course.professor_id = params[:professor_id]
    @course.course_category_id = params[:course_category_id]
    @course.conference_link = params[:conference_link]
    @course.its_free = params[:its_free]
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

  def clone_course
    courseClone = Course.new
    courseClone.clone_all_data(params[:course_to_clone_id], params[:name])
    render json: {
      message: "Programa clonado con exito",
      status: :ok
    }, status: :ok
  end

  def import_course_data
    courseClone = Course.find(params[:course_to])

    if courseClone.import_data(params[:course_from])
      render json: {
        message: "Datos importados con exito",
        status: :ok
      }, status: :ok
    else
      render json: {
        message: "No se pudo importar los datos",
        status: :unprocessable_entity
      }, status: :unprocessable_entity
    end

  end

  def update
    curso = Course.find(params[:id])
    curso.name = params[:name]
    curso.description = params[:description]
    curso.start_date = params[:start_date]
    curso.end_date = params[:end_date].to_date - 1.minute
    curso.status = params[:status]

    unless params[:cover] == "[object Object]"
      curso.cover = params[:cover]
    end
    curso.professor_id = params[:professor_id]
    curso.course_category_id = params[:course_category_id]
    curso.conference_link = params[:conference_link]
    curso.magna_class_link = params[:magna_class_link]
    curso.duration = params[:duration]   

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
    if @course.inscriptions.count == 0
      @course.destroy
      render json: { 
        notice: 'Programa eliminado con exito', 
        status: :ok
      }
    else
      render json: { 
        notice: 'El curso tiene alumnos matriculados', 
        status: :unprocessable_entity
      }
    end
  end

  def get_all_lessons_by_chapter
    @lessons = Lesson.where(chapter_id: params[:chapter_id])
    render json: {
      data: @lessons
    }, status: :ok
  end

  def generate_certificates
    course = Course.find(params[:course_id])

    if course.certificates.count > 0
      students = course.students
      exams = course.exams

      students_scores = []
      students.each do |student|
        total_score = 0
        total_percent = 0
        exams.each do |exam|
          exam_answer = StudentAnswer.find_by(exam_id: exam.id, student_id: student.id)
          unless exam_answer.nil?
            exam_score = exam_answer.score * exam.percent / 100.0
            total_score += exam_score
            total_percent += exam.percent
          end
        end
        final_score = total_score / total_percent unless total_percent == 0
        student_hash = student.as_json
        student_hash[:score] = final_score * 100 unless final_score.nil?
        students_scores << student_hash
      end

      approved_students = students_scores.select { |student| student[:score] >= 14 }
      disapproved_students = students_scores.select { |student| student[:score] < 14 }
    else 
      return render json: {
        message: "Error, no se tiene plantillas de certificados registrados para este curso"
      }, status: :unprocessable_entity
    end

    final_data = {
      course: course.as_json.merge(chapters: course.chapters.as_json),
      professors: course.professor.as_json,  # en este apartado modificar luego para  la relacion many to many course.professors
      approved_students: approved_students.as_json,
      disapproved_students: disapproved_students.as_json,
      certificate_templates: course.certificates.as_json
    }

    host_certificate = Rails.env.production? ? 'https://certificacion.magna.edu.pe' : 'http://127.0.0.1:9000'

    connection = Faraday.new(url: host_certificate) do |conn|
      conn.request :json # enviar la solicitud como JSON
      conn.response :json, content_type: /\bjson$/ # analizar la respuesta como JSON
      conn.adapter Faraday.default_adapter # utilizar el adaptador por defecto (Net::HTTP)
    end
    
    response = connection.post do |req|
      req.url '/api/v1/generate_certificates_from_academic' # especificar la ruta del recurso
      req.headers['Content-Type'] = 'application/json' # establecer la cabecera Content-Type
      req.body = final_data.to_json # establecer los datos de la solicitud como JSON
    end

    if response.status == 200 
      render json: {
        message: "Certificados generados con exito",
        status: :ok
      }, status: :ok
    end

  end

  private
    def set_course
      @course = Course.find(params[:id])
    end

    def course_params
      course_attributes = %i[name description start_date end_date status cover conference_link professor_id course_category_id show_magna_class_link magna_class_link its_free]
      params.require(:course).permit(course_attributes)
    end
end
