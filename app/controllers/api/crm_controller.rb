class Api::CrmController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create_course
    if Course.find_by(slug: params[:code]).nil?
      Course.create!(
        name: params[:name],
        slug: params[:code],
        description: "Curso enviado desde el CRM no olvidar agregar la descripción, este texto es unicamente para evitar errores y saltar las validaciones",
        start_date: Time.now,
        end_date: Time.now + 60.days,
        status: "on_hold",
        professor_id: 1,
        course_category_id: 1,
        its_free: "paid",
        show_magna_class_link: "show"
      )
      render json: {
        message: "Curso creado con exito en el aula virtual"      
        }, status: :ok
    else
      render json: {
        message: "El curso ya existe en el aula virtual, verifica el #{"CODIGO"} del curso"
        }, status: :unprocessable_entity
    end

    
  end

end