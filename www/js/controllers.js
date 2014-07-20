angular.module('starter.controllers', [])

//-- Main App Controller
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // create global variable to store favorites
    $scope.favoriteUORs = [];
})

//-- uors controller
.controller('UORsCtrl', function ($scope, UORService, $ionicListDelegate, $ionicPopup, $timeout) {
  
    $scope.hide = function () {
        $ionicListDelegate.closeOptionButtons();
    };

    $scope.data = {};

    // get the list from the factory
    $scope.uors = UORService.allSync();
    $scope.loadMore = function () {
        //console.log('load more!');

        //$timeout(function () {
        //    $scope.uors.push(
        //        {Id: 1, Class:'KK', Description:'desc', Level:"", Class:""}
        //    );

        //    $scope.$broadcast('scroll.infiniteScrollComplete');
        //    $scope.$broadcast('scroll.resize');
        //}, 1000);

    };

    // add the item to favorites list and hide the option button
    $scope.shareItem = function (item) {
        $scope.favoriteUORs.push(item);
        $ionicListDelegate.closeOptionButtons();
        $ionicPopup.alert({
            title: 'Added to Favorites',
            template: '<b>Code \'' + item.Code + '\' added to the favorites list.</b>'
        });
    }

    // clears the search box and resets the list
    $scope.clearSearch = function () {
        //TODO: to be implemented
         $scope.data.searchQuery = '';
    };
})

//-- Favorites controller
.controller('FavoritesCtrl', function ($scope) {
    $scope.items = $scope.favoriteUORs;

    // called when the user drags and drops a list item
    $scope.reorderItem = function (item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1)
        $scope.items.splice(toIndex, 0, item)
    };

    // called when one of the favorite list item is deleted
    $scope.onItemDelete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };
})

//-- UOR Detail Controller
.controller('UORDetailCtrl', function ($scope, $stateParams, UORService) {
    // get the uor details fomr the servcice given the id
    $scope.uor = UORService.get($stateParams.uorId);
})

.controller('BrowserCtrl', function ($scope) {
    
})

//- A custom directive to hide the option button after click/tap event
//http://codepen.io/mhartington/pen/gzrvL?editors=101
.directive('closeOption', function ($ionicGesture, $ionicListDelegate) {
    return {
        restrict: 'A',

        link: function (scope, elem, attrs) {
            $ionicGesture.on('touch', function (e) {
                $ionicListDelegate.closeOptionButtons();
            }, elem);

        }
    }
})

//-- data factory
.factory('UORService', function ($q, $timeout) {
    var sortedList = [];

    // sort the values using code
    masterUORList
      .sort(function (a, b) {
          return a.Code > b.Code ? 1 : -1; // sort by code field
      })
      .forEach(function (uorCode) {
          var desc = uorCode.Description + ' ';
          var listCode = {
              Code: uorCode.Code.camelCase().capitalize(),
              Description: desc.camelCase().capitalize(),
              Id: uorCode.Id,
              KRS: uorCode.KRS,
              Level: uorCode.Level
          }

          // add items to this list
          sortedList.push(listCode);
      });


    var uors = sortedList; //.slice(0, 500); // decide how many to load first

    return {

        // returns all
        all: function () {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(uors);
            }, 1000);
            return deferred.promise;
        },
        allSync: function () {
            return uors;
        },

        // returns a specific list item
        get: function (uorId) {
            //alert('get for this id:' + uorId);
            for (var i = 0, l = uors.length; i < l; i++) {
                if (uors[i].Id == uorId) {
                    return uors[i];
                }
            }
        }
    }
});