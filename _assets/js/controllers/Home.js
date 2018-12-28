nvns.nvnsApp.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = [
    '$scope',
    '$timeout',
    '$window',
    '$sce'
];

function HomeCtrl ($scope, $timeout, $window, $sce) {

    var sc = $scope.constants = {
        selected_bg_video_index: Math.round(Math.random()),
        bg_videos: [
            {
                author: 'Richard Levien',
                youtube_id: 'X2C8gbqzv2Q',
                external_url: 'https://vimeo.com/199110986',
                has_audio: true
            },
            {
                author: 'Ian Momsen',
                youtube_id: 'MDaoEwK5P7k',
                external_url: null,
                has_audio: false
            }
        ]
    }

    var sv  = $scope.vars = {
        scrolled: false,
        video_ready: false,
        video_player: null,
        video_muted: true,
        video_object: {
            videoId: sc.bg_videos[sc.selected_bg_video_index].youtube_id,
            playerVars: {
                autoplay: 1,
                loop: 1,
                playlist: sc.bg_videos[sc.selected_bg_video_index].youtube_id,
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
        sv.video_player = new YT.Player('home-hero-video', sv.video_object);
    }

    /**
     * @name onPlayerReady
     * @function
     * @memberOf HomeCtrl
     * @description Callback for youtube player ready
     * @param {object} e - The event object
     */
    function onPlayerReady(e) {
        sv.video_player.mute();
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
        var state = sv.video_player.getPlayerState();
        if (state !== 1) {
            sv.video_player.playVideo();
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
     * @name $scope.videoService
     * @function
     * @memberOf HomeCtrl
     * @description Parses the url to determine the video service name
     * @returns {string} - The video service name
     * @param {string} url - The external video url
     */
    $scope.videoService = function(url) {
        if (!url) {
            return 'unknown';
        }
        if (url.indexOf('vimeo.com') > -1) {
            return 'vimeo';
        } else if (url.indexOf('youtube.com') > -1) {
            return 'youtube';
        } else {
            return 'unknown';
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
        if (sv.video_muted) {
            sv.video_player.unMute();
            sv.video_muted = false;
        }
        else {
            sv.video_player.mute();
            sv.video_muted = true;
        }
    }

    /**
     * @name $scope.trustUrl
     * @function
     * @memberOf HomeCtrl
     * @description Instructs angular to trust a url
     * @returns {$sce}
     * @param {string} url - The url
     */
    $scope.trustUrl = function(url) {
        return $sce.trustAsUrl(url);
    }

    window.scope = $scope;

};
