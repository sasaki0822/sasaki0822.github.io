module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: [
                'react/js/*.js',
                '.jshintrc'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);

};