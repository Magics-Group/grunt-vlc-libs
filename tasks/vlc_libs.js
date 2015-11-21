var _ = require('lodash');
var path = require('path');
var Promise = require('bluebird');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');


var utils = require('./lib/utils');
var downloader = require('./lib/downloader');

function getPlatformInfo() {
    if (/linux/.test(process.platform)) {
        return process.arch == 32 ? 'linux:ia32' : 'linux:x64';
    } else if (/darwin/.test(process.platform)) {
        return 'osx:ia32';
    } else {
        return 'win:ia32';
    }
}

function getVLC(platform, arch, dir, callback) {

    utils.getJson('https://api.github.com/repos/Magics-Group/vlc-prebuilt/releases/latest')
        .then(function(json) {

            if (json.message === 'Not Found') {
                console.log('No VLC Download Found');
                return callback();
            }
            var candidate = false;

            var LookingObject = {
                platform: platform,
                arch: arch
            };

            _.forEach(json.assets, function(asset) {
                var assetParsed = path.parse(asset.name).name.split('-');
                var assetObject = {
                    platform: assetParsed[1],
                    arch: assetParsed[2].split('.')[0]
                };
                if (_.isEqual(assetObject, LookingObject))
                    candidate = asset;
            });

            if (!candidate) {
                console.log('No VLC Download Found');
                return callback();
            }

            console.log('Acquiring:', candidate.name);

            downloader.downloadAndUnpack(dir, candidate.browser_download_url)
                .then(function() {
                    return callback();
                });

        })
        .catch(function(e) {
            console.log('Error:', e);
            return callback();
        });


}

module.exports = function(grunt) {

    grunt.registerTask('vlc_libs', 'Download VLC libs', downloadTask);

    function downloadTask() {
        var done = this.async();

        var params = this.options({
            dir: 'VLC',
            force: false,
            arch: getPlatformInfo().split(':')[1],
            platform: getPlatformInfo().split(':')[0]
        });

        if (params.force)
            rimraf(params.dir, function() {
                getVLC(params.platform, params.arch, params.dir, done);
            });
        else {
            getVLC(params.platform, params.arch, params.dir, done);
        }

    }
};