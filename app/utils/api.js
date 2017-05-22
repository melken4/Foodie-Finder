var axios = require('axios');

var key = "AIzaSyAGbT7AeWCrn5JUxDRrfg_vvRaaE-MCwko";
var params = "&key=" + key;

function fetchOpenRestaurants (city) {
	var encodedURI = window.encodeURI('http://maps.googleapis.com/maps/api/place/textsearch/json?query=' + city + '&type=restaurant|bar&opennow=true'+ params);

		return axios.get(encodedURI)
			.then(function (response) {
				return response.result.name;
			});
}

function fetchRating (city) {
	var encodedURI = window.encodeURI('http://maps.googleapis.com/maps/api/place/textsearch/json?query=' + city + '&type=restaurant|bar&opennow=true'+ params);

		return axios.get(encodedURI)
			.then(function (response) {
				return response.result.rating;
			});
}

function fetchPrice (city) {
	var encodedURI = window.encodeURI('http://maps.googleapis.com/maps/api/place/textsearch/json?query=' + city + '&type=restaurant|bar&opennow=true'+ params);

		return axios.get(encodedURI)
			.then(function (response) {
				return response.result.price_level;
			});
}

function fetchAddress (city) {
	var encodedURI = window.encodeURI('http://maps.googleapis.com/maps/api/place/textsearch/json?query=' + city + '&type=restaurant|bar&opennow=true'+ params);

		return axios.get(encodedURI)
			.then(function (response) {
				return response.result.formatted_address;
			});
}


function fetchHours (city) {
	var encodedURI = window.encodeURI('http://maps.googleapis.com/maps/api/place/textsearch/json?query=' + city + '&type=restaurant|bar&opennow=true'+ params);

		return axios.get(encodedURI)
			.then(function (response) {
				return response.result.opening_hours.periods;
			});
}

function handleError (error) {
	console.warn(error);
	return null;
}

function getRestaurantData (city) {
	return axios.all([
		fetchOpenRestaurants(city),
		fetchAddress(city),
		fetchHours(city),
		fetchPrice(city),
		fetchRating(city)
	]).then(function (data) {
		var names = data[0];
		var addresses = data[1];
		var hours = data[2];
		var prices = data[3];
		var ratings = data[4];
	
		return {
			restaurants: names,
			restAdd: addresses,
			restHours: hours,
			restPrices: prices,
			restRatings: ratings
		}
	})
}

module.exports = {
	findRestaurants: function (city) {
		return getUserData(city)
			.catch(handleError)
	}
}