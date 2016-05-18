'use strict';
angular.module('main')
    .factory('HydroService', function($global, httpService) {
        return {
            uploadFile: function(file, data) {
                var url = $global.getApiUrl() + $global.getApiObject().uploadFile.replace(":id", data.plantId).replace(":date", data.day);
                var $request = httpService.uploadRequest(url, file);
                return $request;
            },
            approveData: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().approveData;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            meterFile: function(file, data) {
                var url = $global.getApiUrl() + $global.getApiObject().meterFile.replace(":id", data.plantId).replace(":date", data.day); //.replace(":id", id).replace(":date", lat);
                var $request = httpService.uploadRequest(url, file);
                return $request;
            },
            login: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().login;
                var val = data.userName + ':' + data.password;
                var header = $global.getLoginAuthorization(val);

                var $request = httpService.httpLogin(url, header);
                return $request;
            },
            plantName: function(id) {
                var url = $global.getApiUrl() + $global.getApiObject().plantName.replace(":userId", id);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            //windUnitLevel: function() {
            //  var url = $global.getApiUrl() + $global.getApiObject().windUnitLevel;
            //  var $request = httpService.httpRequest(url, "G");
            //  return $request;
            //},
            //windUnitLevelEdit: function(data) {
            //  var url = $global.getApiUrl() + $global.getApiObject().windUnitLevelEdit;
            //  var $request = httpService.httpRequest(url, "P", data);
            //  return $request;
            //},
            //hydroUnitLevel: function() {
            //  var url = $global.getApiUrl() + $global.getApiObject().hydroUnitLevel;
            //  var $request = httpService.httpRequest(url, "G");
            //  return $request;
            //},
            hydroUnitLevelEdit: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().hydroUnitLevelEdit;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            hydroPlantLevelEdit: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().hydroPlantLevelEdit;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            tree_view: function(date) {
                var url = $global.getApiUrl() + $global.getApiObject().tree_view.replace(":date", date);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            tree_view_type: function(date, type) {
                var url = $global.getApiUrl() + $global.getApiObject().tree_view_type.replace(":date", date).replace(":type", type);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getChildPlant: function(id) {
                var url = $global.getApiUrl() + $global.getApiObject().getChildPlant.replace(":id", id);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getNextPending: function(plantid) {
                var url = $global.getApiUrl() + $global.getApiObject().getNextPending.replace(":plantID", plantid);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getPlantLevelData: function(date, PlantID) {
                var url = $global.getApiUrl() + $global.getApiObject().getPlantLevelData.replace(":pendingDate", date).replace(":editPlantID", PlantID);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getUnitLevelDataHydro: function(date, PlantID, unitName) {
                var url = $global.getApiUrl() + $global.getApiObject().getUnitLevelDataHydro.replace(":unitDate", date).replace(":unitPlantID", PlantID).replace(":unitName", unitName);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getUnitlevelData: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().getUnitlevelData.replace(":plantId", data.plantId).replace(":date", data.day);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            bioMassPlantRetrive: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().bioMassPlantRetrive.replace(":plantId", data.plantId).replace(":date", data.date);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            bioMassUnitRetrive: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().bioMassUnitRetrive.replace(":plantId", data.plantId).replace(":date", data.date);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            getUnitlevelDataById: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().getUnitlevelDataById.replace(":plantId", data.plantId).replace(":date", data.date).replace(":unitName", data.unitName);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            updateUnitlevelData: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().updateUnitlevelData;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            uploadBiomassPlantLevel: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().uploadBiomassPlantLevel;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            uploadBiomassUnitLevel: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().uploadBiomassUnitLevel;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            EnterMeterlevelData: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().EnterMeterlevelData;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            hydroFile: function(file, data) {
                var url = $global.getApiUrl() + $global.getApiObject().hydroFile.replace(":id", data.plantId).replace(":date", data.day);
                var $request = httpService.uploadRequest(url, file);
                return $request;
            },
            unitFile: function(file, data) {
                var url = $global.getApiUrl() + $global.getApiObject().unitFile.replace(":id", data.plantId).replace(":date", data.day);
                var $request = httpService.uploadRequest(url, file);
                return $request;
            },
            hydroEnergyFileUpload: function(file, data) {
                var url = $global.getApiUrl() + $global.getApiObject().hydroEnergyFileUpload.replace(":id", data.plantId).replace(":date", data.day);
                var $request = httpService.uploadRequest(url, file);
                return $request;
            },
            dgrTrendsApexLevel: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().dgrTrendsApexLevel.replace(":plantId", data.plantId).replace(":month", data.month).replace(":year", data.year);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            
            dgrTrendsSbuLevel: function(data) {
                var param = {}
                param.type = data.type
                var params = "?" + $global.objToQueryString(param);
                var url = $global.getApiUrl() + $global.getApiObject().dgrTrendsSbuLevel.replace(":date", data.date)+params;
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            dgrTrendsPlantLevel: function(data) {
                var param = {}
                param.type = data.type
                var params = "?" + $global.objToQueryString(param);
                var url = $global.getApiUrl() + $global.getApiObject().dgrTrendsPlantLevel.replace(":date", data.date) + params;
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            dgrTrendsBarApexLevel: function(data) {
                var param = {}
                param.type = data.type
                var params = "?" + $global.objToQueryString(param);
                var url = $global.getApiUrl() + $global.getApiObject().dgrTrendsBarApexLevel.replace(":month", data.month).replace(":year", data.year)+params;
                var $request = httpService.httpRequest(url, "G");
                return $request;
            }

        };


    });
