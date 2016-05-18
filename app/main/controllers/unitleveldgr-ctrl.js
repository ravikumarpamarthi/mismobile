'use strict';
angular.module('main')
    .controller('UnitleveldgrCtrl', function($state, $ionicLoading, $scope, $global, $moment, $filter, HydroService) {
        /*$scope.go = function(state) {
            $state.go(state);
        }
        $scope.$on('$ionicView.beforeEnter', function(e, config) {
            config.enableBack = false;
        });*/
        $scope.data = {};
        $scope.getPlantData = function() {
            HydroService.plantName($global.userId).then(function(res) {
                if (res.status == $global.SUCCESS) {

                    $scope.plants = res.data.plants
                    $scope.selectedItem = res.data.plants[0];

                    $scope.groups = [];
                    for (var i = 0; i < $scope.plants[0].unitCount; i++) {
                        $scope.groups[i] = {
                            name: parseInt(i) + 1,
                            items: []
                        };
                        for (var j = 0; j < 1; j++) {
                            $scope.groups[i].items.push(i + '-' + j);
                        }
                    }
                    HydroService.getNextPending($scope.selectedItem.plantDocId).then(function(res) {
                        if (res.status == $global.SUCCESS) {
                            $scope.pendingDate = res.data.nextDate;
                            if (res.data.nextDate != "") {
                                HydroService.getUnitLevelDataHydro($scope.pendingDate, $scope.selectedItem.plantDocId, "UNIT-1").then(function(res) {
                                    if (res.status == $global.SUCCESS) {
                                        $scope.data = res.data;
                                    }

                                });
                            } else {
                                $scope.pendingDateNull = "Data Up To Date";
                            }
                        }
                    });

                }

            });
        }
        $scope.getPlantData();

        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
            var name = "UNIT-" + group.name;
            if($scope.pendingDate){
            HydroService.getUnitLevelDataHydro($scope.pendingDate, $scope.selectedItem.plantDocId, name).then(function(unitRes) {
                if (unitRes.status == $global.SUCCESS) {
                    $scope.data = unitRes.data;
                }

            });
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };
        $scope.showDetails = function(data, index) {
            //$scope.ud = unit;
            $scope.selectedRow = index;
            var name = "UNIT-" + (parseInt(index) + 1)
            if($scope.pendingDate){
            HydroService.getUnitLevelDataHydro($scope.pendingDate, $scope.selectedItem.plantDocId, name).then(function(res) {
                if (res.status == $global.SUCCESS) {
                    $scope.data = res.data;
                }

            });
            if (data) {
               data={}

            }
}

        };
        $scope.selectedRow = 0;
        $scope.submitunitLevelData = function(form) {
            if ($scope.unitLevelDGR.$valid) {
                $scope.data.plantId = $scope.selectedItem.plantDocId;
                $scope.data.date = $scope.pendingDate;
                $scope.data.generation = $scope.data.day_generation;
                $scope.data.unitName = "UNIT-" + (parseInt($scope.selectedRow) + 1);
                HydroService.hydroUnitLevelEdit($scope.data).then(function(res) {
                    if (res.status == $global.SUCCESS) {
                        $global.showToastMessage("Data Saved Sucessfully!", 'short', 'center');
                    } else if (res.status == $global.FAILURE) {
                        $scope.errorMessage = res.error.message;
                    }
                });
            }
        }

    });
