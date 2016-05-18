'use strict';
angular.module('main')
    .controller('MainCtrl', function($scope, $global, $state) {

        $scope.mainConfig = "Main Configuration";
        // $scope.init = function() {
        //     if ($global.authentication) {
        //         $scope.userRole = $global.getUserRole();
        //         $scope.userName = $global.authentication.name;
        //     }

        // }
        // $scope.$on('init', function(event, data) {
        //     $scope.init();
        // });
        // $scope.init();

        $scope.go = function(state) {
            $state.go(state);
        }

    });
