'use strict';
angular.module('main')
    .controller('WindPlantsCtrl', function($stateParams, $ionicModal, $ionicPopup, $ionicLoading, $state, $scope, Main, $filter, ionicDatePicker, $moment, $global, reportsService) {

        if ($stateParams.date) {
            $scope.selectedDate1 = $moment($stateParams.date, "DD-MMM-YYYY").toDate();
            $scope.date = $moment($stateParams.date, "DD-MMM-YYYY").toDate();
        } else {
            var today = new Date();
            $scope.date = today.setDate(today.getDate() - 1);
            $scope.maxdate = today;
            $scope.selectedDate1 = $moment(new Date()).subtract('days', 1).format("DD-MMM-YYYY");
        }

        $scope.changedate = function(dateChange) {
            $scope.getReport(dateChange);
        }

        $scope.getReport = function(dateVal) {

            $ionicLoading.show();
            var userRole = $global.userRole.role;
            reportsService.getApexReport(dateVal).then(function(res) {
                $ionicLoading.hide();

                if (res.status == $global.SUCCESS) {
                    if ($global.wind) {
                        $scope.windData = $filter('filter')(res.data.dgrs, { type: 'WIND' });

                        $global.wind = "";
                    } else if ($global.hydro) {
                        $scope.hydroData = $filter('filter')(res.data.dgrs, { type: 'HYDRO' });

                        $global.hydro = "";
                    } else if ($global.thermal) {
                        $scope.biomassData = $filter('filter')(res.data.dgrs, { type: 'BIOMASS' });
                        $global.thermal = "";
                    } else {
                        $scope.windData = $filter('filter')(res.data.dgrs, { type: 'WIND' });
                        $scope.hydroData = $filter('filter')(res.data.dgrs, { type: 'HYDRO' });
                        $scope.biomassData = $filter('filter')(res.data.dgrs, { type: 'BIOMASS' });
                    }
                    $scope.reportsData = res.data.dgrs;
                    if ($scope.reportsData == "" || $scope.reportsData == null) {
                        $scope.disablePdf = true;
                    } else {
                        $scope.disablePdf = false;
                    }
                } else if (res.status == $global.FAILURE) {

                }
            })
        }

        $scope.getReport($stateParams.date);

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



        $scope.openDatePicker = function() {
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.goToPlantDetails = function() {
            $state.go("main.plantdetails");
        };




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


        // $scope.units = [{ "name": "T147", "capacity": "2.000", "startDate": "19-Nov-2015", "dayGeneration": "6682", "dayOperationHrs": "22:58:00", "lullHrs": "00:00:00", "dayPlf": "13.921", "monthlyPlf": "185.000", "yearlyPlf": "185.000", "avgWindSpeed": "5.020", "mtdGeneration": "96597", "mtdOperationHrs": "13.0", "cytdGeneration": "728373", "cytdOperationHrs": "21.0", "fytdGeneration": "0", "fytdOperationHrs": "0.0", "cumGeneration": "4245279", "cumOperationHrs": "0.0", "wtgFaultHrs": "00:00:00", "wtgIdleHrs": "00:00:00", "wtgShutdownHrs": "00:00:00", "wtgRemarks": "", "ussFaultHrs": "00:00:00", "ussShutdownHrs": "00:00:00", "stationFaultHrs": "00:00:00", "stationShutdownHrs": "00:00:00", "pssFaultHrs": "00:00:00", "pssShutdownHrs": "00:00:00", "lineFaultHrs": "00:00:00", "lineShutdownHrs": "00:00:00", "line33kvFaultHrs": "00:00:00", "line33kvShutdownHrs": "00:00:00", "line220kvFaultHrs": "00:00:00", "line220kvShutdownHrs": "00:00:00", "gridRemarks": "Blade Inspection done by Greenko team", "macAvailability": "100.000", "gridAvailability": "100.000" },
        //     { "name": "T148", "capacity": "2.000", "startDate": "19-Nov-2015", "dayGeneration": "5962", "dayOperationHrs": "22:46:00", "lullHrs": "00:00:00", "dayPlf": "12.421", "monthlyPlf": "169.000", "yearlyPlf": "169.000", "avgWindSpeed": "4.910", "mtdGeneration": "88684", "mtdOperationHrs": "13.0", "cytdGeneration": "658981", "cytdOperationHrs": "22.0", "fytdGeneration": "0", "fytdOperationHrs": "0.0", "cumGeneration": "3855924", "cumOperationHrs": "0.0", "wtgFaultHrs": "00:00:00", "wtgIdleHrs": "00:00:00", "wtgShutdownHrs": "00:00:00", "wtgRemarks": "", "ussFaultHrs": "00:00:00", "ussShutdownHrs": "00:00:00", "stationFaultHrs": "00:00:00", "stationShutdownHrs": "00:00:00", "pssFaultHrs": "00:00:00", "pssShutdownHrs": "00:00:00", "lineFaultHrs": "00:00:00", "lineShutdownHrs": "00:00:00", "line33kvFaultHrs": "00:00:00", "line33kvShutdownHrs": "00:00:00", "line220kvFaultHrs": "00:00:00", "line220kvShutdownHrs": "00:00:00", "gridRemarks": "Blade Inspection done by Greenko team", "macAvailability": "100.000", "gridAvailability": "100.000" },
        //     { "name": "T149", "capacity": "2.000", "startDate": "19-Nov-2015", "dayGeneration": "5962", "dayOperationHrs": "22:46:00", "lullHrs": "00:00:00", "dayPlf": "12.421", "monthlyPlf": "169.000", "yearlyPlf": "169.000", "avgWindSpeed": "4.910", "mtdGeneration": "88684", "mtdOperationHrs": "13.0", "cytdGeneration": "658981", "cytdOperationHrs": "22.0", "fytdGeneration": "0", "fytdOperationHrs": "0.0", "cumGeneration": "3855924", "cumOperationHrs": "0.0", "wtgFaultHrs": "00:00:00", "wtgIdleHrs": "00:00:00", "wtgShutdownHrs": "00:00:00", "wtgRemarks": "", "ussFaultHrs": "00:00:00", "ussShutdownHrs": "00:00:00", "stationFaultHrs": "00:00:00", "stationShutdownHrs": "00:00:00", "pssFaultHrs": "00:00:00", "pssShutdownHrs": "00:00:00", "lineFaultHrs": "00:00:00", "lineShutdownHrs": "00:00:00", "line33kvFaultHrs": "00:00:00", "line33kvShutdownHrs": "00:00:00", "line220kvFaultHrs": "00:00:00", "line220kvShutdownHrs": "00:00:00", "gridRemarks": "Blade Inspection done by Greenko team", "macAvailability": "100.000", "gridAvailability": "100.000" },
        //     { "name": "T150", "capacity": "2.000", "startDate": "19-Nov-2015", "dayGeneration": "5962", "dayOperationHrs": "22:46:00", "lullHrs": "00:00:00", "dayPlf": "12.421", "monthlyPlf": "169.000", "yearlyPlf": "169.000", "avgWindSpeed": "4.910", "mtdGeneration": "88684", "mtdOperationHrs": "13.0", "cytdGeneration": "658981", "cytdOperationHrs": "22.0", "fytdGeneration": "0", "fytdOperationHrs": "0.0", "cumGeneration": "3855924", "cumOperationHrs": "0.0", "wtgFaultHrs": "00:00:00", "wtgIdleHrs": "00:00:00", "wtgShutdownHrs": "00:00:00", "wtgRemarks": "", "ussFaultHrs": "00:00:00", "ussShutdownHrs": "00:00:00", "stationFaultHrs": "00:00:00", "stationShutdownHrs": "00:00:00", "pssFaultHrs": "00:00:00", "pssShutdownHrs": "00:00:00", "lineFaultHrs": "00:00:00", "lineShutdownHrs": "00:00:00", "line33kvFaultHrs": "00:00:00", "line33kvShutdownHrs": "00:00:00", "line220kvFaultHrs": "00:00:00", "line220kvShutdownHrs": "00:00:00", "gridRemarks": "Blade Inspection done by Greenko team", "macAvailability": "100.000", "gridAvailability": "100.000" },
        //     { "name": "T150", "capacity": "2.000", "startDate": "19-Nov-2015", "dayGeneration": "5962", "dayOperationHrs": "22:46:00", "lullHrs": "00:00:00", "dayPlf": "12.421", "monthlyPlf": "169.000", "yearlyPlf": "169.000", "avgWindSpeed": "4.910", "mtdGeneration": "88684", "mtdOperationHrs": "13.0", "cytdGeneration": "658981", "cytdOperationHrs": "22.0", "fytdGeneration": "0", "fytdOperationHrs": "0.0", "cumGeneration": "3855924", "cumOperationHrs": "0.0", "wtgFaultHrs": "00:00:00", "wtgIdleHrs": "00:00:00", "wtgShutdownHrs": "00:00:00", "wtgRemarks": "", "ussFaultHrs": "00:00:00", "ussShutdownHrs": "00:00:00", "stationFaultHrs": "00:00:00", "stationShutdownHrs": "00:00:00", "pssFaultHrs": "00:00:00", "pssShutdownHrs": "00:00:00", "lineFaultHrs": "00:00:00", "lineShutdownHrs": "00:00:00", "line33kvFaultHrs": "00:00:00", "line33kvShutdownHrs": "00:00:00", "line220kvFaultHrs": "00:00:00", "line220kvShutdownHrs": "00:00:00", "gridRemarks": "Blade Inspection done by Greenko team", "macAvailability": "100.000", "gridAvailability": "100.000" },
        //     { "name": "T151", "capacity": "2.000", "startDate": "19-Nov-2015", "dayGeneration": "5962", "dayOperationHrs": "22:46:00", "lullHrs": "00:00:00", "dayPlf": "12.421", "monthlyPlf": "169.000", "yearlyPlf": "169.000", "avgWindSpeed": "4.910", "mtdGeneration": "88684", "mtdOperationHrs": "13.0", "cytdGeneration": "658981", "cytdOperationHrs": "22.0", "fytdGeneration": "0", "fytdOperationHrs": "0.0", "cumGeneration": "3855924", "cumOperationHrs": "0.0", "wtgFaultHrs": "00:00:00", "wtgIdleHrs": "00:00:00", "wtgShutdownHrs": "00:00:00", "wtgRemarks": "", "ussFaultHrs": "00:00:00", "ussShutdownHrs": "00:00:00", "stationFaultHrs": "00:00:00", "stationShutdownHrs": "00:00:00", "pssFaultHrs": "00:00:00", "pssShutdownHrs": "00:00:00", "lineFaultHrs": "00:00:00", "lineShutdownHrs": "00:00:00", "line33kvFaultHrs": "00:00:00", "line33kvShutdownHrs": "00:00:00", "line220kvFaultHrs": "00:00:00", "line220kvShutdownHrs": "00:00:00", "gridRemarks": "Blade Inspection done by Greenko team", "macAvailability": "100.000", "gridAvailability": "100.000" },
        //     { "name": "T152", "capacity": "2.000", "startDate": "19-Nov-2015", "dayGeneration": "5962", "dayOperationHrs": "22:46:00", "lullHrs": "00:00:00", "dayPlf": "12.421", "monthlyPlf": "169.000", "yearlyPlf": "169.000", "avgWindSpeed": "4.910", "mtdGeneration": "88684", "mtdOperationHrs": "13.0", "cytdGeneration": "658981", "cytdOperationHrs": "22.0", "fytdGeneration": "0", "fytdOperationHrs": "0.0", "cumGeneration": "3855924", "cumOperationHrs": "0.0", "wtgFaultHrs": "00:00:00", "wtgIdleHrs": "00:00:00", "wtgShutdownHrs": "00:00:00", "wtgRemarks": "", "ussFaultHrs": "00:00:00", "ussShutdownHrs": "00:00:00", "stationFaultHrs": "00:00:00", "stationShutdownHrs": "00:00:00", "pssFaultHrs": "00:00:00", "pssShutdownHrs": "00:00:00", "lineFaultHrs": "00:00:00", "lineShutdownHrs": "00:00:00", "line33kvFaultHrs": "00:00:00", "line33kvShutdownHrs": "00:00:00", "line220kvFaultHrs": "00:00:00", "line220kvShutdownHrs": "00:00:00", "gridRemarks": "Blade Inspection done by Greenko team", "macAvailability": "100.000", "gridAvailability": "100.000" }
        // ];
        // $scope.ud = $scope.units[0];



        $scope.selectedRow = 0; // initialize our variable to null


        $scope.showDetails = function(unit, index) {
            $scope.ud = unit;
            $scope.selectedRow = index;
        };



    });
