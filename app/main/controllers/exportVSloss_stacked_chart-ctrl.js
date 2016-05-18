'use strict';
angular.module('main')
    .controller('StackedChartCtrl', function($scope, $state, $ionicLoading, dashboardService, $global) {

        // google.*charts*.load(*'43'*, {packages: ['corechart']});
        // google.charts.load('current', { 'packages':  ['line', 'bar', 'corechart', 'geochart'] });
        // google.charts.setOnLoadCallback(drawChart);

        // function drawChart() {

        //     var data = google.visualization.arrayToDataTable([
        //         ['Genre', 'Fantasy & Sci Fi', 'Romance',{ role: 'annotation' }
        //         ],
        //         ['2010', 10, 24, ''],
        //         ['2020', 16, 22,''],
        //         ['2030', 28, 19, '']
        //     ]);

        //     var options = {
        //         width: 600,
        //         height: 400,
        //         legend: { position: 'top', maxLines: 3 },
        //         bar: { groupWidth: '75%' },
        //         isStacked: true,
        //     };

        //     var chart = new google.visualization.Bar(document.getElementById('stacked'));

        //     chart.draw(data, options);
        // }


    });
