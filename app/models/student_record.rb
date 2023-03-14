class StudentRecord < ApplicationRecord

  before_create :set_initial_status

  enum document_type: %i[dni foreigner_card passport]
  enum status: %i[on_hold enrolled canceled]
  enum gender: %i[male female no_specified]


  private

  def set_initial_status
    self.status = :on_hold
  end

end
