admin.controller('adminController' , [
  'APIService',
  '$state',
  '$rootScope',
  function (APIService, $state, $rootScope) {
    // this.adminUser = {};
    //
    // APIService.post("/user/admin", this.adminUser).then(function(data) {
    //   if (data.data.success) {
    //     $rootScope.currentUser = null;
    //     $state.go('home');
    //   } else {
    //     alert("try again foo");
    //   }
    // }, function(error) {
    //   alert("ERROR " + error);
    // });
  }
]);