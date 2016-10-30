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

				if (data.error === "Not Found") {
					newElement.className = 'twitch-container';
					newElement.innerText = user + " not found."
				} else {
					if (data.stream != null) {
						newElement.className = 'twitch-container';

						newElement.append(linkElement(user, data.stream.channel.display_name, 'online'));

						newElement.append(statusElement('online'));

						newElement.append(detailsElement(data.stream.channel.status));
					} else {
						newElement.className = 'twitch-container';

						newElement.append(linkElement(user, user, 'offline'));

						newElement.append(statusElement('offline'));
					}
				}

				$("#results").append(newElement);
			},
			error: function(data, error) {
				$("#results").append("Unable to retrieve data for " + user);
			}
		});
	}

	function linkElement(user, innerText, className) {
		var elementLink = document.createElement('a');
		elementLink.setAttribute("href", "http://www.twitch.tv/" + user);

		elementLink.innerText = innerText;

		return elementLink;
	}

	function statusElement(status) {
		var elementStatus = document.createElement('p');
		elementStatus.className = status;
		elementStatus.innerText = status;

		return elementStatus;
	}

	function detailsElement(details) {
		var elementStatus = document.createElement('p');
		elementStatus.innerText = details;

		return elementStatus;
	}

});