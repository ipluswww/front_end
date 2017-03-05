(function() {
    'use strict';
angular.module('googleMap', []).controller('MainController', ['$scope', function($scope) {


    $scope.mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(48.87, 9.91),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.listA = [
        {
            "id": "1",
            "category": {
                "label": "Computer",
                "id": "30"
            },
            "owner": {
                "id": "3653beb4-0d67-451f-a3da-9040c5605914",
                "label": "John Doe"
            },
            "brand": {
                "label": "Apple",
                "id": "1"
            },
            "lastKnownLocations": [
                {
                    "timeOfPosition": "2015-03-03T17:00:00.000Z",
                    "address": {
                        "addressField1": "Fellabch",
                        "addressField2": "",
                        "addressField3": "Germany"
                    },
                    "geoLocation": {
                        "lat": 48.821,
                        "lon": 9.27,
                        "acc": 0.0
                    },
                    "userDisplayName": "Dennis"
                }
            ]
        }
        , {
            "id": "2",
            "category": {
                "label": "Computer",
                "id": "30"
            },
            "owner": {
                "id": "3653beb4-0d67-451f-a3da-9040c5605914",
                "label": "John Doe"
            },
            "brand": {
                "label": "Dell",
                "id": "1"
            },
            "lastKnownLocations": [
                {
                    "timeOfPosition": "2015-03-03T17:00:00.000Z",
                    "address": {
                        "addressField1": "Fellabch",
                        "addressField2": "",
                        "addressField3": "Germany"
                    },
                    "geoLocation": {
                        "lat": 48.821,
                        "lon": 9.27,
                        "acc": 0.0
                    },
                    "userDisplayName": "Bernhard"
                }
            ]
        },
        {
            "id": "3",
            "category": {
                "label": "Computer",
                "id": "30"
            },
            "owner": {
                "id": "3653beb4-0d67-451f-a3da-9040c5605914",
                "label": "John Doe"
            },
            "brand": {
                "label": "Apple",
                "id": "1"
            },
            "lastKnownLocations": [
                {
                    "timeOfPosition": "2015-03-03T17:00:00.000Z",
                    "address": {
                        "addressField1": "Esslingen",
                        "addressField2": "Stuttgart",
                        "addressField3": "Germany"
                    },
                    "geoLocation": {
                        "lat": 48.743,
                        "lon": 9.32,
                        "acc": 0.0
                    },
                    "userDisplayName": "Marcel"
                }
            ]
        }
    ];

    $scope.listB  =  [
        {
            "id": "1",
            "category": {
                "label": "Desktop",
                "id": "30"
            },
            "owner": {
                "id": "3653beb4-0d67-451f-a3da-9040c5605914",
                "label": "John Doe"
            },
            "brand": {
                "label": "Accer",
                "id": "1"
            },
            "lastKnownLocations": [
                {
                    "timeOfPosition": "2015-03-03T17:00:00.000Z",
                    "address": {
                        "addressField1": "new place",
                        "addressField2": "",
                        "addressField3": "Germany"
                    },
                    "geoLocation": {
                        "lat": 49.821,
                        "lon": 10.27,
                        "acc": 0.0
                    },
                    "userDisplayName": "Michael"
                }
            ]
        }
        , {
            "id": "2",
            "category": {
                "label": "Desktop",
                "id": "30"
            },
            "owner": {
                "id": "3653beb4-0d67-451f-a3da-9040c5605914",
                "label": "John Doe"
            },
            "brand": {
                "label": "HP",
                "id": "1"
            },
            "lastKnownLocations": [
                {
                    "timeOfPosition": "2015-03-03T17:00:00.000Z",
                    "address": {
                        "addressField1": "place 2",
                        "addressField2": "",
                        "addressField3": "Germany"
                    },
                    "geoLocation": {
                        "lat": 50.821,
                        "lon": 12.27,
                        "acc": 0.0
                    },
                    "userDisplayName": "Manuel"
                }
            ]
        },
        {
            "id": "3",
            "category": {
                "label": "Desktop",
                "id": "30"
            },
            "owner": {
                "id": "3653beb4-0d67-451f-a3da-9040c5605914",
                "label": "John Doe"
            },
            "brand": {
                "label": "HP",
                "id": "1"
            },
            "lastKnownLocations": [
                {
                    "timeOfPosition": "2015-03-03T17:00:00.000Z",
                    "address": {
                        "addressField1": "Esslingen",
                        "addressField2": "Stuttgart",
                        "addressField3": "Germany"
                    },
                    "geoLocation": {
                        "lat": 48.743,
                        "lon": 9.32,
                        "acc": 0.0
                    },
                    "userDisplayName": "Marcel"
                }
            ]
        }
    ];

}]);
})();