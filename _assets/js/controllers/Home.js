
nvns.nvnsApp.controller('HomeCtrl', ['$scope', '$timeout', '$http',
                                     function($scope, $timeout, $http){

    $scope.vars = {
        scrolled: false,
        video_ready: false,
        /*video: {
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
                origin: window.location.href
            },
            muted: true
        }*/
        video: null,
        video_options: {
            id: '199110986',
            loop: true,
            title: false,
            portrait: false,
            muted: true,
            autoplay: true
        }
    }

    $scope.init = function() {

        $(window).scroll(function(){
            var scroll = $(window).scrollTop();
            $timeout(function(){
                $scope.$apply(function(){
                    $scope.vars.scrolled = (scroll > 0) ? true : false;
                });
            });
        });

        $scope.initVideoPlayer();

    }

    $scope.initVideoPlayer = function() {

        $scope.vars.video = new Vimeo.Player('video-container', $scope.vars.video_options);

        $scope.vars.video.on('loaded', function (data) {
            $scope.vars.video.play();

        })

        $scope.vars.video.ready().then(function() {
            $scope.vars.video.getPaused().then(function(paused) {
                if (paused) {
                    $scope.vars.video.play();
                }
            });
        });



        $scope.vars.video_ready = true;

        /*if ($scope.vars.video.player) {
            $scope.$on('youtube.player.ready', function(event, player){
                $scope.vars.video.player.mute();
            });
            $scope.$on('youtube.player.playing', function(event, player){
                $scope.vars.video_ready = true;
            });
        }
        else {
            $timeout($scope.initVideoPlayer, 10);
        }*/
    }

    $scope.toggleVideoSound = function() {
        if ($scope.vars.video.muted) {
            $scope.vars.video.player.unMute();
            $scope.vars.video.muted = false;
        }
        else {
            $scope.vars.video.player.mute();
            $scope.vars.video.muted = true;
        }
    }

    window.scope = $scope;

}]);
