
$("#search_form").submit(function (e) {
	e.preventDefault();
	var form_data = $('#search_form').serializeArray();
	var values = {};
	$.each(form_data, function (i, field) {
		values[field.name] = field.value;
	});

	//Value Retrieval Function
	var getValue = function (valueName) {
		return values[valueName];
	};

	//Retrieve the Values
	var url = 'https://wattpad-extension.vercel.app/search/$search_word'.replace("$search_word", getValue('search'));
	$.ajax({
		type: 'POST',
		url: url,
		data: values,
		success: function(data) {
			console.log(data);
			$("#search_form").after("<div id='search_results'></div>");
			$(data).each(function(i,val){
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
					  <div>
							${val.description}
					  </div>
				  </div>`
				)
				console.log(i,val)
			  });
		},
		fail: function(data) {
			console.log("No Connection");
		}
})});
