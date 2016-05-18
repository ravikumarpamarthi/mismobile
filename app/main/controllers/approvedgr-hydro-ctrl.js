'use strict';
angular.module('main')
    .controller('ApproveDgrHydroCtrl', function($scope, $global, HydroService) {
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
                            if (res.data.nextDate == "") {
                                $scope.pendingDateNull = "No Data To Approve";
                            } else {
                                $scope.showDetails(0);
                            }
                        }
                    });
                    HydroService.getPlantLevelData($scope.pendingDate, $scope.selectedItem.plantDocId).then(function(res) {
                        if (res.status == $global.SUCCESS) {
                            $scope.data = res.data;
                        }
                        else{
                           $scope.data={}
                          /*  $scope.data.day_generation = '';
                 $scope.data.runningHours = '';
                 $scope.data.idleHours = '';
                 $scope.data.stoppageHours = '';
                 $scope.data.unitLoad = '';
                 $scope.data.unitdischarge = '';
                 $scope.data.remarks = '';
                 $scope.data.machineAvailability = ''; */
                        }
                    });
                }
            });
        }
        $scope.getPlantData();
        $scope.selectedRow=0;
        $scope.showDetails = function(index) {
            //$scope.ud = unit;
            $scope.selectedRow = index;
            var name = "UNIT-" + (parseInt(index) + 1)
            if($scope.pendingDate){
            HydroService.getUnitLevelDataHydro($scope.pendingDate, $scope.selectedItem.plantDocId, name).then(function(res) {
                if (res.status == $global.SUCCESS) {
                    $scope.data = res.data;
                }
            });
        }
        };

        $scope.toggleGroup = function(group) {
            var name = "UNIT-" + group.name;
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
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };
        $scope.ApproveHydroData = function() {
            var data = {
                "plantId": $scope.selectedItem.plantDocId,
                "day": $scope.pendingDate
            }

            HydroService.approveData(data).then(function(res) {
                if (res.status == $global.SUCCESS) {
                    var plantDetails = {
                            "id": $scope.selectedItem.plantDocId,
                            "generationDay": $scope.pendingDate
                        }
                    $global.showToastMessage("Approved Successfully!", 'short', 'center');
                    HydroService.getNextPending($scope.selectedItem.plantDocId).then(function(SubRes) {
                        
                        if (SubRes.status == $global.SUCCESS) {
                            // toastr.success(res.data.message);
                             //$scope.pendingDateHideShow = true;
                            $scope.pendingDate = SubRes.data.nextDate;
                            $scope.getPlantData();
                        } else if (SubRes.status == $global.FAILURE) {
                           $scope.errorMessage = res.error.message;
                           $scope.pendingDateInvalidID = true;
                        }
                        
                    });
                } else if (res.status == $global.FAILURE) {
                    $scope.errorMessage = res.error.message;
                }
            })
        };
        $scope.submitunitLevelData = function(data) {
            if (data) {
                //console.log(data);
                $scope.data.plantId = $scope.selectedItem.plantDocId;
                $scope.data.date = $scope.pendingDate;
                $scope.data.generation = $scope.data.day_generation;
                $scope.data.unitName = "UNIT-" + (parseInt($scope.selectedRow) + 1);
                HydroService.hydroUnitLevelEdit($scope.data).then(function(res) {
                    if (res.status == $global.SUCCESS) {
                        $global.showToastMessage("Data Updated Successfully!", 'short', 'center');
                    } else if (res.status == $global.FAILURE) {
                        $scope.errorMessage = res.error.message;
                    }
                });
            }

        }
    });
