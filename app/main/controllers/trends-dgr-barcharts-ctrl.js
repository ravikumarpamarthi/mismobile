'use strict';
angular.module('main')
    .controller('TrendsDgrBarCtrl', function($scope, $state, $ionicLoading, $moment, ionicDatePicker, HydroService, dashboardService, $global) {

        $scope.months = [{
            name: "Jan-16",
            value: "1"
        }, {
            name: "Feb-16",
            value: "2"
        }, {
            name: "Mar-16",
            value: "3"
        }, {
            name: "Apr-16",
            value: "4"
        }, {
            name: "May-16",
            value: "5"
        }, {
            name: "Jun-16",
            value: "6"
        }];
        $scope.types = [{
            name: "Hydro",
            value: "HYDRO"
        }, {
            name: "Wind",
            value: "WIND"
        }];
         $scope.selectedItem = $scope.types[0];
        var ipObj1 = {
            callback: function(val) { //Mandatory
                $scope.selectedDate1 = val;
                var s = $moment($scope.selectedDate1).format('DD-MMM-YYYY');
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

            from: new Date(2012, 1, 1),
            to: new Date(),
            inputDate: new Date(),
            mondayFirst: true,
            closeOnSelect: false,
            templateType: 'model'
        };
        $scope.selectedDate1 = $moment(new Date()).subtract('days', 1).format("DD-MMM-YYYY");
        $scope.openDatePicker = function() {

            ionicDatePicker.openDatePicker(ipObj1);
        };
        $scope.changedate = function(dateChange) {
            $scope.getChartsByDate($scope.selectedItem, $scope.apexMonth)
        }

        var today = new Date();
        $scope.date = today.setDate(today.getDate() - 1);
        $scope.maxdate = today;
        var date = $moment($scope.date).format('DD-MMM-YYYY');
        $scope.chartObject = {};
        $scope.apexMonth = $scope.months[new Date().getMonth()];
        dashboardService.getAllPlants().then(function(res) {
            if (res.status == 'SUCCESS') {
                
                $scope.plants = res.data.plants
                //$scope.selectedItem = $scope.plants[0];
                $scope.plantName = $scope.plants[0].name;
                $scope.date = new Date();
                $scope.getChartsByDate($scope.selectedItem, $scope.apexMonth)
            }
        })

        $scope.getChartsByDate = function(selectedItem, month) {
            if ($global.userRole.role == "APEX") {
                var data = {
                    
                    month: month.value,
                    year: $scope.date.getFullYear(),
                    type:selectedItem.value

                }
                HydroService.dgrTrendsBarApexLevel(data).then(function(res) {
                    if (res.status == "SUCCESS") {
                        //console.log(res.data);
                        $scope.chartObject.type = "BarChart"
                        $scope.chartObject.data = res.data
                        $scope.chartObject.options = {

                            "title": "Generation Vs Projection",
                            "isStacked": "false",
                            "fill": 20,
                            "displayExactValues": true,
                            "vAxis": {
                                "title": "Plant Names"

                            },
                            "hAxis": {
                                "title": "in Mu"

                            }
                        };
                    }
                })

            } else if ($global.userRole.role == "SBU") {
                var data = {

                    date: $moment($scope.selectedDate1).format('DD-MMM-YYYY'),
                    type: $global.userRole.businessType

                }
                HydroService.dgrTrendsSbuLevel(data).then(function(res) {
                    if (res.status == "SUCCESS") {
                        //console.log(res.data);
                        $scope.chartObject.type = "BarChart"
                        $scope.chartObject.data = res.data
                        $scope.chartObject.options = {

                            "title": "Generation Vs Export Vs Loss",
                            "fill": 20,
                            "displayExactValues": true,
                            "vAxis": {
                                "title": "Units in lakhs"

                            },
                            "hAxis": {
                                "title": "Day"

                            }
                        };
                    }
                })

            } else if ($global.userRole.role == "PlantUser") {
                var data = {

                    date: $moment($scope.selectedDate1).format('DD-MMM-YYYY'),
                    type: $global.userRole.businessType

                }
                HydroService.dgrTrendsPlantLevel(data).then(function(res) {
                    if (res.status == "SUCCESS") {
                        //console.log(res.data);
                        $scope.chartObject.type = "BarChart"
                        $scope.chartObject.data = res.data
                        $scope.chartObject.options = {

                            "title": "Generation Vs Export Vs Loss",
                            "isStacked": "false",
                            "fill": 20,
                            "displayExactValues": true,
                            "vAxis": {
                                "title": "Units in lakhs"

                            },
                            "hAxis": {
                                "title": "Plant Names"

                            },
                            "legend": { "position": 'none' }
                        };
                    }
                })

               

            }


        }

    });