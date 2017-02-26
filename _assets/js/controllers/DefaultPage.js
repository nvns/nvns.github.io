
nvns.nvnsApp.controller('DefaultPageCtrl', ['$scope', '$timeout',
                                     function($scope, $timeout){

    $scope.vars = {
        scrolled: false
    }

    $scope.init = function() {
        $(window).scroll(function(){
            var scroll = $(window).scrollTop();
            $timeout(function(){
                $scope.$apply(function(){
                    $scope.vars.scrolled = (scroll > 100) ? true : false;
                });
            });
        });

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    window.scope = $scope;

}]);