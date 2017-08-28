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
		console.log(first);
	});

	database.ref().on("child_added", function(snapshot){
		var sv = snapshot.val();
		console.log(sv);

		var trainID = snapshot.key;
		var nextTrain = 20;
		var minLeft = 10;

		var newRow = $("<tr>");
		newRow.attr("id", trainID)

		var nameData = $("<td>");
		nameData.html(sv.name);
		newRow.append(nameData);
		var destData = $("<td>");
		destData.html(sv.destination);
		newRow.append(destData);
		var freqData = $("<td>");
		freqData.html(sv.destination);
		newRow.append(freqData);
		var nextData = $("<td>");
		nextData.html(nextTrain);
		newRow.append(nextData);
		var leftData = $("<td>");
		leftData.html(minLeft);
		newRow.append(leftData);

		var deleteButton = $("<button>");
		deleteButton.attr("value", trainID);
		deleteButton.html("X");
		newRow.append(deleteButton);

		$("#table-body").append(newRow);
	})
})