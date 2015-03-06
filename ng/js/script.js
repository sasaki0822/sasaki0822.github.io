(function() {

    var scheduleBaseUrl = 'https://spreadsheets.google.com/feeds/cells/';

    angular.module('app', []).controller('mainController', function ($scope, $http) {

        var renderSchedule = function (data) {
            var schedules = [], cell, row;

            for (var i = 0; i < data.feed.entry.length; i++) {
                cell = data.feed.entry[i];
                row = cell.gs$cell.row - 1;

                if (!schedules[row]) { schedules[row] = {}; }

                if (cell.gs$cell.col == 1) {
                    schedules[row].time = cell.gs$cell.$t;
                } else if (cell.gs$cell.col == 2) {
                    schedules[row].action = cell.gs$cell.$t;
                }
            }

            $scope.schedules = schedules;

            $('#jsiContainer').removeClass('hidden');
        };

        $scope.init = function() {
            $scope.getCall();
        };

        $scope.getCall = function () {
            $scope.schedules = [];
            $http.get(
                scheduleBaseUrl + $scope.scheduleDataId + '/od6/public/values?alt=json', {}
            ).success(renderSchedule).error(function () {
                alert('通信エラー')
            });
        };

    });

})();