'use strict';
angular.module('main')
    .controller('DashboardCtrl', function($state, $ionicLoading, $scope, ionicDatePicker, $global, $moment, reportsService, $filter, dashboardService) {
        $scope.go = function(state) {
            $state.go(state);
        }
        $scope.$on('$ionicView.beforeEnter', function(e, config) {
            config.enableBack = false;
        });

        $scope.changedate = function(dateChange) {
            $scope.init(dateChange);
        }

        var today = new Date();
        $scope.date = today.setDate(today.getDate() - 1);
        $scope.maxdate = today;
        var date = $moment($scope.date).format('DD-MMM-YYYY');
        $scope.init = function(dateVal) {
            $scope.hydro = $scope.wind = $scope.biomass = $scope.solar = "";
            $ionicLoading.show();
            dashboardService.getDashboardApex(dateVal).then(function(res) {
                var dashRecords = res.data.dashboards;

                for (var i = dashRecords.length - 1; i >= 0; i--) {
                    if (dashRecords[i].type == 'HYDRO') {
                        $scope.hydro = dashRecords[i];
                    }
                    if (dashRecords[i].type == 'WIND') {
                        $scope.wind = dashRecords[i];
                    }
                    if (dashRecords[i].type == 'BIOMASS') {
                        $scope.biomass = dashRecords[i];
                    }
                    if (dashRecords[i].type == 'SOLAR') {
                        $scope.solar = dashRecords[i];
                    }
                }
                $ionicLoading.hide();
            });
        }

        $scope.init(date);


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
        $scope.typeClick = function(type) {

            if (type.type == "WIND") {
                $global.wind = true;

                $state.go('main.wind', { date: $moment($scope.selectedDate1).format("DD-MMM-YYYY") });
            } else if (type.type == "HYDRO") {

                $global.hydro = true;
                $state.go('main.hydro', { date: $moment($scope.selectedDate1).format("DD-MMM-YYYY") });
            } else if (type.type == "BIOMASS") {
                $global.thermal = true;
            }
            // toastr.success("No Reports found ! ");

            // else if(type.type=="SOLAR"){
            //     $global.solar = true;
            // }
        }

    });
