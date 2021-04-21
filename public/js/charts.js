const estimacionesLineChart = {
	labels: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
	],
	
	data: {
		labels: labels,
		datasets: [{
			label: 'My First dataset',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [0, 10, 5, 2, 20, 30, 45],
			fill: false,
			tension: 0.2
		}]
	},

	config: {
			type: 'line',
			data,
			options: {
				color: '#eee',
				scales: {
					yAxes: {
						ticks: {
							color: '#eee'
						}
					},
					xAxes: {
						ticks: {
							color: '#eee'
						}
					}
				}
			}
		}
};