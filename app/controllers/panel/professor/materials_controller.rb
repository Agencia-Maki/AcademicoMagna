class Panel::Professor::MaterialsController < ApplicationController
  before_action :set_material, only: [:destroy]

  def index

  end

  def create
    @material = Material.new
    @material.name = params[:name]
    @material.file = params[:file]
    @material.chapter_id = params[:chapter_id]
    if @material.save 
      render json: {
        message: "Material subido con exito",
        status: :ok
      } 
    else
      render json: {
        message: @chapter.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  def destroy
    @material.destroy
    render json: { 
      message: 'Material eliminado con exito', 
      status: :ok
    }
  end

  private
    def set_material
      @material = Material.find(params[:id])
    end

    def material_params
      material_attributes = %i[name file chapter_id]
      params.require(:course).permit(material_attributes)
    end
end