
nvns.nvnsApp.controller('DefaultPageCtrl', ['$scope', '$timeout',
                                     function($scope, $timeout){

    $scope.vars = {
        scrolled: false,
        viewport_width: 0
    }

    $scope.init = function() {

        $scope.getViewportWidth();

        $(window).resize(function(){
            $scope.vars.viewport_width = $scope.getViewportWidth();
        });

        $(window).scroll(function(){
            $scope.setScrolledState();
        });

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    $scope.setScrolledState = function() {
        var scroll = $(window).scrollTop(),
            threshold = ($scope.vars.viewport_width >= 1199) ? 100 : 0;

        $timeout(function(){
            $scope.$apply(function(){
                $scope.vars.scrolled = (scroll > threshold) ? true : false;
            });
        });
    }

    $scope.getViewportWidth = function() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    window.scope = $scope;

}]);