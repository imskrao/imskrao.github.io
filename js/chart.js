var chart;
		var legend;

		var chartData = [{
				country: "JavaScript",
				value: 200
			},
			{
				country: "HTML5",
				value: 340
			},
			{
				country: "Node.js",
				value: 230
			},
			{
				country: "BootStrap",
				value: 250
			},
			{
				country: "Angular",
				value: 150
			},
			{
				country: "CSS3",
				value: 200
			}
		];

		AmCharts.ready(function () {
			// PIE CHART
			chart = new AmCharts.AmPieChart();
			chart.dataProvider = chartData;
			chart.titleField = "country";
			chart.valueField = "value";
			chart.outlineColor = "";
			chart.outlineAlpha = 0.8;
			chart.outlineThickness = 2;
			// this makes the chart 3D
			chart.depth3D = 20;
			chart.angle = 30;

			// WRITE
			chart.write("chartdiv");
		});