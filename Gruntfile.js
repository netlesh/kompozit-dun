module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ftp-push');
    grunt.initConfig({
  ftp_push: {
    your_target: {
      options: {
        // Task-specific options go here.
      },
      files: {
        // Target-specific file lists.
      }
    }
  }
})
};