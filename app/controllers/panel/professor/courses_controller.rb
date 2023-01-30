class Panel::Professor::CoursesController < ApplicationController
  before_action :set_professor, only: [:index]

  def index
    @courses = @professor.courses
    render json: {
      data: @courses.map { |course| {
          id: course.id,
          name: course.name,
          description: course.description,
          start_date: course.start_date,
          end_date: course.end_date, 
          status: course.status,
          cover: course.cover,          
          students: course.students,
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
      }
    }, status: :ok
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

  def get_students_list
    course = Course.find(params[:course_id])
    students = course.students
    render json: {
      data: students.map { |student| {
          student_id: student.id,
          student_name: student.first_name + " " + student.last_name
        }},
      status: :ok
    }
  end

  private
    def set_professor
      @professor = Professor.find(params[:professor_id])
    end

    # def course_params
    #   course_attributes = %i[name description start_date end_date status cover professor_id course_category_id]
    #   params.require(:course).permit(course_attributes, chapters_attributes: %i[id name start_date end_date _destroy])
    # end
end
