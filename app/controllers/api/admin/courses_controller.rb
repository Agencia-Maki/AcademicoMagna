class Api::Admin::CoursesController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def create_course
        
        professor_p = []
        params[:professors].each do |professor|
            profe =  Professor.find_by(document_number: professor[:document_number])

            if profe.nil?
                new_professor = Professor.new
                new_professor.document_number = professor[:document_number]
                new_professor.first_name = professor[:first_name]
                new_professor.password = professor[:document_number]
                new_professor.password_confirmation = professor[:document_number]
                new_professor.last_name = professor[:last_name]
                new_professor.email = professor[:email]
                new_professor.gender = professor[:gender]
                new_professor.phone = professor[:phone]
                new_professor.document_type = professor[:document_type]
                if new_professor.save! 
                    professor_p << new_professor
                else
                    render json: { message: "Algo salió mal",
                    errors: new_professor.errors.full_messages
                }, status: :unprocessable_entity
                return
                end
                
            else
                professor_p << profe
            end
        end
        
        new_course = Course.new
        new_course.slug = params[:code]
        new_course.name = params[:name]
        new_course.description = params[:description]
        new_course.start_date = params[:start_at]
        new_course.end_date = params[:end_at]
        new_course.cover = params[:cover] 
        new_course.duration = params[:hours]
        new_course.its_free = params[:free_course]
        new_course.course_category_id = params[:course_category_id]

        new_course.professor = professor_p[0]
        if new_course.save
                render json: {
                message: "Curso Created Successfully"
                }, status: :ok
            else
                render json: {
                message: "Algo salió mal con la asociación del profesor",
                errors: new_course.errors.full_messages
                }, status: :unprocessable_entity
            end
            
    end

    # def create_course
    #     byebug
    #     new_course = Course.new(
    #         slug: params[:code],
    #         name: params[:name],
    #         description: params[:description],
    #         start_date: params[:start_at],
    #         end_date: params[:end_at],
    #         cover: params[:cover],
    #         duration: params[:hours],
    #         its_free: params[:free_course],
    #         course_category_id: params[:course_category_id]
    #         )
        
    #         params[:professors].each do |professor|
    #         existing_professor = Professor.find_by(document_number: professor[:document_number])
        
    #         if existing_professor.nil?
    #             new_professor = Professor.new
    #             new_professor.document_number = params[:document_number]
    #             new_professor.first_name = params[:first_name]
    #             new_professor.last_name = params[:last_name]
    #             new_professor.email = params[:email]
    #             new_professor.gender = params[:gender]
    #             new_professor.phone = params[:phone]
    #             new_professor.document_type = params[:document_type]
    #             if new_professor.save
    #             new_course.professors << new_professor
    #             else
    #             render json: {
    #                 message: "Algo salió mal al crear el profesor",
    #                 errors: new_professor.errors.full_messages
    #             }, status: :unprocessable_entity
    #             return
    #             end
    #         else
    #             new_course.professors << existing_professor
    #         end
    #         end
        
    #         if new_course.save
    #         render json: {
    #             message: "Curso creado exitosamente"
    #         }, status: :ok
    #         else
    #         render json: {
    #             message: "Algo salió mal al crear el curso",
    #             errors: new_course.errors.full_messages
    #         }, status: :unprocessable_entity
    #         end
    #     end

end