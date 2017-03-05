(function () {
    'use strict';
    angular.module('googleMap').directive('mapDirective', [
        function () {
            return {
                restrict: 'E',
                replace: true,
                priority: 1001,
                scope: {
                   computerContainer: '=',
                    desktopContainer: '=',
                    mapOptions: '='
                },
                link: function (scope) {


                    var markersList = [];
                    var map;

                    scope.$watchGroup(['computerContainer', 'desktopContainer'], function (newValue) {
                        if (newValue[0] && newValue[1]) {
                            console.log(newValue);
                            map = new google.maps.Map(document.getElementById('map'), scope.mapOptions);
                            populateMarkersOnMap(newValue[0], 'computer');
                            populateMarkersOnMap(newValue[1], 'desktop');
                        }
                    });

                    function populateMarkersOnMap(moduleList, moduleName) {
                        var markers = [];
                        angular.forEach(moduleList, function (module) {

                            var sortedLastKnownLocations = _.sortBy(module.lastKnownLocations, function (lastKnownLocation) {
                                return moment.utc(lastKnownLocation.timeOfPosition, 'DD.MM.YYYY').valueOf();
                            }).reverse();


                            var latLng = new google.maps.LatLng(sortedLastKnownLocations[0].geoLocation.lat, sortedLastKnownLocations[0].geoLocation.lon);

                            var marker = new google.maps.Marker({
                                id: module.id,   //keep unique id to improve the performance suggested by Google map doc.
                                modelName: module.modelName,
                                toolNumber: module.label,
                                position: latLng
                            });
                            markers.push(marker);
                        });
                        var options = {
                            gridSize: 10,
                            imagePath: 'https://gmaps-marker-clusterer.github.io/gmaps-marker-clusterer/assets/images/m'
                        };
                        // todo include marker cluster library and enable below line to see cluster
                        // var markerCluster = new MarkerClusterer(map, markers, options);
                    }
                },
                templateUrl: 'main-map-view.html'
            };
        }]);
})();