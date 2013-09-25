footballApp.controller('AppCtrl',
			['$scope','footballService',
	function ($scope,  footballService) {
//		var footballPromise = footballService;
//		
//		var footballSuccess = function(data) {
//			var hallo = "";
//			alert("Success");
//		}
//				
//		var footballError = function(data) {
//			var hallo = "";
//			alert("Error");
//		}
//		
//		footballPromise.then(footballSuccess, footballError);
				
		var matchDate = "",
			that = this;
		
		this.footballPage = "";
		this.teams = [];
		this.matches = [];
		this.search = {
			$: null
		};
		this.tableOrder = {
			one: 'points',
			oneReverse: true,
			two: 'goalsDiff',
			twoReverse: true,
			three: 'goals',
			threeReverse: true
		};
		this.lostPointsOrder = false;
		
		$scope.$watch('AppCtrl.lostPointsOrder', function(newValue, oldValue, scope) {
			if(newValue) {
				that.tableOrder.one = 'pointsLost';
				that.tableOrder.oneReverse = false;
			} else {
				that.tableOrder.one = 'points';
				that.tableOrder.oneReverse = true;
			}
		});
		
		this.searchFor = function(team) {
			if(that.search.$ == team.name) {
				that.search.$ = null;
			} else {
				that.search.$ = team.name;
			}
		}
		
		this.calculate = function() {
			that.matches = [];
			that.teams = [];
			var jLtrs = angular.element(this.footballPage).find("tr");
			jLtrs.each( function(index, Element) {
				var $tr = $(this);
				
				if($tr.hasClass("spp0BL")) {
					var match = matchToJson($tr);
					that.matches.push(match);
					if(match.teamResultA != null && match.teamResultB != null) {
						calculateTeamData(match);
					}
				} else {
					if($tr.find("td").hasClass("sppTitel")) {
						matchDate = $tr.find(".sppTitel").text();
					}
				}
			});
		};
		
		var matchToJson = function($tr) {
			var match = {};
			match.teamNameA = $tr.find(".tabContTeamA").text();
			match.teamNameB = $tr.find(".tabContTeamB").text();
			match.teamResultA = $tr.find(".tabContResA").text();
			if(!isNaN(match.teamResultA) && match.teamResultA.replace(/ /g, "").length > 0) {
				match.teamResultA = Number(match.teamResultA);
			} else {
				match.teamResultA = null;
			}
			match.teamResultB = $tr.find(".tabContResB").text();
			if(!isNaN(match.teamResultB) && match.teamResultB.replace(/ /g, "").length > 0) {
				match.teamResultB = Number(match.teamResultB);
			} else {
				match.teamResultB = null;
			}
			match.startTime = $tr.find(".tabContRes").text();
			match.matchDate = matchDate;
			return match;
		};
		
		var calculateTeamData = function(match) {
			var team,
				len = that.teams.length,
				hasTeamA = false,
				hasTeamB = false,
				match = calculateMatchData(match);
			
			for(var i = 0; i < len; i++) {
				if(that.teams[i].name == match.teamNameA) {
					hasTeamA = true;
					team = that.teams[i];
					team.matches += 1;
					team.goals += match.teamResultA;
					team.goalsMinus += match.teamResultB;
					team.goalsDiff += match.teamResultA - match.teamResultB;
					team.points += match.pointsA;
					team.pointsLost += 3 - match.pointsA;
				} else if(that.teams[i].name == match.teamNameB) {
					hasTeamB = true;
					team = that.teams[i];
					team.matches += 1;
					team.goals += match.teamResultB;
					team.goalsMinus += match.teamResultA;
					team.goalsDiff += match.teamResultB - match.teamResultA;
					team.points += match.pointsB;
					team.pointsLost += 3 - match.pointsB;
				}
			}
			if(!hasTeamA) {
				team = {};
				team.name = match.teamNameA;
				team.matches = 1;
				team.goals = match.teamResultA;
				team.goalsMinus = match.teamResultB;
				team.goalsDiff = match.teamResultA - match.teamResultB;
				team.points = match.pointsA;
				team.pointsLost = 3 - match.pointsA;
				that.teams.push(team);
			}
			if(!hasTeamB) {
				team = {};
				team.name = match.teamNameB;
				team.matches = 1;
				team.goals = match.teamResultB;
				team.goalsMinus = match.teamResultA;
				team.goalsDiff = match.teamResultB - match.teamResultA;
				team.points = match.pointsB;
				team.pointsLost = 3 - match.pointsB;
				that.teams.push(team);
			}
		};
		
		var calculateMatchData = function(match) {
			if(match.teamResultA != null && match.teamResultB != null) {
				if(match.teamResultA > match.teamResultB) {
					match.pointsA = 3;
					match.pointsB = 0;
				} else if(match.teamResultA < match.teamResultB) {
					match.pointsA = 0;
					match.pointsB = 3;
				} else {
					match.pointsA = 1;
					match.pointsB = 1;
				}
			}
			return match;
		};
}]);
