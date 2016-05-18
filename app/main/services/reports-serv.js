'use strict';

/**
 * @ngdoc service
 * @name minovateApp.reports
 * @description
 * # reports
 * Service in the minovateApp.
 */
angular.module('main')
    .factory('reportsService', function($global, httpService) {
        return {
            getSbuReport: function(date) {
                var businesstype=$global.userRole.businessType;
                var url = $global.getApiUrl() + $global.getApiObject().getSbuReport.replace(":date", date).replace(":businesstype", businesstype);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            }, 
            getApexReport: function(date) {
            	var businesstype=$global.userRole.businessType;
                var url = $global.getApiUrl() + $global.getApiObject().getApexReport.replace(":date", date);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getPlantUserReport: function(date,userId) {
                var url = $global.getApiUrl() + $global.getApiObject().getPlantUserReport.replace(":date", date).replace(":userId", userId);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getReportById: function(id) {
            var url = $global.getApiUrl() + $global.getApiObject().getReportById.replace(":id",id);
            var $request = httpService.httpRequest(url, "G");
            return $request;
          },
            getEnergyLevelData: function(date,id,meterType) {
            var url = $global.getApiUrl() + $global.getApiObject().getEnergyLevelData.replace(":day",date).replace(":plantId", id).replace(":billing", meterType);
            var $request = httpService.httpRequest(url, "G");
            return $request;
          },
          getPlantLevelData: function(date,PlantID) {
           var url = $global.getApiUrl() + $global.getApiObject().getPlantLevelData.replace(":pendingDate",date).replace(":editPlantID",PlantID);
           var $request = httpService.httpRequest(url, "G");
           return $request;
          },

        }
    });
