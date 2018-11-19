var topics = ["hamburger", "cheese", "wine", "beer", "bacon", "fries", "pie", "cupcakes", "pizza", "hot dog", "ice cream"];

//Function to render buttons
function renderButtons() {
    //Make sure div is empty
    $("#buttons").empty();
    //looping thru array and creating a button for each one w/ classes, datname, and text
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("foodButton btn btn-warning m-2 text-uppercase");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons").append(a);
    }
}

//Function to play/pause gif
function playGif() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

//function to make AjAX request and populate imgs
function getGifs() {

    var food = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=3fcjAlvuzETf8b4IbbGxXeVqFEd6Ec6H&limit=10";

    //make ajax call:
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
        var results = response.data;
        console.log(results);

        //loop thru each object and collect rating, create a div with img and paragraph w/ rating for each one, and add data for fixed_height + still img
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var ratingP = $("<p>").html("<strong>Rating: " + rating + "</strong>");

            var foodImage = $('<img class="foodGif">');
            foodImage.attr("src", results[i].images.fixed_height_still.url);
            foodImage.attr("data-animated", results[i].images.fixed_height.url);
            foodImage.attr("data-still", results[i].images.fixed_height_still.url);
            foodImage.attr("data-state", "still");

            gifDiv.append(foodImage);
            gifDiv.append(ratingP);

            $("#gifs").prepend(gifDiv);
        }
    });
}

//Main Processes
renderButtons();

//On click of submit button, push item to array and add new item to button display
$("#add-food").on("click", function () {

    event.preventDefault();

    var newFood = $("#food-input").val().trim();
    topics.push(newFood);

    renderButtons();
});

//Listen for on click of button, make query to Giphy API + add classes + add attr + prepend to page
$(document).on("click", ".foodButton", getGifs);

//Listen for on click of Gif, pause/play gif
$(document).on("click", ".foodGif", playGif);