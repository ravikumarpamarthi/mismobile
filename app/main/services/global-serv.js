'use strict';
angular.module('main')
    .service('$global', function(envService, localStorageService, $cordovaToast, $http, $q, $base64, $rootScope, $ionicLoading) {
        this.SUCCESS = "SUCCESS";
        this.backExit = false;
        this.FAILURE = "FAILURE";
        this.ERR_CONNECTION_REFUSED = "Unable to connect server";
        this.setBadRequest = function() {
            $rootScope.$emit('badRequest', "ok");
        }
        this.invalidApiToken = function() {
            $rootScope.$emit('invalidApiToken', "ok");
        }
        this.showToastMessage = function(msg, duration, position) {
            duration = typeof duration !== 'undefined' ? duration : 'short';
            position = typeof position !== 'undefined' ? position : 'center';
            $cordovaToast.show(msg, duration, position);
        }
        this.init = function() {
            this.apiToken = "";
            this.authentication = null;
            this.consumerId = null;
            var data = this.getLocalItem("authentication", true);
            if (data) {
                this.authentication = data.data;
                this.apiToken = data.data.apiToken;
                this.userId = data.data.userId;
                this.setRole();
            }
        }
        this.objToQueryString = function(obj) {
            var k = Object.keys(obj);
            var s = "";
            for (var i = 0; i < k.length; i++) {
                s += k[i] + "=" + encodeURIComponent(obj[k[i]]);
                if (i != k.length - 1) s += "&";
            }
            return s;
        };

        this.apiUrl = envService.read("apiUrl");
        this.restApi = envService.read("restApi");

        this.setLocalItem = function(key, value, encoded) {
            value = JSON.stringify(value);
            if (encoded) {
                value = $base64.encode(value)
            }
            localStorageService.set(key, value);
        }
        this.removeLocalItem = function(key) {

            localStorageService.remove(key);
        }
        this.getLocalItem = function(key, decoded) {
            var value = localStorageService.get(key);
            value = (value) ? JSON.parse((decoded) ? $base64.decode(value) : value) : null;
            return value;
        }

        this.getAuthorization = function() {
            var authorization = {
                'Authorization': 'Basic' + this.apiToken,
                'Client-Type': 'MOBILE',
                'App-Id': 'CONSUMER'
            }
            return authorization;
        }
        this.getLoginAuthorization = function(val) {
            val = $base64.encode(val);
            var authorization = {
                'Authorization': 'Basic' + val,
                'Client-Type': 'MOBILE',
                'App-Id': 'CONSUMER'
            }
            return authorization;
        }
        this.getApiUrl = function() {
            return this.apiUrl;
        }
        this.getApiObject = function() {
            return this.restApi;
        }
        this.roles = [{
            businessType: "ADMIN",
            role: "APEX",
            allowedstates: [
                'main.reports-dgr-apex',
                'main.treegrid',
                'main.plantlevelapporve',
                'main.pages.reports',
                'main.dashboarduser',
                'main.dashboard'
            ]
        }, {
            businessType: "WIND",
            role: "PlantUser",
            allowedstates: [
                'main.reports-dgr-sbu',
                'main.transactions-dgr-wind',
                'main.transactions-approvedgr-wind',
                'main.plantlevelapporve',
                'main.pages.reports',
                'main.dashboarduser',
                'main.dashboard'
            ]
        },{
            businessType: "HYDRO",
            role: "PlantUser",
            allowedstates: [
                'main.transactions-approvedgr-hydro',
                'main.transactions-dgr-hydro',
                'main.pages.reports',
                'main.dashboard-plantuser',
                'main.dashboard'
            ]
        }, {
            businessType: "WIND",
            role: "SBU",
            allowedstates: [
                'main.reports-dgr-sbu',
                'main.plantlevelapporve',
                'main.pages.reports',
                'main.dashboarduser',
                'main.dashboard'
            ]
        }, {
            businessType: "HYDRO",
            role: "SBU",
            allowedstates: [
                'main.reports-dgr-sbu',
                'main.pages.reports',
                'main.dashboarduser',
                'main.dashboard'
            ]
        }];

        this.setRole = function() {
            var roles = this.roles;
            var businessType = this.authentication.businessType;
            var role = this.authentication.role;
            for (var i = roles.length - 1; i >= 0; i--) {
                if (role == roles[i].role && businessType == roles[i].businessType) {
                    this.userRole = roles[i];
                    break;
                }
            }
        }

        this.removeRole=function(){
            this.userRole =null;
        }
        this.checkPermission = function(state) {
            var allowedstates = (this.userRole) ? this.userRole.allowedstates : [];
            if (allowedstates.indexOf(state) == -1) {
                return false;
            } else {
                return true;
            }
        }

        this.getUserRole = function() {
            return this.userRole
        }

        
        this.init();

    });
