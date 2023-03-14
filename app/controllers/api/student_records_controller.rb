class Api::StudentRecordsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # from crm
  def create
    aux = StudentRecord.find_by(document_number: params[:document_number], course_code: params[:course_code])

    if aux.nil?
      new_student = StudentRecord.new(student_record_params)
      new_student.save! ? success_response(new_student, "create") : error_response(new_student, "create")
    else
      render json: {
        message: "La ficha del estudiante ya fue registrada con anterioridad."
      }, status: :ok
    end
  end


  


  private

  def student_record_params
    record_student_attributes = %i[email document_number first_name last_name phone code course_code course_name document_type gender status]
    params.require(:student_record).permit(record_student_attributes).transform_values(&:squish)
  end

end


# new_student.email = params[:email]
# new_student.document_number = params[:document_number]
# new_student.first_name = params[:first_name]
# new_student.last_name = params[:last_name]
# new_student.phone = params[:phone]
# new_student.code = params[:code]
# new_student.course_code = params[:course_code]
# new_student.course_name = params[:course_name]
# new_student.document_type = params[:document_type]
# new_student.gender = params[:gender]
# new_student.status = params[:status]










