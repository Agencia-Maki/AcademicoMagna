class Panel::Admin::StudentRecordsController < ApplicationController

  def index
    student_records = StudentRecord.all.order(created_at: :desc, status: :asc)
    render json: {
      student_records: student_records
    }, status: :ok
  end

  def register_and_enrolled
    currentStudent = Student.find_by(document_number: params[:document_number])

    yearNow = (Time.now.year%2000).to_s
    monthNow = (Time.now.month).to_s

    if currentStudent.nil?
      currentStudent = Student.create(
        email: params[:email],
        password: params[:document_number],
        password_confirmation: params[:document_number],
        first_name: params[:first_name],
        last_name: params[:last_name],
        document_type: params[:document_type],
        document_number: params[:document_number],
        # status: params[:status],
        gender: params[:gender],
        code: yearNow + monthNow + "-EST-" + params[:document_number] + "-MGN",
        phone: params[:phone]
      )
    end

    currentStudent.inscriptions.create(course_id: params[:course_id], date_inscription: Time.now) if Inscription.find_by(course_id: params[:course_id], student_id: currentStudent.id).nil?

    StudentRecord.find(params[:id]).update(status: :enrolled)

    render json: {
      message: "Alumno registrado con exito"
    }, status: :ok
  end

end

