class AvatarUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def default_url
    if model.gender == "male"
      ActionController::Base.helpers.asset_path('avatars/male_avatar.png')
    elsif model.gender == "female"
      ActionController::Base.helpers.asset_path('avatars/female_avatar.png')
    else
      ActionController::Base.helpers.asset_path('avatars/no_specified_avatar.png')
    end
  end

  version :medium do
    process resize_to_fit: [240, 240]
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end
end
