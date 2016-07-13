angular.module('App')
.controller('ArticleController', function ($scope,PageService, $http,$ionicLoading,$ionicActionSheet,$ionicModal,$location) {

  $scope.id =  1;
   $scope.articles = []; 
   $scope.PageService = PageService;
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

  $scope.getArticlesByMenuId = function ($id) {
       $ionicLoading.show();
    $http.get('http://127.0.0.1/angular-symfony-master/web/app_dev.php/articles/menu/'+$id+'/list').success(function (response) {
      $scope.articles = angular.fromJson(response);
        $scope.PageService.id = $id;
        $scope.PageService.articles = $scope.articles;
      $ionicLoading.hide();
    }).error(function (err) {
      console.log(err);
    });

  };
    
  $scope.getArticlesByMenuId($scope.PageService.id);

  $scope.getArticleById = function ($id) {
        $scope.PageService.id = $id;
            $location.path('article_show');
  };
$scope.cardDestroyed = function(index) {
  $scope.articles.splice(index, 1);
};

$scope.cardSwiped = function(index) {

  var newCard = articles[index];
  $scope.articles.push(newCard);
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

