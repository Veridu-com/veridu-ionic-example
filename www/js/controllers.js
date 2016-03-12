angular.module('starter.controllers', [])



.controller('AppCtrl', function($scope, $ionicModal, $timeout, Veridu, $rootScope, $http, $interval) {

    poll();
    function poll() {
        $timeout(function () {
            Veridu.API.fetch('GET', 'profile/' + Veridu.cfg.user)
            .then(
                function success(response) {
                    Veridu.profile = response.data;
                    poll();
                },
                function error(e) {
                    poll();
                }
            );
        }, 2000);
    }

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        Veridu.SSO.login('facebook');
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function($scope, Veridu) {
    var vm = this;
    vm.hello = false;

    $scope.login = function(provider){
        Veridu.Widget.login(provider);
    }
    $scope.$watch('Veridu.profile.user',function (user) {
        if (user && ! vm.hello) {
            alert('Welcome ' + user.name.value);
            vm.hello = true;
        }

    }, true);

    $scope.Veridu = Veridu;

    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {});
