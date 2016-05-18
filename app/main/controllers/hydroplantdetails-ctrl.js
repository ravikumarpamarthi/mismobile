'use strict';
angular.module('main')
    .controller('HydroPlantDetailsCtrl', function($scope, ionicDatePicker, HydroService, $global,$state) {
        $scope.getPlantData = function() {
            $scope.data = {};
            HydroService.plantName($global.userId).then(function(res) {
                if (res.status == $global.SUCCESS) {

                    $scope.plants = res.data.plants
                    $scope.selectedItem = res.data.plants[0];
                    HydroService.getNextPending($scope.selectedItem.plantDocId).then(function(PendingDateres) {
                        if (PendingDateres.status == $global.SUCCESS) {
                            $scope.pendingDate = PendingDateres.data.nextDate;
                            if (PendingDateres.data.nextDate != "") {
                                HydroService.getPlantLevelData($scope.pendingDate, $scope.selectedItem.plantDocId).then(function(PlantLevelres) {
                                    if (PlantLevelres.status == $global.SUCCESS) {

                                        $scope.data = PlantLevelres.data;


                                    }


                                });
                            } else {
                                $scope.pendingDateNull = "Data Up To Date"
                            }
                        }
                    });


                }
            });
        }
        $scope.getPlantData();

        $scope.submitPlantlevelData = function(form) {
            $scope.Submitted = true;
            if ($scope.data1.$valid) {
                $scope.data.date = $scope.pendingDate;
                $scope.data.plantId = $scope.selectedItem.plantDocId;
                $scope.data.gridAvailability = $scope.data.grid_availability;
                $scope.data.loadMeasuredTime = "09:00:00";
                HydroService.hydroPlantLevelEdit($scope.data).then(function(res) {
                        if (res.status == $global.SUCCESS) {
                            $global.showToastMessage("Data Saved Successfully!", 'short', 'center');
                            $state.go("main.formunitleveldgr");
                        } else if (res.status == $global.FAILURE) {
                            $scope.errorMessage = res.error.message;
                        }
                    })
                    // console.log(data)
            }

        }

    });
