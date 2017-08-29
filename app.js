$(document).ready(function(){
	var config = {
	    apiKey: "AIzaSyAQJowN03bYtCeHoiH7FSulUHQfa103vK8",
	    authDomain: "trainscheduler-devhw.firebaseapp.com",
	    databaseURL: "https://trainscheduler-devhw.firebaseio.com",
	    projectId: "trainscheduler-devhw",
	    storageBucket: "",
	    messagingSenderId: "131464075532"
 	};
	firebase.initializeApp(config);

	var database = firebase.database();

	$("#submit-button").on("click",function(){
		event.preventDefault();

		var name = $("#name").val();
		var destination = $("#destination").val();
		var frequency = $("#frequency").val();
		var first = $("#first-train").val();

		database.ref().push({
			name : name,
			destination : destination,
			frequency : frequency,
			first : first
		});
		$("#name").val("");
		$("#destination").val();
		$("#frequency").val();
		$("#first-train").val();
	});

	database.ref().on("child_added", function(snapshot){
		var sv = snapshot.val();
		var trainID = snapshot.key;

		var nextTrain = 20;
		
		var start = moment(sv.first, "HHmm");
		var minDiff = parseInt(start.diff(moment(), "minutes"));
		var freq = parseInt(sv.frequency);
		var minLeft = freq + (minDiff % freq);

		var newRow = $("<tr>");
		newRow.attr("id", trainID)

		var nameData = $("<td>");
		nameData.html(sv.name);
		newRow.append(nameData);
		var destData = $("<td>");
		destData.html(sv.destination);
		newRow.append(destData);
		var freqData = $("<td>");
		freqData.html(sv.frequency);
		newRow.append(freqData);
		var nextData = $("<td>");
		nextData.html(nextTrain);
		newRow.append(nextData);
		var leftData = $("<td>");
		leftData.html(minLeft);
		newRow.append(leftData);

		var deleteButton = $("<button>");
		deleteButton.attr("value", trainID);
		deleteButton.attr("class", "delbutt")
		deleteButton.html("X");
		newRow.append(deleteButton);

		$("#table-body").append(newRow);
	})

	$(document).on("click", ".delbutt", function(){
		var delID = $(this).attr("value");
		database.ref().child(delID).remove();
		$("#" + delID).remove();
	})
})