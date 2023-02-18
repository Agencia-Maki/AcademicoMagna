class Course < ApplicationRecord
  belongs_to :professor
  belongs_to :course_category
  has_many :inscriptions, dependent: :destroy
  has_many :exams, dependent: :destroy
  has_many :students, through: :inscriptions

  has_many :chapters, dependent: :destroy
  accepts_nested_attributes_for :chapters, allow_destroy: true
  
  before_create :set_initial_status
  before_create :set_initial_class_link
  mount_uploader :cover, CoverUploader
  paginates_per 10

  validate :check_name
  validate :check_description
  validate :check_professor
  validate :check_category
  validate :check_start_date
  validate :check_end_date

  enum status: [:in_progress, :completed, :on_hold, :closed]
  enum its_free: [:free, :paid]
  enum show_magna_class_link: [:show, :hide]

  def clone_all_data(course_reference_id, name)
    course_reference = Course.find(course_reference_id)
    self.name = name
    self.description = course_reference.description
    self.start_date = course_reference.start_date
    self.end_date = course_reference.end_date
    self.status = course_reference.status
    self.cover = course_reference.cover
    self.show_magna_class_link = course_reference.show_magna_class_link
    self.magna_class_link = course_reference.magna_class_link
    self.professor_id = course_reference.professor_id
    self.course_category_id = course_reference.course_category_id
    self.conference_link = course_reference.conference_link

    course_reference.chapters.each do |original_chapter|
      new_chapter = original_chapter.dup
      self.chapters << new_chapter
    
      original_chapter.lessons.each do |original_lesson|
        new_lesson = original_lesson.dup
        new_lesson.link_video = nil
        new_chapter.lessons << new_lesson
      end
    end

    self.save!
  end

  def close_inscriptions
    self.status = :closed
    self.inscriptions.update_all(status: :inactive)
    self.save!
  end


  private
    def set_initial_status
      self.status = :on_hold
    end

    def set_initial_class_link
      self.show_magna_class_link = :show
    end

    def check_name
      if name.blank?
        errors.add(:base, "El nombre no puede estar vacío") 
      elsif name.length < 8
        errors.add(:base, "El nombre es demasiado corto") 
      end
    end

    def check_description
      if description.blank?
        errors.add(:base, "La descripción no puede estar vacía") 
      elsif description.length < 30
        errors.add(:base, "La descripción es demasiado corta") 
      end
    end
  

    def check_professor
      if professor_id == 0 || professor_id.nil?
        errors.add(:base, "Debes asignar un profesor al programa")
      end
    end

    def check_category
      if course_category_id == 0 || course_category_id.nil?
        errors.add(:base, "Debes asignar una categoría al programa") 
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
