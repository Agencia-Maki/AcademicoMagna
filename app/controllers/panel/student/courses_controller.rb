class Panel::Student::CoursesController < ApplicationController
  before_action :set_student, only: [:index]

  def index
    inscriptions = @student.inscriptions.where.not(status: ["debtor", "completed"]).includes(:course)
    render json: {
      data: inscriptions.map { |inscription| {
        id: inscription.course.id,
        name: inscription.course.name,
        description: inscription.course.description,
        magna_class_link: inscription.course.magna_class_link,
        start_date: inscription.course.start_date,
        end_date: inscription.course.end_date, 
        status: inscription.course.status,
        cover: inscription.course.cover,
        category: inscription.course.course_category,
        chapters: inscription.course.chapters.includes(:lessons, :materials).map { |chapter| {
          id: chapter.id,
          name: chapter.name,
          start_date: chapter.start_date,
          end_date: chapter.end_date,
          materials: chapter.materials,
          lessons: chapter.lessons
        }}
      }}
    }, status: :ok
  end

  def index_free_courses
    courses = Course.where.not(status: "closed").where(its_free: "free")
    render json: {
      data: courses.map { |course| {
        id: course.id,
        name: course.name,
        description: course.description,
        magna_class_link: course.magna_class_link,
        start_date: course.start_date,
        end_date: course.end_date, 
        status: course.status,
        cover: course.cover
      }}
    }, status: :ok
  end

  def show
    course = Course.find(params[:id])
    render json: {
      data: course,
      chapters: course.chapters.order(id: :asc).map { |chapter| {   
        id: chapter.id,
        name: chapter.name,
        start_date: chapter.start_date,
        end_date: chapter.end_date,
        materials: chapter.materials,
        lessons: chapter.lessons.order(id: :asc)
        }
      },
      status: :ok
    }
  end


  private
    def set_student
      @student = Student.find(params[:student_id])
    end
end