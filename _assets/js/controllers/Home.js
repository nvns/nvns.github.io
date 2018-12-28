nvns.nvnsApp.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = [
    '$scope',
    '$timeout',
    '$interval',
    '$window'
];

function HomeCtrl ($scope, $timeout, $interval, $window) {

    var sv  = $scope.vars = {
        scrolled: false,
        video_ready: false,
        player: null,
        video_muted: true,
        video_object: {
            videoId: 'X2C8gbqzv2Q',
            playerVars: {
                autoplay: 1,
                loop: 1,
                playlist: 'X2C8gbqzv2Q',
                controls: 0,
                showinfo: 0,
                modestbranding: 1,
                autohide: 1,
                origin: window.location.href
            },
            events: {
              onReady: onPlayerReady,
              onStateChange: onPlayerStateChange
            }
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

        initYouTubeApi();

        //initVideoPlayer();

    }

    /**
     * @name initYouTubeApi
     * @function
     * @memberOf HomeCtrl
     * @description Initializes the YouTube API
     */
    function initYouTubeApi() {
        $window.onYouTubeIframeAPIReady = initPlayer;

        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";

        var firstScriptTag = document.getElementsByTagName('script')[0];

        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    }

    /**
     * @name initPlayer
     * @function
     * @memberOf HomeCtrl
     * @description Callback for youtube api ready
     */
    function initPlayer() {
        sv.player = new YT.Player('home-hero-video', sv.video_object);
    }

    /**
     * @name onPlayerReady
     * @function
     * @memberOf HomeCtrl
     * @description Callback for youtube player ready
     * @param {object} e - The event object
     */
    function onPlayerReady(e) {
        sv.player.mute();
    }

    /**
     * @name onPlayerStateChange
     * @function
     * @memberOf HomeCtrl
     * @description Callback for youtube player state change
     * @param {object} e - The event object
     */
    function onPlayerStateChange(e) {
        var player_state = parseInt(e.data);

        if (!isNaN(player_state)) {
            if ([-1, 0, 2, 5].indexOf(player_state) > -1) {
                // status codes represent:
                // -1 – unstarted
                // 0 – ended
                // 1 – playing
                // 2 – paused
                // 3 – buffering
                // 5 – video cued
                ensureVideoIsPlaying();
            } else {
                videoIsReady();
            }
        }
    }

    /**
     * @name ensureVideoIsPlaying
     * @function
     * @memberOf HomeCtrl
     * @description Ensures the video is playing
     */
    function ensureVideoIsPlaying() {
        var state = sv.player.getPlayerState();
        if (state !== 1) {
            sv.player.playVideo();
            $('#home-hero-video').click();
            $timeout(ensureVideoIsPlaying, 100);
        } else {
            videoIsReady();
        }
    }

    /**
     * @name videoIsReady
     * @function
     * @memberOf HomeCtrl
     * @description Updates the UI to display the video when ready
     */
    function videoIsReady() {
        $scope.$apply(function(){
            sv.video_ready = true;
        });
    }

    /**
     * @name $scope.toggleVideoSound
     * @function
     * @memberOf HomeCtrl
     * @description This method allows the user to turn on the audio for the
     *              background video.
     */
    $scope.toggleVideoSound = function() {
        if (sv.video_muted) {
            sv.player.unMute();
            sv.video_muted = false;
        }
        else {
            sv.player.mute();
            sv.video_muted = true;
        }
    }

    window.scope = $scope;

};
