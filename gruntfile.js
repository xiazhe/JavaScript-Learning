/**
 * Created by zhexia on 16/4/13.
 */
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        modules: [],
        dist: 'dist',
        filename: 'teafish',
        filenamecustom: '<%= filename %>-custom',
        connect: {
            server: {
                options: {
                    port: 9006,
                    hostname: "localhost",
                    keepalive: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //mangle: false
            },
        }
    });

    // web server
    grunt.registerTask('default', ['connect:server']);

    var modules = grunt.config('modules');

    return grunt;

};