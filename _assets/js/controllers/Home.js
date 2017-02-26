
nvns.nvnsApp.controller('HomeCtrl', ['$scope', '$timeout',
                                     function($scope, $timeout){

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
                modestbranding: 1,
                autohide: 1,
                origin: window.location.href
            }
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
        console.log('trying');
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
    }

    window.scope = $scope;

}]);