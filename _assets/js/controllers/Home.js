nvns.nvnsApp.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = [
    '$scope',
    '$timeout',
    '$interval'
];

function HomeCtrl ($scope, $timeout, $interval) {

    var sv  = $scope.vars = {
        scrolled: false,
        video_ready: false,
        video: {
            id: 'X2C8gbqzv2Q',
            player: null,
            params: {
                autoplay: 1,
                loop: 1,
                controls: 0,
                showinfo: 0,
                playlist: 'X2C8gbqzv2Q',
                modestbranding: 1,
                autohide: 1,
                mute: 1,
                origin: window.location.href
            },
            muted: true
        },
        video_check_interval: null
    }

    /**
     * @name $scope.init
     * @function
     * @memberOf HomeCtrl
     * @description Initialize the app
     */
    $scope.init = function() {

        $(window).scroll(function(){
            var scroll = $(window).scrollTop();
            $timeout(function(){
                $scope.$apply(function(){
                    sv.scrolled = (scroll > 0) ? true : false;
                });
            });
        });

        initVideoPlayer();

    }

    /**
     * @name initVideoPlayer
     * @function
     * @memberOf HomeCtrl
     * @description This method starts the youtube video player for our
     *              video backdrop.
     */
    function initVideoPlayer() {
        if (sv.video.player) {
            $scope.$on('youtube.player.playing', function(event, player){
                sv.video_ready = true;
            });
            $timeout(function() {
                if (!sv.video_check_interval) {
                    sv.video_check_interval = $interval(ensureVideoIsPlaying, 10000);
                }
            }, 10000);

        }
        else {
            $timeout(initVideoPlayer, 10);
        }
    }

    /**
     * @name ensureVideoIsPlaying
     * @function
     * @memberOf HomeCtrl
     * @description Check video status, if it's stopped, make sure it starts again
     */
    function ensureVideoIsPlaying() {
        /*
         * Sometimes the youtube player stops or enters an unexpected state
         * for reasons unknown, possibly having to do with the machine having
         * been put to sleep or the browser tab throttled for some reason.
         * This regular check every ten seconds attempts to ensure the video
         * resumes playing if this happens.  ~cyap
         */
        if (sv.video.player) {
            var player_status = sv.video.player.getPlayerState();
            if (!isNaN(player_status)) {
                if ([-1, 0, 2, 5].indexOf(player_status)) {
                    // status codes represent:
                    // -1 unstarted
                    // 0 stopped
                    // 2 paused
                    // 5 video cued
                    sv.video.player.mute();
                    sv.video.player.playVideo();
                }
            }
        }
    }

    /**
     * @name $scope.toggleVideoSound
     * @function
     * @memberOf HomeCtrl
     * @description This method allows the user to turn on the audio for the
     *              background video.
     */
    $scope.toggleVideoSound = function() {
        if (sv.video.muted) {
            sv.video.player.unMute();
            sv.video.muted = false;
        }
        else {
            sv.video.player.mute();
            sv.video.muted = true;
        }
    }

    window.scope = $scope;

};
