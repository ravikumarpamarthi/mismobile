'use strict';
angular.module('main', [
        'ionic',
        'ngCordova',
        'ui.router',
        'LocalStorageModule',
        'base64',
        'ngCordova',
        'ui.router',
        'ngMessages',
        'ionic-datepicker',
        'angular-momentjs',
        'ui.utils.masks',
        'googlechart'

    ])
    .config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, envServiceProvider, localStorageServiceProvider) {

        $ionicConfigProvider.navBar.alignTitle('left');
        localStorageServiceProvider.setPrefix('mismobile')
            .setStorageType('localStorage')
            .setNotify(true, true);

        // google.charts.load('current', { 'packages':  ['line', 'bar', 'corechart', 'geochart'] });
        /* environment start*/
        var restApi = {

            approveData: "api/dgr/approve",
            uploadFile: "api/dgr/:id/:date/units",
            meterFile: "api/dgr/:id/:date/energymeter",
            login: "api/auth/login",
            logout: "api/auth/logout",
            plantName: "dgrData/userplants/:userId",
            tree_view: "api/dgr/:date",
            tree_view_type: "api/dgr/:date",
            getChildPlant: "api/dgr/id/:id",
            getNextPending: "api/dgr/:plantID/nextpending",
            getPlantLevelData: "api/hydro/:pendingDate/plant/:editPlantID",
            getUnitLevelDataHydro: "api/hydro/:unitDate/plant/:unitPlantID/unit/:unitName",
            hydroUnitLevelEdit: "api/hydro/unit",
            hydroPlantLevelEdit: "api/hydro/plant",
            getUnitlevelData: "api/wind/:date/plant/:plantId",
            updateUnitlevelData: "api/dgr/wind/units",
            getUnitlevelDataById: "api/wind/:date/plant/:plantId/unit/:unitName",




            getSbuReport: "api/dgr/:date/type/:businesstype",
            getApexReport: "api/dgr/:date",
            getPlantUserReport: "api/dgr/:date/report/:userId",
            getReportById: "api/dgr/id/:id",
            getUserPlants: "dgrData/userplants/:userId",
            getDashboardApex: "api/dashboard/{date}/apex",
            getDashboardSbu: "api/dahsboard/{date}/type/{butype}",
            getDashboardPlantUser: "api/dashboard/{date}/plant/{plantid}",


            hydroFile: "api/Hydro/:id/:date",
            unitFile: "api/Hydro/:id/:date/units",
            hydroEnergyFileUpload: "api/dgr/:id/:date/hydro",
            uploadBiomassPlantLevel: "api/biomass/plant",
            uploadBiomassUnitLevel: "api/biomass/unit",
            bioMassPlantRetrive: "api/biomass/:date/plant/:plantId",
            bioMassUnitRetrive: "api/biomass/:date/plant/:plantId/unit/UNIT-1",
            getEnergyLevelData: "api/energy/:day/plant/:plantId/:billing",
            EnterMeterlevelData: "api/energy/readings",
            dgrTrendsApexLevel: "api/dgr/trend/plant/:plantId/year/:year/month/:month",
            dgrTrendsSbuLevel: "api/dgr/trend/expoloss/day/:date",
            dgrTrendsPlantLevel: "api/dgr/trend/plant/day/:date",
            dgrTrendsBarApexLevel: "api/dgr/trend/genproj/year/:year/month/:month", 
            dgrTrendsStackApexLevel: "api/dgr/trend/plant/day/:date",
            getAllPlants:"api/plants",

        };
        var debugmode = false;
        envServiceProvider.config({
            vars: {
                development: {
                    apiUrl: 'http://10.80.80.122:8080/everest/',
                    //apiUrl: 'http://10.80.80.113:9080/everest-restcontroller/',
                    //apiUrl:' http://192.168.101.128:9080/everest-restcontroller/',
                    //apiUrl:' http://10.80.80.113:9080/everest-restcontroller/',
                    staticUrl: 'http://localhost:3000',
                    restApi: restApi

                },
                qaserver: {
                    apiUrl: 'http://mis.greenkogroup.com/everest/',
                    staticUrl: 'http://mis.greenkogroup.com/everest/',
                    restApi: restApi
                }
            }
        });
        envServiceProvider.check();
        envServiceProvider.set('development');
        /* environment end*/
        // ROUTING with ui.router
        $urlRouterProvider.otherwise('/main/dashboard');
        $stateProvider
        // this state is placed in the <ion-nav-view> in the index.html
        // .state('login', {
        //     url: '/login',
        //     templateUrl: 'main/templates/login.html'
        //     // controller: 'MenuCtrl as menu'
        // })
            .state('main', {
                url: '/main',
                abstract: true,
                templateUrl: 'main/templates/menu.html',
                controller: 'MenuCtrl as menu'
            })
            .state('main.login', {
                url: '/login',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })

        .state('main.dashboard', {
                url: '/dashboard',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/dashboard.html',
                        controller: 'DashboardCtrl'
                    }
                }
            })
            .state('main.listDetail', {
                url: '/list/detail',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/list-detail.html',
                        // controller: '<someCtrl> as ctrl'
                    }
                }
            })

        .state('main.wind', {
                url: '/wind/:date',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/windPlants.html',
                        controller: 'WindPlantsCtrl as ctrl'
                    }
                }
            })
            .state('main.windplantdetails', {
                url: '/windplantdetails',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/windplantdetails.html',
                        controller: 'WindPlantDetailsCtrl'
                    }
                }
            })
            .state('main.hydro', {
                url: '/hydro/:date',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/hydroPlants.html',
                        controller: 'WindPlantsCtrl as ctrl'
                    }
                }
            })
            .state('main.trends', {
                url: '/trends',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/trends-dgr-apex.html',
                        controller: 'TrendsDgrApexCtrl as ctrl'
                    }
                }
            })
            .state('main.barcharts', {
                url: '/barcharts',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/trends-dgr-barcharts.html',
                        controller: 'TrendsDgrBarCtrl as ctrl'
                    }
                }
            }).state('main.piecharts', {
                url: '/piecharts',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/trends-dgr-piecharts.html',
                        controller: 'TrendsDgrPieCtrl as ctrl'
                    }
                }
            }).state('main.stackcharts', {
                url: '/stackcharts',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/trends-dgr-stackcharts.html',
                        controller: 'TrendsDgrStackCtrl as ctrl'
                    }
                }
            })
            .state('main.gen_donut_chart', {
                url: '/generation_chart',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/gen_donut_chart.html',
                        controller: 'PieChartCtrl as ctrl'
                    }
                }
            })
            .state('main.projVSgen_column_chart', {
                url: '/projVSgen_column_chart',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/projVSgen_column_chart.html',
                        controller: 'ColumnChartCtrl as ctrl'
                    }
                }
            })
            .state('main.projVSgen_bar_chart', {
                url: '/projVSgen_bar_chart',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/projVSgen_bar_chart.html',
                        controller: 'BarChartCtrl as ctrl'
                    }
                }
            })
            .state('main.genVSexpVSloss_line_chart', {
                url: '/genVSexpVSloss_line_chart',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/genVSexpVSloss_line_chart.html',
                        controller: 'LineChartCtrl as ctrl'
                    }
                }
            })
            //  .state('main.exportVSloss_stacked_chart', {
            //     url: '/exportVSloss_stacked_chart',
            //     views: {
            //         'pageContent': {
            //             templateUrl: 'main/templates/exportVSloss_stacked_chart.html',
            //             controller: 'StackedChartCtrl as ctrl'
            //         }
            //     }
            // })
            .state('main.export_donut_chart', {
                url: '/export_donut_chart',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/export_donut_chart.html',
                        controller: 'DonutChartCtrl as ctrl'
                    }
                }
            })
            .state('main.hydroplantdetails', {
                url: '/hydroplantdetails',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/hydroplantdetails.html',
                        controller: 'HydroPlantDetailsCtrl'
                    }
                }
            })
            .state('main.thermal', {
                url: '/thermal',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/thermalPlants.html',
                        controller: 'WindPlantsCtrl as ctrl'
                    }
                }
            })
            .state('main.thermalplantdetails', {
                url: '/thermalplantdetails',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/thermalplantdetails.html',
                        controller: 'ThermalPlantDetailsCtrl'
                    }
                }
            })
            .state('main.solar', {
                url: '/solar',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/solarPlants.html',
                        controller: 'WindPlantsCtrl as ctrl'
                    }
                }
            })
            .state('main.solarplantdetails', {
                url: '/solarplantdetails',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/solarplantdetails.html',
                        controller: 'SolarPlantDetailsCtrl'
                    }
                }
            })
            .state('main.formplantleveldgr', {
                url: '/formplantleveldgr',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/formplantleveldgr.html',
                        controller: 'HydroPlantDetailsCtrl'
                    }
                }
            })
            .state('main.formunitleveldgr', {
                url: '/formunitleveldgr',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/formunitleveldgr.html',
                        controller: 'UnitleveldgrCtrl'
                    }
                }
            })
            .state('main.formenergymeterdgr', {
                url: '/formenergymeterdgr',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/formenergymeterdgr.html',
                        controller: 'FormEnergyMeterCtrl'
                    }
                }
            }).state('main.transactions-approvedgr-hydro', {
                url: '/approve',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/approvedgr-hydro.html',
                        controller: 'ApproveDgrHydroCtrl'
                    }
                }
            })
            .state('main.dashboard-plantuser', {
                url: '/dashboard-plantuser',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/dashboard-plantuser.html',
                        controller: 'DashboardPlantuserCtrl'
                    }
                }
            }).state('main.reports-dgr-sbu', {
                url: '/reports-dgr/:date',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/reports-dgr-sbu.html',
                        controller: 'ReportsDgrSbuCtrl'
                    }
                }
            });
    }).run(function($ionicPopup, $ionicHistory, $global, $log, $rootScope, $ionicPlatform, $cordovaStatusbar, $state) {

        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            var isLogin = toState.name === 'main.login';
            $global.init();
            $rootScope.$emit('initMenu', "ok");
            if (isLogin) {
                $global.removeLocalItem("authentication");
                $global.removeRole();
                $rootScope.$emit('initMenu', "ok");

                return;
            } else {
                var toStateName = toState.name;
                // if (toStateName == 'main.dashboard') {
                //     return;
                // }
                if ($global.authentication == null || $global.authentication == undefined || $global.authentication == '') {
                    e.preventDefault();
                    $state.go('main.login');
                    return;
                }


            }
        });
    });
