join.controller('joinController', [
  'APIService',
  '$state',
  '$rootScope',
  function(
    APIService,
    $state,
    $rootScope
  ) {
    this.submitted = false;
    this.joinUser = {};

    this.submit = function() {
      this.submitted = true;
      APIService.post("/user", this.joinUser).then(function(data) {
        if (data.data.success) {
          $rootScope.currentUser = data.data.user;
          $state.go('home');
        } else {
          $rootScope.notification = {
            caption: "ERROR: " + data.data.error,
            confirm: true
          };
        }
      }, function(error) {
        $rootScope.notification = {
          caption: "POST ERROR " + error,
          confirm: true
        };
      });;
    }
  }
]);
