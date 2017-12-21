$('#submit-btn').on('click', function(){
	var userInput = $('#user-input').val().trim();

	callNutritionixNaturalLanguage(userInput);
});

$('#exercise-submit-btn').on('click', function(){
    var userInput = $('#exercise-user-input').val().trim();

    callNutritionixExercise(userInput);
});

function callNutritionixInstantSearch() {
	var apiKey = 'a6ad2fabb4d3a05e6dbd5453734d01d8';
	var appId = '4ca70c03'

	var food = 'peanut butter sandwich';

	var queryURL = 'https://trackapi.nutritionix.com/v2/search/instant?query=' + food;
	console.log(queryURL);

	$.ajax({
        url: queryURL,
        method: "GET",
        headers: {'x-app-id': appId, 'x-app-key': apiKey},
    }).done(function(response) {
    	console.log(response);
    });
}

function callNutritionixNaturalLanguage(userInput) {
	var apiKey = 'a6ad2fabb4d3a05e6dbd5453734d01d8';
	var appId = '4ca70c03'

	// For DEBUG only
	//var food = '1 peanut butter sandwich';

	var queryURL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

	$.ajax({
        url: queryURL,
        headers: {'x-app-id': appId, 'x-app-key': apiKey},
        method: "POST",
        data: {
            query: userInput,
            timezone: 'US/Pacific',
        },
    }).done(function(response) {
    	console.log(response);

        for(var i=0; i< response.foods.length; i++) {
            var food = response.foods[i];
            // New row
            var tr = $('<tr></tr>');

            var td = $('<td></td>');
            
            var imageUrl = food.photo.thumb;
            console.log(imageUrl);

            var img = $('<img/>');
            img.attr('src', imageUrl);
            img.attr('alt', 'food image');

            td.append(img);
            tr.append(td);

            td = $('<td></td>');
            td.text(food.serving_qty);
            tr.append(td);

            td = $('<td></td>');
            td.text(food.serving_unit);
            tr.append(td);

            td = $('<td></td>');
            td.text(food.food_name);
            tr.append(td);

            td = $('<td></td>');
            td.text(food.nf_calories);
            tr.append(td);

            $('#food-result-rows').append(tr);
        }

    	
    });
}

function callNutritionixExercise(userInput) {
    // Sample Input
    // {
    //  "query":"ran 3 miles",
    //  "gender":"female",
    //  "weight_kg":72.5,
    //  "height_cm":167.64,
    //  "age":30
    // }

    var apiKey = 'a6ad2fabb4d3a05e6dbd5453734d01d8';
    var appId = '4ca70c03'

    var queryURL = 'https://trackapi.nutritionix.com/v2/natural/exercise';

    $.ajax({
        url: queryURL,
        headers: {'x-app-id': appId, 'x-app-key': apiKey},
        method: "POST",
        data: {
            query: userInput,
        },
    }).done(function(response) {
        console.log(response);

        // New row
        var tr = $('<tr></tr>');

        var td = $('<td></td>');
        
        var imageUrl = response.exercises[0].photo.thumb;
        console.log(imageUrl);

        var img = $('<img/>');
        img.attr('src', imageUrl);
        img.attr('alt', 'exercise image');

        td.append(img);
        tr.append(td);

        td = $('<td></td>');
        td.text(response.exercises[0].name);
        tr.append(td);

        td = $('<td></td>');
        td.text(response.exercises[0].met);
        tr.append(td);

        td = $('<td></td>');
        td.text(response.exercises[0].duration_min);
        tr.append(td);

        td = $('<td></td>');
        td.text(response.exercises[0].nf_calories);
        tr.append(td);

        $('#exercise-result-rows').append(tr);

    });    
}