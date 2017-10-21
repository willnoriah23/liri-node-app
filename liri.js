var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var nodeArg = process.argv[2];
var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifykeys);
var fs = require('fs');
var dataFile = "random.txt";


if (nodeArg === "my-tweets") {
	myTweets();
}


if (nodeArg === "spotify-this-song") { 
	var song = "";
        for (var i = 3; i < process.argv.length; i++) {
            song = song + process.argv[i] + " ";
        }
        if (song === "") {
            song ="The Sign";
        } else {
            song = song.trim();
        }

	spotifySongs(songs);
}


if (nodeArg === "movie-this") {
	var movie = "";
		    for (var i = 3; i < process.argv.length; i++) {
            movie = movie + process.argv[i] + " ";
        }
        if (movie === "") {
            movie ="The Sign";
        } else {
            movie = movie.trim();
        }
	pullMovies(movie);
}

if (nodeArg === "do-what-it-says") {
fs.readFile(dataFile, "utf8", function(error, data) {

	if (error) {
    return console.log(error);
  }
  	var dataArr = data.split(",");

  	var command1 = dataArr[0];
  	var thing = dataArr[1];

  	if (command1 === "my-tweets") {
  		myTweets();
  	} 
  	else if (command1 === "spotify-this-song") {
  		spotifySongs(thing);
  	} 
  	else if (command1 === "movie-this") {
  		pullMovies(thing);
  	}

	});
}

function myTweets() {
		var params = {screen_name: 'sosodev_riah'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error) {
	for (var i = 0; i < tweets.length; i++){
		console.log(tweets[i].created_at + " " + tweets[i].text);
		}
	}
});
}

function spotifySongs(song) {
		
	      	  
spotify.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  } else {
  console.log(data.tracks.items[0].artists[0].name + "\n" + data.tracks.items[0].name + "\n" + data.tracks.items[0].preview_url + "\n" + data.tracks.items[0].album.name);
 		 } 
	});
}

function pullMovies(movie) {
    // Make request URL just like ajax call    
   	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("Movie Title: ", JSON.parse(body).Title);
            console.log("Year Released: ", JSON.parse(body).Year);
            console.log("IMDB Rating: ", JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: ", JSON.parse(body).Ratings[1].Value);
            console.log("Country of Production: ", JSON.parse(body).Country);
            console.log("Language of Movie: ", JSON.parse(body).Language);
            console.log("Plot of Movie: ", JSON.parse(body).Plot);
            console.log("Cast: ", JSON.parse(body).Actors);
    	}
	});
}
