# require 'sidekiq/web'
# require 'sidekiq/cron/web'

Rails.application.routes.draw do
  # mount Sidekiq::Web => '/sidekiq'  #ELIMINAR DESPUES   #USAR FORMATO UTC
  # mount ActionCable.server => '/cable'

  devise_for :students, path: 'students', controllers: {
    sessions: 'students/sessions',
    registrations: 'students/registrations'
  }

  devise_for :admins, path: 'admins', controllers: {
    sessions: 'admins/sessions',
    registrations: 'admins/registrations'
  }

  devise_for :professors , path: 'professors', controllers: {
    sessions: 'professors/sessions',
    registrations: 'professors/registrations'
  }

  devise_scope :admin do
    authenticated :admin do
      # get '/calificationsxD', to: 'paginas#get_califications_xd'
      namespace :admins do
        get 'dashboard/index', as: :authenticated_root
        get 'profile', to: 'dashboard#get_current_admin'
      end
      namespace :panel do
        namespace :admin do
          resources :students
          get 'all_students', to: 'students#get_all'
          post '/students/:id', to: 'students#send_credentials'
          put '/students/:id/reset_password', to: 'students#reset_password'

          resources :professors
          get 'all_professors', to: 'professors#get_all'
          put '/professors/:id/set_signature', to: 'professors#set_signature'
          post '/professors/:id', to: 'professors#send_credentials'

          #######################################################################################################################
          get '/student_records', to: 'student_records#index'
          post '/student_records/register_and_enrolled', to: 'student_records#register_and_enrolled'
          #######################################################################################################################

          get '/courses/active', to: 'courses#get_active'
          resources :courses
          resources :course_categories

          get '/all_courses', to: 'courses#get_all'
          get '/courses/:course_id/chapters', to: 'chapters#index_by_course'    #panel/courses/5/chapters/

          #######################################################################################################################
          #                                                    CERTIFICATES                                                     #
          get '/courses/:course_id/certificates', to: 'certificates#index'  
          post '/courses/:course_id/certificates', to: 'certificates#create'
          put '/certificates/:id_certificate', to: 'certificates#update'
          delete '/certificates/:id_certificate', to: 'certificates#destroy'

          post '/courses/import', to: 'courses#import_course_data'
          post '/courses/:course_id/clone', to: 'courses#clone_course'
          # GENERAR CERTIFICADOS EN EL MODULO DE CERTIFICAICONES
          post '/courses/:course_id/generate_certificates', to: 'courses#generate_certificates'
          
          resources :exams, only: [:create, :show, :update, :destroy]
          get '/exams/:id/scores', to: 'exams#show_scores'
          post '/courses/:course_id/chapters', to: 'chapters#create'
          put '/courses/:course_id/chapters/:id', to: 'chapters#update'
          delete '/courses/:course_id/chapters/:id', to: 'chapters#destroy'
          get ':course_id/chapters/:chapter_id/lessons', to: 'courses#get_all_lessons_by_chapter' #/panel/5/chapters/1/lessons

          get '/inscriptions/courses' , to: 'inscriptions#get_all_by_courses'
          get '/inscriptions/course/:course_id', to: 'inscriptions#detail_by_course'
          get '/inscriptions/course/:course_id/students', to: 'inscriptions#get_students_by_course'
          delete '/inscriptions/course/:course_id/students/:student_id/delete_inscription', to: 'inscriptions#delete_inscription_by_student'  ## CAMBIAR A DELETE
          post '/inscriptions/course/:course_id/in_block', to: 'inscriptions#create_inscriptions_in_block'
          resources :inscriptions

          #######################################################################################################################

        end
        
        namespace :admin do
          get '/chapters/:chapter_id/materials', to: 'materials#index'
          post '/chapters/:chapter_id/materials', to: 'materials#create'
          delete '/chapters/:chapter_id/materials/:id', to: 'materials#destroy'
          get '/chapters/:chapter_id/lessons', to: 'lessons#index'
          post '/chapters/:chapter_id/lessons', to: 'lessons#create'
          put '/lessons/:id', to: 'lessons#update'


          ## APARTADO DE EXAMENES PARA EL ADMINISTRADOR
          get '/courses/:course_id/exams', to: 'exams#index'
          put '/exams/:exam_id/enable_set_answers', to: 'exams#enable_set_answers'
          post '/exams/:exam_id/revise_exam', to: 'exams#revise_exam'
          put '/answers/:answer_id/set_manual_score', to: 'exams#manual_calification_by_student'
        end
        #######################################################################################################################
        namespace :admin do
          namespace :v2 do
            get '/courses', to: 'courses#index'
            get '/courses/active', to: 'courses#active_index'
            get '/courses/inactive', to: 'courses#inactive_index'
            get '/students/by_course/:course_id', to: 'students#index_by_course'

            post '/certificates', to: 'certificates#generate_certificates'
          end
        end
        # match '*path', to: 'pages#main', via: [:get]
      end
    end
  end

  devise_scope :professor do
    authenticated :professor do
      namespace :professors do
        get 'dashboard/index', as: :authenticated_root   
        get 'profile', to: 'dashboard#get_current_professor'        
      end
      namespace :panel do
        namespace :professor do
          get '/:professor_id/courses', to: 'courses#index'
          get '/course/:id', to: 'courses#show'
          # delete '/materials/:id', to: 'materials#destroy'
          resources :materials
          get '/courses/:course_id/exams', to: 'exams#index'
          get '/courses/:course_id/students', to: 'courses#get_students_list'
          resources :exams, only: [:create, :show, :update, :destroy]
          post '/exams/:exam_id/revise_exam', to: 'exams#revise_exam'
          post '/exams/:exam_id/change_status', to: 'exams#change_status'   
          get '/exams/:exam_id/answers', to: 'exams#get_manual_exam_answers'
          post '/answers/:answer_id/set_manual_score', to: 'exams#manual_calification_by_student'

          #testing ..............
          post '/exams/:exam_id/set_special_score', to: 'scores#set_exam_score'

          get '/courses/:course_id/califications', to: 'exams#get_all_califications_by_course'
        end
      end
    end
    get '/profesores', to: 'professors/sessions#new'
  end

  devise_scope :student do
    authenticated :student do
      namespace :students do
        get 'dashboard/index', as: :authenticated_root
        get 'profile', to: 'dashboard#get_current_student'
      end
      namespace :panel do
        namespace :student do
          get '/:student_id/courses', to: 'courses#index'
          get '/:student_id/free_courses', to: 'courses#index_free_courses'
          get '/course/:id', to: 'courses#show'
          get '/courses/:course_id/exams', to: 'student_answers#index_exams'
          
          resources :student_answers, only: [:create, :show, :update, :destroy]

          get '/exams/:exam_id', to: 'student_answers#show_exam'
          get '/check_send_answer/:exam_id', to: 'student_answers#check_send_answer'   #    /student/panel/check_send_answer/exam_id
          get '/exams/:exam_id/student/:student_id/calification', to: 'student_answers#get_calification'
          ## CHECAR ESTO MAS ADELANTE PARA MEJORAR LA QUERY
          get '/courses/:course_id/all_data_exams', to: 'exams#get_all_data_exams_by_student'
        end
      end
    end
    get '/alumnos', to: 'students/sessions#new'
  end

  namespace :panel do
    get '/exam/:exam_id/scores', to: 'general#get_califications'
    get '/exam/:exam_id/scores/student/:student_id', to: 'general#get_calification_by_student'
    put '/exams/:exam_id/update_date_exam', to: 'coordinator_professor#update_date_exam'
    # get '/test_get_califications', to: 'coordinator_professor#test_get_califications'
  end

  namespace :api do
    post '/student_records/create', to: 'student_records#create'
    post '/courses/create_from_crm', to: 'crm#create_course'
  end

  root 'pages#index'

  

end