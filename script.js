// initialize the calendar on page load
$(document).ready(function () {

	// set the current day at the top of the calendar
	var currentDay = moment().format("dddd, MMMM Do YYYY");
	$("#currentDay").text(currentDay);

	// create timeblocks for standard business hours
	for (var i = 9; i <= 17; i++) {

		// intialize the variable with an empty string	
		var textEvent = '';

		// check local storage for any previously saved events and display them in their corresponding timeblocks
		var storedEvent = localStorage.getItem(i + ":00");

		if (storedEvent) {
			textEvent = storedEvent;
		}

		// create elements to hold the hour, events and save button
		var row = $("<div>").addClass("row time-block");
		var hour = $("<div>").addClass("col-2 hour").text(i + ":00");
		var event = $("<textarea>").addClass("col-8 description").html(textEvent);
		var saveBtn = $("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>");

		row.append(hour, event, saveBtn);
		$(".container").append(row);
	}

	// color-code each timeblock based on past, present, and future
	colorTimeblocks();

	// check the current time every minute and update the color-coding of the timeblocks
	setInterval(colorTimeblocks, 60000);
});

// event listener for clicking on a timeblock
$(".container").on("click", ".description", function () {
	// when a timeblock is clicked, allow the user to enter an event
	$(this).attr("content", true);
});

// event listener for clicking the save button
$(".container").on("click", ".saveBtn", function () {

	// when the save button is clicked in a timeblock, save the event in local storage
	var eventText = $(this).siblings(".description").val();
	var hour = $(this).siblings(".hour").text();

	localStorage.setItem(hour, eventText);
});

// function to check the current time and update the color-coding of the timeblocks
function colorTimeblocks() {
	var currentHour = parseInt(moment().format("H"));
	//var currentHour = 12;

	$(".row").each(function () {
		var hour = $(this).find(".hour").text();
		var hourNum = parseInt(hour.substring(0, 2));

		// compare the current time to the time of each timeblock
		if (hourNum < currentHour) {
			$(this).removeClass("future present").addClass("past");
		} else if (hourNum === currentHour) {
			$(this).removeClass("past future").addClass("present");
		} else {
			$(this).removeClass("past present").addClass("future");
		}
	});
}

