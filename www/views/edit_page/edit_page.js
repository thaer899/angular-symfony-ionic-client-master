angular.module('App')
.controller('EditPageController', function ($scope, $http,$ionicLoading,$ionicActionSheet,$ionicModal) {

  $scope.id = 1;
   $scope.articles = []; 
 $scope.editing = true;

  $scope.view = function (index) {
    $scope.editing = false;
    $scope.content = $scope.articles[index];
  };

  $scope.create = function () {
    $scope.editing = true;
    $scope.content = {
      title: '',
      url: ''
    };
  };

  $scope.getArticles = function () {
       $ionicLoading.show();
    $http.get('http://127.0.0.1/angular-symfony-master/web/app_dev.php/articles/list').success(function (response) {
      $scope.articles = angular.fromJson(response);
        
      $ionicLoading.hide();
    }).error(function (err) {
      console.log(err);
    });

  };
    
  $scope.getArticles();
 
  $scope.save = function () {  };
  $scope.remove = function () {  };

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

