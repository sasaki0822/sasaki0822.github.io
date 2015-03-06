(function() {

    var scheduleBaseUrl = 'https://spreadsheets.google.com/feeds/cells/';

    angular.module('app', []).controller('mainController', function ($scope, $http) {

        $scope.init = function() {
            $scope.getCall();
        };

        $scope.getCall = function (wsId) {
            var _wsId = wsId || 'od6';
            $scope.schedules = [];
            $http.get(
                scheduleBaseUrl + $scope.scheduleDataId + '/' + _wsId + '/public/values?alt=json', {}
            ).success(renderSchedule).error(function () {
                alert('通信エラー');
            });
        };

        var renderSchedule = function (data) {
            var schedules = [], cell, row, len = 0;

            if (data.feed.entry) { len =  data.feed.entry.length; }

            for (var i = 0; i < len; i++) {
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

    });

})();