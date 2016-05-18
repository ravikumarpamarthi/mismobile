'use strict';
angular.module('main')
    .controller('ColumnChartCtrl', function($scope, $state, $ionicLoading, dashboardService, $global) {

        
        // google.charts.setOnLoadCallback(drawChart);

        // function drawChart() {
        //     var data = google.visualization.arrayToDataTable([
        //         ['Plant', 'Projection', 'Generation'],
        //         ['Rayalaseema', 100.50, 73.303],
        //         ['Ananthapura', 103.54, 74.465],
        //         ['Rayala', 980.367, 1223.35]
        //     ]);

        //     var options = {
        //         chart: {
        //             title: 'Projection vs Generation',
        //             subtitle: 'Plant, Projection, Generation'
        //         }
        //     };

        //     var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
        //     chart.draw(data, options);
        // }


    });
