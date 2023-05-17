class Panel::Admin::CertificatesController < ApplicationController
  before_action :set_course, only: [:index, :create]

  before_action :set_certificate, only: [:destroy, :update]

  def index
    certificates = @course.certificates
    render json: {
      certificates: certificates,
    }, status: :ok
  end

  def create
    params[:certificates].each do |certificate|
      cert_pivot = Certificate.find_by(title: certificate[:title], course_id: @course.id, tag: certificate[:tag], certificate_type: params[:certificate][:certificate_type])
      if cert_pivot.nil?
        @course.certificates.create(
          title: certificate[:title],
          start_at: certificate[:start_at],
          end_at: certificate[:end_at],
          hours: certificate[:hours],
          tag: certificate[:tag],
          certificate_type: params[:certificate][:certificate_type])
      end
    end

    render json: {
      message: 'Certificados registrados correctamente'
    }, status: :ok
  end

  def destroy
    @certificate.destroy

    render json: {
      message: 'Certificado eliminado correctamente'
    }, status: :ok
  end

  def update
    @certificate.update(
      title: params[:title],
      start_at: params[:start_at],
      end_at: params[:end_at],
      hours: params[:hours],
      tag: params[:tag],
      certificate_type: params[:certificate_type])
    
    render json: {
      message: 'Certificado actualizado correctamente'
    }, status: :ok
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_certificate
    @certificate = Certificate.find(params[:id_certificate])
  end

end