
nvns.nvnsApp.controller('HomeCtrl', ['$scope', '$timeout', '$sce',
                                     function($scope, $timeout, $sce){

    $scope.vars = {
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
                enablejsapi: 1,
                modestbranding: 1,
                autohide: 1,
                mute: 1,
                origin: window.location.href
            },
            muted: true
        },
        yt_url: null
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

        var url = 'https://www.youtube.com/embed/' +
                  $scope.vars.video.id + '?',
            params = [];

        $.each($scope.vars.video.params, function (key, val) {
            params.push(key + '=' + val);
        });

        url += params.join('&');

        $scope.vars.yt_url = $sce.trustAsResourceUrl(url);

        $scope.vars.video_ready = true;

        /*
        if ($scope.vars.video.player) {
            $scope.$on('youtube.player.ready', function(event, player){
                $scope.vars.video.player.mute();
            });
            $scope.$on('youtube.player.playing', function(event, player){
                $scope.vars.video_ready = true;
            });
        }
        else {
            $timeout($scope.initVideoPlayer, 10);
        }
        */
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
