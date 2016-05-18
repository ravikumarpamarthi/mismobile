'use strict';
angular.module('main')
    .controller('PieChartCtrl', function($scope, $state, $ionicLoading, dashboardService, $global) {

        // google.charts.setOnLoadCallback(drawChart);

        // function drawChart() {

        //     var data = google.visualization.arrayToDataTable([
        //         ['Generation', 'Mu'],
        //         ['Wind', 23.613],
        //         ['Hydro', 7.638],
        //         ['Thermal', 0],
        //         ['Solar', 0]
        //     ]);

        //     var options = {
        //         title: 'Generation',
        //         pieHole: 0.3,
        //     };

        //     var chart = new google.visualization.PieChart(document.getElementById('Gendonutchart'));

        //     chart.draw(data, options);
        // }


    });
