if ENV['SKIP_ASSETS']
  Rake::Task['deploy:assets:precompile'].clear_actions
  Rake::Task['deploy:assets:backup_manifest'].clear_actions
end