'use strict';

/**
 * @ngdoc function
 * @name urlShortnerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the urlShortnerApp
 */
angular.module('urlShortnerApp').controller('AppCtrl', ['$q', '$timeout', '$mdDialog', 'HttpService', function($q, $timeout, $mdDialog, httpService) {
    var scope = this;

    scope.urlForm = {
        url: ''
    };

    scope.shortenUrl = function() {
        scope.loading = true;

        httpService.makeHttpCall({
            url : 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyC8t5Bg3yUNUV4InimmUEPot5b2qSeZFwY',
            method: 'POST',
            body: {
                'longUrl': scope.urlForm.url,
                'key': 'AIzaSyC8t5Bg3yUNUV4InimmUEPot5b2qSeZFwY'
            }
        }).then((response) => {
            scope.loading = false;
            scope.urlForm.shortUrl = response.id;

            // $mdDialog.show(
            //     $mdDialog.prompt()
            //     .title('Url Shortened Successfully.')
            //     .initialValue(response.id)
            //     .ok('Copy To Clipboard')
            //     .cancel("No Thanks. I did it.")
            // ).then((res) => {
            //     let target = $("#shortUrl")[0];
            //     target.setSelectionRange(0, response.id.length);
            //     document.execCommand("copy");
            // });
        }, (error) => {
            scope.loading = false;
                
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Bummer. That did not work.')
                .textContent('There was a problem accessing the service. Please try again later.')
                .ok('Continue!')
            );
        });
    }

}]);