class Panel::Admin::V2::CertificatesController < ApplicationController

  def generate_certificates
    course = Course.find(params[:course_id])

    if course.certificates.count > 0
      students = Student.where(id: params[:student_ids])
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

    host_certificate = ENV["CERTIFICATION_HOST"]

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
      # students = Student.where(id: params[:student_ids])
      # students.update_all()
      Inscription.where(student_id: params[:student_ids], course_id: params[:course_id]).update_all(status: :with_certificate)
      render json: {
        message: "Certificados generados con exito",
        status: :ok
      }, status: :ok
    end
  end

end