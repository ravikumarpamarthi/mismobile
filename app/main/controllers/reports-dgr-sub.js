'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:ReportsDgrSubCtrl
 * @description
 * # ReportsDgrSubCtrl
 * Controller of the minovateApp
 */
angular.module('main')
    .controller('ReportsDgrSbuCtrl', function($scope, reportsService, $stateParams,$ionicModal, $ionicPopup, $ionicLoading, ionicDatePicker, plantsService, $moment, $filter, $rootScope, $global) {
        $scope.$on('$ionicView.beforeEnter', function(e, config) {
            config.enableBack = false;
        });
        $scope.vm = {};
        var ipObj1 = {
            callback: function(val) { //Mandatory
                $scope.selectedDate1 = val;
                var s = moment($scope.selectedDate1).format('DD-MMM-YYYY');
                $scope.changedate(s);
            },
            disabledDates: [ //Optional
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],

            from: new Date(2012, 1, 1), //Optional
            to: new Date(), //Optional
            inputDate: new Date(), //Optional
            mondayFirst: true, //Optional
            //disableWeekdays: [0], //Optional
            closeOnSelect: false, //Optional
            templateType: 'model' //Optional
        };
        $scope.selectedDate1 = $moment(new Date()).subtract('days', 1).format("DD-MMM-YYYY");
        $scope.openDatePicker = function() {

            ionicDatePicker.openDatePicker(ipObj1);
        };
        $scope.changedate = function(dateChange) {
            console.log(dateChange);
            console.log($scope.selectedDate1);
            $scope.getReport(dateChange);
        }

        if ($stateParams.date) {
            $scope.selectedDate1 = $moment($stateParams.date, "DD-MMM-YYYY").toDate();
            $scope.date = $moment($stateParams.date, "DD-MMM-YYYY").toDate();
        } else {
            var today = new Date();
            $scope.date = today.setDate(today.getDate() - 1);
            $scope.maxdate = today;
            $scope.selectedDate1 = $moment(new Date()).subtract('days', 1).format("DD-MMM-YYYY");
        }
        var date = $moment($scope.date).format('DD-MMM-YYYY');
        $scope.loadSbuReports = function(dateSelected) {
                $scope.getReport($moment(dateSelected).format('DD-MMM-YYYY'));
            }
            //var date = $moment( $scope.date).format('DD-MMM-YYYY');
        $scope.getReport = function(dateVal) {
            console.log(dateVal);
            $scope.loading = true;
            var userRole = $global.userRole.role;
            var userId = $global.userId;
            if (userRole == "SBU") {
                reportsService.getSbuReport(dateVal).then(function(res) {
                    if (res.status == $global.SUCCESS) {
                        $scope.reportsData = res.data.dgrs;
                        if ($global.getLocalItem("authentication", true).businesstype == "WIND") {
                            $scope.windTotal = $filter('filter')(res.data.dgrs, { dgrDocId: 'WIND' });
                        } else if ($global.getLocalItem("authentication", true).businesstype == "HYDRO") {
                            $scope.windTotal = $filter('filter')(res.data.dgrs, { dgrDocId: 'HYDRO' });
                        }
                        if ($scope.reportsData == "" || $scope.reportsData == null) {
                            $scope.disablePdf = true;
                        } else {
                            $scope.disablePdf = false;
                        }
                    } else if (res.status == $global.FAILURE) {

                    }
                })
            }
            if (userRole == "PlantUser") {
                reportsService.getPlantUserReport(dateVal, userId).then(function(res) {
                    if (res.status == $global.SUCCESS) {
                        $scope.reportsData = res.data.dgrs;
                        $scope.hydroData = res.data.dgrs;
                        //console.log($scope.plant);
                        if ($global.getLocalItem("authentication", true).businesstype == "WIND") {
                            $scope.windTotal = $filter('filter')(res.data.dgrs, { dgrDocId: 'WIND' });
                        } else if ($global.getLocalItem("authentication", true).businesstype == "HYDRO") {
                            $scope.windTotal = $filter('filter')(res.data.dgrs, { dgrDocId: 'HYDRO' });
                        }


                        if ($scope.reportsData == "" || $scope.reportsData == null) {
                            $scope.disablePdf = true;
                        } else {
                            $scope.disablePdf = false;
                        }
                    } else if (res.status == $global.FAILURE) {

                    }
                })
            }
            $scope.loading = false;

        }

        $scope.getReport(date);
        $ionicModal.fromTemplateUrl('main/templates/windplantdetails.html', {
            scope: $scope,
            animation: 'mh-slide'
        }).then(function(modal) {
            $scope.plantDetailModal = modal
        });
        $scope.plantsOpenModal = function(data) {
            var businesstype = data.type;
            var plantname = data.plantName;
            var date = $moment($scope.date).format('DD-MMM-YYYY');

            if (businesstype == "WIND") {
                $ionicLoading.show();
                reportsService.getReportById(data.dgrDocId).then(function(res) {
                    $scope.unitData = res.data.dgr.units;
                    $scope.ud = $scope.unitData[0];
                    $scope.plantId = res.data.dgr.plantId;
                     $scope.plantName = res.data.dgr.plantName;

                    var date = date;
                    $scope.plantDetailModal.show();
                });
                reportsService.getEnergyLevelData($moment($scope.selectedDate1).format('DD-MMM-YYYY'), data.plantId, "BILLING").then(function(res) {
                    if (res.status == "SUCCESS") {

                        $scope.windenergyLevelData = res.data.meters;

                    }
                });
                $ionicLoading.hide();
            } else if (businesstype == "HYDRO") {
                $ionicLoading.show();
                $scope.PlantDta = [];
                reportsService.getReportById(data.dgrDocId).then(function(res) {
                    $scope.unitHydroData = res.data.dgr.units;
                    $scope.ud = $scope.unitHydroData[0];
                    var plantid = data.plantId;
                     $scope.plantName = res.data.dgr.plantName;
                    $scope.plantDetailModal.show();

                });
                reportsService.getEnergyLevelData($moment($scope.selectedDate1).format('DD-MMM-YYYY'), data.plantId, "BILLING").then(function(res) {
                    if (res.status == "SUCCESS") {

                        $scope.hydroenergyLevelData = res.data.meters;

                    }
                });
                reportsService.getPlantLevelData($moment($scope.selectedDate1).format('DD-MMM-YYYY'), data.plantId).then(function(plantRes) {

                    $scope.plantLevelData = plantRes.data;
                });
                $ionicLoading.hide();
            }

        };
        $scope.plantsCloseModal = function() {
            $scope.plantDetailModal.hide();
        };
        $scope.selectedRow = 0; // initialize our variable to null


        $scope.showDetails = function(unit, index) {
            $scope.ud = unit;
            $scope.selectedRow = index;
        };

    });
