$(document).ready(function() {

	var streamList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];

	getStreams();

	function getStreams() {
		for (stream in streamList) {
			getStreamInfo(streamList[stream]);
		}
	}

	function getStreamInfo(user) {
		$.ajax({
			url: "https://wind-bow.hyperdev.space/twitch-api/streams/" + user,
			type: "GET",
			dataType: "jsonp",
			success: function(data) {
				var newElement = document.createElement('div');
				newElement.className = 'twitch-container';

				if (data.error === "Not Found") {
					newElement.innerText = user + " not found."
				} else {

					var elementLink = document.createElement('a');
					elementLink.setAttribute("href", "http://www.twitch.tv/" + user);

					if (data.stream != null) {
						elementLink.innerText = data.stream.channel.display_name + ", online";	

						var elementStatus = document.createElement('p');
						elementStatus.innerText = "Status: " + data.stream.channel.status;
						newElement.append(elementStatus);
					} else {
						elementLink.innerText = user + ", OFFLINE";
					}

					newElement.append(elementLink);
				}

				$("#results").append(newElement);
			},
			error: function(data, error) {
				$("#results").append("Unable to retrieve data for " + user);
			}
		});
	}

});