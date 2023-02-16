var start = 0;
var limit = 15;

async function get_search(start=0) {
	var form_data = $('#search_form').serializeArray();
	var values = {};
	$.each(form_data, function (i, field) {
		values[field.name] = field.value;
	});

	//Value Retrieval Function
	var getValue = function (valueName) {
		return values[valueName] || false;
	};

	let query = getValue('search');
	
	// Filters
	const filter = {
		"complete" : getValue('completed'),
		"mature" : getValue('mature'),
		"free" : getValue('free'),
		"paid" : getValue('paid'),
		"start" : start,
		"limit" : 15,
	}
	const response = await fetch(`https://wattpad-extension.vercel.app/search/${query}`, {
		method: 'POST',
		headers: {
			'accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(filter)
	});
	const response_data = await response.json();
	if (response.status === 200) {
		$(response_data).each(function(i,val){
			$("#search_results").append(
				`<div class="a-box py-3">
				<div class="img-container">
					<div class="img-inner">
					<div class="inner-skew">
						<img src="${val.img_url}}">
					</div>
					</div>
				</div>
				<div class="text-container">
					<h3>${val.title}</h3>
					<p class="text-break">
						${val.description}
					</p>
				</div>`
			)
		});
		$("#search_results").after(`
		<div class="text-center">
			<button id="more_result" type="button" class="btn bg-custom btn-sm">See more results</button>
		</div>
		`);
	} else {
		console.log("No Connection");
	}


};


$("#search_form").submit(function (e) {
	e.preventDefault();
	get_search();
});


$(document).on('click', '#more_result', function(e) {
	e.preventDefault();
	start = limit + 1;
	get_search(result_start=start);
	console.log(start);
	$("#more_result").remove();
});
document.body.style.width = '350px';
// document.documentElement.style.height = "10rem";