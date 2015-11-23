# grunt-vlc-libs
Grunt task to download VLC Libs for WebChimera.js

[![npm version](https://badge.fury.io/js/grunt-vlc-libs.svg)](http://badge.fury.io/js/grunt-vlc-libs)

## Install

```
$ npm install --save-dev grunt-vlc-libs
```


## Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

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

grunt.registerTask('default', ['vlc_libs']);
```
