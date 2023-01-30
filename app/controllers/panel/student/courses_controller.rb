class Panel::Student::CoursesController < ApplicationController
  before_action :set_student, only: [:index]

  def index
    @courses = @student.courses
    render json: {
      data: @courses.map { |course| {
          id: course.id,
          name: course.name,
          description: course.description,
          start_date: course.start_date,
          end_date: course.end_date, 
          status: course.status,
          cover: course.cover,
          category: course.course_category,
          chapters: course.chapters.map { |chapter| {   
            id: chapter.id,
            name: chapter.name,
            start_date: chapter.start_date,
            end_date: chapter.end_date,
            materials: chapter.materials,
            lessons: chapter.lessons
            }
          }
        }
      }, status: :ok
    } 
  end

  def show
    course = Course.find(params[:id])
    render json: {
      data: course,
      chapters: course.chapters.map { |chapter| {   
        id: chapter.id,
        name: chapter.name,
        start_date: chapter.start_date,
        end_date: chapter.end_date,
        materials: chapter.materials,
        lessons: chapter.lessons
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