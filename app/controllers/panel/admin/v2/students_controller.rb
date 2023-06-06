class Panel::Admin::V2::StudentsController < ApplicationController
  def index_by_course
    course = Course.find(params[:course_id])
    students = course.students.includes(:inscriptions).select(:id, :document_number, :first_name, :last_name)

    render json: {
      students: students.as_json(include: { inscriptions: { only: [:id, :status] } })
    }
  end
end