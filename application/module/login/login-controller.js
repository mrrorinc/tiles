login.controller('loginController' , [
  'APIService',
  '$state',
  '$rootScope',
  function (APIService, $state, $rootScope) {
    this.loginUser = {};

    this.submit = function() {
      APIService.post("/user/login", this.loginUser).then(function(data) {
        if (data.data.success) {
          $rootScope.currentUser = data.data.user;
          $state.go('home');
        } else {
          $rootScope.notification = {
            caption: "sorry, username or password incorrect.",
            confirm: true
          };
        }
      }, function(error) {
        alert("ERROR " + error);
      });
    }
  }
]);