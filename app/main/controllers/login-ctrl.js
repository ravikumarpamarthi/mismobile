'use strict';
angular.module('main')
    .controller('LoginCtrl', function($scope, $state, $ionicLoading, dashboardService, $global) {
        
        $scope.loginInfo = {};
        //$rootScope.$emit('initMenu', "ok");
        $scope.loginSubmit = function(form) {
            $scope.loginError = "";
            if (form.$valid) {

                $ionicLoading.show();
                //console.log($scope.loginInfo);
                dashboardService.login($scope.loginInfo).then(function(res) {
                    if (res.status == $global.SUCCESS) {
                        $global.setLocalItem("authentication", res, true);
                        $global.init();
                        $scope.userData = ($global.authentication) ? $global.authentication : null;
                        $scope.$emit('init', res);
                        $ionicLoading.hide();
                        if (res.data.role == 'PlantUser') {
                            $state.go('main.dashboard-plantuser');

                            //$state.go('main.dashboard');

                        } else if (res.data.role == 'SBU') {
                            //$state.go('main.dashboard-sbu');
                            if (res.data.businessType == 'WIND') {
                                // $scope.message = "Login With HYDRO SBU Credentials !";                                
                                $scope.windSBU = true;
                                // $scope.logout();                                
                            } else {

                            }
                            $state.go('main.dashboard');
                        } else if (res.data.role == 'APEX') {
                            $state.go('main.dashboard');
                        }

                        //$state.go("main.dashboard");
                    } else if (res.status == $global.FAILURE) {
                        $ionicLoading.hide();
                        $scope.loginError = res.error.message;
                    }

                }, function(err) {
                    $scope.loginError = $global.ERR_CONNECTION_REFUSED;
                    $ionicLoading.hide();
                });
            }
        };
        $scope.logout = function() {
            $global.removeRole();
            $state.go('main.login');
            $scope.loginInfo = {};
        }
    });
