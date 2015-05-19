(function () {
	'use strict';
	var _ = require('lodash');

	angular.module('app.services', [])
		.factory('dataservice', dataservice);

	/* @ngInject */
	function dataservice($http, $q) {

		var service = {
			getSuggestions: getSuggestions,
			storage: storage()

		};

		return service;

		//gets suggestion from google
		function getSuggestions(query) {
			var deferred = $q.defer();
			var url = "http://suggestqueries.google.com/complete/search?output=firefox&callback=JSON_CALLBACK&q=" + encodeURIComponent(query);

			$http.jsonp(url).success(function (data) {
				var suggestions = [];
				suggestions = data[1] ? data[1].map(function (result) {
					return {
						value: result.toLowerCase(),
						display: result
					};
				}) : [];

				suggestions = _.take(suggestions, 5); //returns 5 only
				suggestions = _.sortBy(suggestions, 'display'); // sorts the by name
				
				deferred.resolve(suggestions);
			})
				.error(function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		}

		function storage() {
			var STORAGE_ID = 'todos-4-later';

			return {
				get: function () {
					return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
				},

				set: function (list) {
					localStorage.setItem(STORAGE_ID, JSON.stringify(list));
				}
			};
		}
	}
} ());