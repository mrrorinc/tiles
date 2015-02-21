logout.controller('logoutController' , [
  'APIService',
  '$state',
  '$rootScope',
  function (APIService, $state, $rootScope) {
    this.logoutUser = {};

    APIService.post("/user/logout", this.logoutUser).then(function(data) {
      if (data.data.success) {
        $rootScope.currentUser = null;
        $state.go('home');
      } else {
        alert("try again foo");
      }
    }, function(error) {
      alert("ERROR " + error);
    });
  }
]);