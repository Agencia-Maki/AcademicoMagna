class Chapter < ApplicationRecord
  validate :check_name
  validate :check_start_date
  validate :check_end_date
  belongs_to :course
  has_many :materials, dependent: :destroy
  has_many :lessons, dependent: :destroy


  def check_name
    if name.blank?
      errors.add(:base, "El nombre no puede estar vacio") 
    elsif name.length < 8
      errors.add(:base, "El nombre es demasiado corto") 
    end
  end

  def check_start_date
    if start_date.blank?
      errors.add(:base, "Ingresa una fecha de inicio valida")
    elsif start_date > end_date
      errors.add(:base, "La fecha de inicio no puede ser mayor a la fecha de fin")
    end
  end

  def check_end_date
    if end_date.blank?
      errors.add(:base, "Ingresa una fecha de fin valida")
    end
  end
end
