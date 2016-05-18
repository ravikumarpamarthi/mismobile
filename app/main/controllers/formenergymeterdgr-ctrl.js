'use strict';
angular.module('main')
    .controller('FormEnergyMeterCtrl', function($scope, $global, HydroService,$state) {
        $scope.EnergyMeterOptions = {
            "type": "select",
            "name": "Options",
            "value": "BILLINGMETER",
            "values": ['BILLINGMETER'] //add options array here to see in dropdown
        }
        $scope.getPlantData = function() {
            $scope.data = {};
            HydroService.plantName($global.userId).then(function(res) {
                if (res.status == $global.SUCCESS) {

                    $scope.plants = res.data.plants
                    $scope.selectedItem = res.data.plants[0];
                    HydroService.getNextPending($scope.selectedItem.plantDocId).then(function(res) {
                        if (res.status == $global.SUCCESS) {
                            $scope.pendingDate = res.data.nextDate;
                            if (res.data.nextDate == "") {
                                $scope.pendingDateNull = "Data Up To Date";
                            }
                        }
                    });

                    HydroService.getPlantLevelData($scope.pendingDate, $scope.selectedItem.plantDocId).then(function(res) {
                        if (res.status == $global.SUCCESS) {

                            $scope.data = res.data;


                        }


                    });
                }
            });
        }
        $scope.getPlantData();


        $scope.submitEnergyMeterData = function(form) {
            if ($scope.energyMeter.$valid) {
                console.log($scope.data);
                $scope.data.generationDay = $scope.pendingDate;
                $scope.data.plantId = $scope.selectedItem.plantDocId;
                $scope.data.name = $scope.EnergyMeterOptions.value;

                if ($scope.EnergyMeterOptions.value == "BILLINGMETER") {
                    $scope.data.meterType = "BILLING";
                } else {
                    $scope.data.meterType = "FEEDER";
                }
                if ($scope.data) {
                    HydroService.EnterMeterlevelData($scope.data).then(function(res) {
                        if (res.status == $global.SUCCESS) {
                            $global.showToastMessage("Data Saved Successfully!", 'short', 'center');
                              $state.go("main.transactions-approvedgr-hydro");
                        }


                    });
                }
            }
        }
    });
