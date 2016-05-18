'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:DashboardPlantuserCtrl
 * @description
 * # DashboardPlantuserCtrl
 * Controller of the minovateApp
 */
angular.module('main')
    .controller('DashboardPlantuserCtrl', function($scope, $moment,$state, ionicDatePicker, dashboardService, $ionicLoading) {
        $scope.$on('$ionicView.beforeEnter', function(e, config) {
            config.enableBack = false;
        });
        $scope.vm = {};
        $scope.checkDatevalue=function(){
            $state.go('main.reports-dgr-sbu', { date: $moment($scope.selectedDate1).format("DD-MMM-YYYY") });
        }
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
            $scope.init(dateChange);
        }

        var today = new Date();
        $scope.date = today.setDate(today.getDate() - 1);
        $scope.maxdate = today;
        var date = $moment($scope.date).format('DD-MMM-YYYY');
        //var date = $moment($scope.date).format('DD-MMM-YYYY');


        $scope.init = function(dateVal) {
            $scope.hydro = $scope.wind = $scope.biomass = $scope.solar = "";
            $ionicLoading.show();
            dashboardService.getUserPlants().then(function(res) {
                $scope.plants = res.data.plants;
                $scope.vm.selectedItem = $scope.plants[0];
                $scope.getPlantReport(dateVal);
            })

            $ionicLoading.hide();
        }


        $scope.loadDashboard = function(dateSelected) {
            $scope.getPlantReport(dateSelected);
        }

        $scope.getPlantReport = function(dateValue) {
            // var dateValue = $moment($scope.vm.date).format('DD-MMM-YYYY');
            var plantid = $scope.vm.selectedItem.plantDocId;
            dashboardService.getDashboardPlantUser(dateValue, plantid).then(function(res) {
                var dashRecords = res.data.dashboards;
                for (var i = dashRecords.length - 1; i >= 0; i--) {
                    if (dashRecords[i].type == 'HYDRO') {
                        $scope.reportData = dashRecords[i];

                    }
                    if (dashRecords[i].type == 'WIND') {
                        $scope.reportData = dashRecords[i];

                    }
                    if (dashRecords[i].type == 'BIOMASS') {
                        $scope.reportData = dashRecords[i];

                    }
                    if (dashRecords[i].type == 'SOLAR') {
                        $scope.reportData = dashRecords[i];

                    }
                }
            })
        }
        $scope.init(date);

    });
