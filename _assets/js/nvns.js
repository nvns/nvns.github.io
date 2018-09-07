
// establish namespace
var nvns = {};

// declare main angular module
nvns.nvnsApp = angular.module('nvnsApp', []).config([
    '$interpolateProvider',
    function($interpolateProvider) {
            $interpolateProvider.startSymbol('{$');
            $interpolateProvider.endSymbol('$}');
    }
]);
