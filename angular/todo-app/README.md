# Angular-Demo
A AngularJS Case structure Demo


    Angular-Demo
     \images
     \scripts
          \controllers
              mainController.js
          \directives
              event.js
          \filters
              filter.js
          \services
              service.js
          \vendor
              jquery.js
              angular.js
              modernizr-2.6.2.min.js
          app.js
          routing.js
      \styles
          app.css
          layout.css
          reset.css
          responsive.css
      \templates
          login.html
          dashboard.html
      index.html



    Demo2 功能分类:
    \images
    \scripts
        \core
        \dashboard
        \login
            login.html
            loginController.js
            loginServices.js
            logout.html
            logoutController.js
            logoutServices.js
        \register
            reg.html
            regController.js
            regServices.js
        \user

        \common    //common module
        \utils     //directive
    \libs
    \styles
    index.html

    Demo3 业务模块分类:
    \images
    \scripts
        \core
        \dashboard
        \auth
            \login
                login.html
                loginController.js
                loginServices.js
            \reg
                reg.html
                regController.js
                regServices.js
            $module.js
        \permission
            \user
                user.html
                userController.js
                userServices.js
            \role
                role.html
                roleController.js
                roleServices.js
            $module.js

        \common    //common module
        \utils     //directive
    \libs
    \styles
    index.html


Develop:
bower install (use git-shell)

npm install

gulp inject

gulp webserver

todo list:
jshint
test