class Certificate < ApplicationRecord
  belongs_to :course

  enum tag: %i[specialist approved participant auditor]
  enum certificate_type: %i[general module]

end
