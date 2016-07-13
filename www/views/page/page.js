angular.module('App')
.controller('PageController', function ($scope,PageService, $http,$ionicLoading,$ionicActionSheet,$ionicModal, $location) {

  $scope.id = 1;
  $scope.showActionSheet = showActionSheet;
  $scope.PageService = PageService;  

  $scope.getPage = function () {
       $ionicLoading.show();
    $http.get('http://127.0.0.1/angular-symfony-master/web/app_dev.php/pages/show/' + $scope.id).success(function (response) {
      $scope.page = angular.fromJson(response);
        $scope.menu = PageService.menu;
      $ionicLoading.hide();
    }).error(function (err) {
      console.log(err);
    });

  };
    
  $scope.getPage();
   
   $scope.getArticlesByMenuId = function ($id) {
        $scope.id= $id;
        $scope.PageService.id = $id;
            $location.path('article');
  };

    function showActionSheet() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: 'Create Your Own' }
         , { text: 'Report as Spam' }
         , { text: 'Follow' }
         , { text: "Show Full Agenda" }
       ],
       cancelText: '<span class="color-blue">Cancel</span>',
       cssClass: 'actionsheet',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
         return true;
       }
     });
  };
    
    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
        $timeout(function () {
            $scope.modal.hide();
        }, 2000);
    };
    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    
});
