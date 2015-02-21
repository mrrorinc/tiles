'use strict';
application.factory('APIService', ['Restangular', '$http', 'configuration', function (Restangular , $http , configuration) {
  return {
    get :function (url , guid , property) {
      if (configuration.loadMockData) {
        return new Promise(function() {
          return {};
        })
      } else {
        var guidSuffix = "";
        if (guid)
        {
          guidSuffix += "/" + guid;
        }
        return $http({ method: 'GET', url: configuration.baseURL + url + guidSuffix, withCredentials: true}).then(function (data) {
          return data;
        })
      }
    } ,
    getList :function (url , property) {
      return $http({ method: 'GET', url: configuration.baseURL + url, withCredentials: true}).then(function (data) {
        return data;
      } , function () {
        return false;
      })
    } ,
    put :function (url , object) {
      if (configuration.loadMockData) {
        return new Promise(function() {
          return {};
        })
      } else {
        return $http.put(configuration.apiURL + url, object).then(function (data) {
          return data;
        }, function(error) {
        })
      }
    } ,
    post :function (url , object) {
      if (configuration.loadMockData) {
        return new Promise(function() {
          return {};
        })
      } else {
        return $http({ method: 'POST', url: configuration.baseURL + url, data: object, withCredentials: true}).then(function (data) {
          return data;
        }, function(error) {
          return false;
        });
      }
    }
  }
}]);