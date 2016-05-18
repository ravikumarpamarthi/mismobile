'use strict';
angular.module('main')
    .controller('MenuCtrl', function($scope, $global, $state, $rootScope, $moment) {
        $scope.groups = [];
        for (var i = 0; i < 1; i++) {
            $scope.groups[i] = {
                name: i,
                items: []
            };
            for (var j = 0; j < 4; j++) {
                $scope.groups[i].items.push(i + '-' + j);
            }
        }
$scope.lists=[]
for (var i = 0; i < 1; i++) {
            $scope.lists[i] = {
                name: i,
                items: []
            };
            for (var j = 0; j < 4; j++) {
                $scope.lists[i].items.push(i + '-' + j);
            }
        }
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

        $scope.logout = function() {
            $global.removeRole();

            $state.go('main.login');
        }
        $scope.authentication = $global.authentication;
        $rootScope.$on("initMenu", function() {
            $scope.authentication = $global.authentication;
        })
        $scope.selectedDate1 = $moment(new Date()).subtract('days', 1).format("DD-MMM-YYYY");
        $scope.reports = function() {
            $global.hydro = true;
            if ($global.authentication.role == "APEX") {
                $state.go('main.hydro', { date: $moment($scope.selectedDate1).format("DD-MMM-YYYY") });
            } else {
                $state.go('main.reports-dgr-sbu')
            }

        }
        $scope.pieChart = function(){
            $global.hydro = true;
            console.log($global.authentication);
            if ($global.authentication.role == "APEX") {
                $state.go('main.pie_chart');
            } 
        }
        $scope.columnChart = function(){
            $global.hydro = true;
            console.log($global.authentication);
            if ($global.authentication.role == "APEX") {
                $state.go('main.column_chart');
            } 
        }
        $scope.trends = function(){
            //$global.hydro = true;
            
                $state.go('main.trends');
            
        }
        $scope.showDashboard = function() {

            if ($global.userRole.role == 'APEX') {
                $state.go('main.dashboard');
            } else if ($global.userRole.role == 'PlantUser') {
                $state.go('main.dashboard-plantuser')
            }
        }

    });
