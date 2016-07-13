angular.module('App')
.controller('ArticleShowController', function ($scope,PageService, $http,$ionicLoading,$ionicActionSheet,$ionicModal) {

   $scope.article = {}; 
   $scope.PageService = PageService;


  $scope.getArticleById = function ($id) {
       $ionicLoading.show();
    $http.get('http://127.0.0.1/angular-symfony-master/web/app_dev.php/articles/show/'+$id).success(function (response) {
      $scope.article = angular.fromJson(response);
      $scope.PageService.article = $scope.article;
        $scope.PageService.id = $id;
      $ionicLoading.hide();
    }).error(function (err) {
      console.log(err);
    });

  };
    
  $scope.getArticleById($scope.PageService.id);

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

