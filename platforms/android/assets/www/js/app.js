// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function () {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    String.prototype.camelCase = function () {
        return this.toLowerCase().replace(/-(.)/g, function (match, group1) {
            return group1.toUpperCase();
        });
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
    $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "views/menu.html",
      controller: 'AppCtrl'
    })

      // home
    .state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "views/home.html"
            }
        }
    })

    // uors
    .state('app.uors', {
      url: "/uors",
      views: {
        'menuContent' :{
            templateUrl: "views/uors.html",
            controller: 'UORsCtrl'
        }
      }
    })

    // about
    .state('app.favorites', {
        url: "/favorites",
        views: {
            'menuContent': {
                templateUrl: "views/favorites.html",
                controller: 'FavoritesCtrl'
            }
        }
    })

    // about
    .state('app.about', {
        url: "/about",
        views: {
            'menuContent': {
                templateUrl: "views/about.html"
            }
        }
    })

    .state('app.single', {
        url: "/uors/:uorId",
        views: {
            'menuContent': {
                templateUrl: "views/uor.html",
                controller: 'UORDetailCtrl'
            }
        }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});



