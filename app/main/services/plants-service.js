'use strict';

/**
 * @ngdoc service
 * @name minovateApp.plantsService
 * @description
 * # plantsService
 * Service in the minovateApp.
 */
angular.module('main')
    .factory('plantsService', function($global, httpService) {
        return {
            getUserPlants: function() {
            	var userId=$global.userId;
                var url = $global.getApiUrl() + $global.getApiObject().getUserPlants.replace(":userId", userId);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            }
        }
    });
