'use strict';

/**
 * @ngdoc service
 * @name minovateApp.dashboard
 * @description
 * # dashboard
 * Service in the minovateApp.
 */
angular.module('main')
  .factory('dashboardService', function ($global, httpService) {
    return {
            getDashboardApex: function(date) {
                var url = $global.getApiUrl() + $global.getApiObject().getDashboardApex.replace("{date}", date);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getDashboardSbu: function(date) {
            	var butype=$global.userRole.businessType;
                var url = $global.getApiUrl() + $global.getApiObject().getDashboardSbu.replace("{date}", date).replace("{butype}", butype);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getDashboardPlantUser: function(date,plantid) {
                var url = $global.getApiUrl() + $global.getApiObject().getDashboardPlantUser.replace("{date}", date).replace("{plantid}", plantid);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            login: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().login;
                var val = data.userName + ':' + data.password;
                var header = $global.getLoginAuthorization(val);
                var $request = httpService.httpLogin(url, header);
                return $request;
            },
            getUserPlants: function() {
                var userId=$global.userId;
                var url = $global.getApiUrl() + $global.getApiObject().getUserPlants.replace(":userId", userId);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getAllPlants: function() {
                
                var url = $global.getApiUrl() + $global.getApiObject().getAllPlants;
                var $request = httpService.httpRequest(url, "G");
                return $request;
            }
        }
  });
