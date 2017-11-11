$(document).ready(function() {
    //variable
    var topics = ["hippopotamus","sloth", "dog", "flamingo"];

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        var areaToAddTo = $("#animal-buttons-div");

        $(areaToAddTo).empty();

        for (let i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            //newButton.addClass(classToAdd);
            newButton.addClass("animal-button");
            newButton.attr("data-type", topics[i]);
            newButton.text(topics[i]);
            $(areaToAddTo).append(newButton);
           
        }
    }


    $(document).on("click", ".animal-button", function() {
       
        $("#animals-display").empty();
        $(".animal-button").removeClass("active")
        $(this).addClass("active");

        var type = $(this).attr("data-type")
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=JnQKMEEWHTFscVgQD1gzqjo7zFd4IntU&limit=10"
        // create ajax request for getting animals gif's
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                console.log(response);
                console.log(queryURL);

                // create gifs

                var results = response.data

                //looping through results item
                for (let i = 0; i < results.length; i++) {

                    //console.log(results[i].images.original_still.url);
                    //creating and sorting a div tag
                    var animals = $("<div>")

                    var p = $("<p>").text("Rating: " + results[i].rating);

                    var animalImage = $("<img>");

                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("class", "animal-gif");
                    console.log(results[i].images)
                    animalImage.attr("data-animal-animate", results[i].images.fixed_height.url);
                    animalImage.attr("data-animal-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-state", "still");
                    animals.append(p);
                    animals.append(animalImage);
                    //console.log(animals);
                    $("#animals-display").prepend(animals);
                }


                $(".animal-gif").on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animal-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-animal-still"));
                        $(this).attr("data-state", "still");
                    }
                    //alert($(this).attr("data-animal-animate"));
                    //console.log($(this).attr("data-animal-animate")); 
                })


            })

    })

    //create onclick function for adding animal buttons

    $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        (topics).push(animal);
        console.log("#animal-input");
        populateButtons();
        
    })
    populateButtons(topics, ".animal-button", "#animal-buttons-div");




})