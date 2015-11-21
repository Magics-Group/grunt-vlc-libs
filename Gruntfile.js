module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        vlc_libs: {
            options: {
                dir: 'VLC', // Output dir
                force: true, // Overwrite 
                arch: 'ia32', // ia32 / x64 
                platform: 'win' // win / osx / linux
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['vlc_libs']);
};