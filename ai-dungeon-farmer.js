/* jshint esversion: 11 */
var EnableFastMode = false;

console.log("<[>AI Dungeon Farmer<]>");

var NOHTML = false;
var HTML_SubText = null;
var HTML_WatchAdBtn = null;
var HTML_ActionText = null;
var AUTHTOKEN = null;
var USERAGENT = null;

(async () => {
	var isNodeJS = false;
	try {
		isNodeJS = !!require;
	} catch { isNodeJS = false; }
	if (isNodeJS) {
		console.log("Running in Node.js environment.");
		_aidfuck_fetch = require("node-fetch");
		rl = require("readline").createInterface(process.stdin, process.stdout);
		prompt = async (q) => await new Promise((r) => rl.question(q, r));
		AUTHTOKEN = process.argv[2] || await prompt("Enter your authtoken: ");
		USERAGENT = process.argv[3] || (await prompt("Enter your useragent: ")).toLowerCase();
		NOHTML = true;
		postInit();
	} else {
		console.log("Running in DevTools environment.");
		HTML_SubText = $("[style=\"color: rgb(153, 153, 153); font-family: HelveticaNeue-Light, Helvetica, sans-serif, Classic, alegreya_regular; font-size: 20px;\"]");
		HTML_WatchAdBtn = $$("[style=\"color: rgb(255, 255, 255); font-family: HelveticaNeue-Light, Helvetica, sans-serif, Classic, alegreya_regular; font-size: 24px; padding-right: 8px; padding-left: 8px; text-transform: uppercase;\"]").find((x) => x.innerText == "WATCH AN AD");
		HTML_ActionText = $("[style=\"color: rgb(255, 255, 255); font-family: HelveticaNeue-Bold, Helvetica, sans-serif, Classic, alegreya_regular; font-size: 32px; margin-top: 64px; text-align: center;\"]");
		if (!HTML_SubText || !HTML_WatchAdBtn) throw "Couldn't find a required HTML element.";
		HTML_SubText.innerHTML = '<center>Welcome to AI Dungeon Farmer!<br>Made in a few boring hours by Alluseri<br><i><small>Ads were such a bad idea...<br>Now everyone gets to enjoy the ad-free experience.</small></i></center>';
		HTML_SubText.parentElement.style.alignSelf = "center";
		HTML_WatchAdBtn.innerText = "INITIALIZE FARMER";
		_aidfuck_fetch = fetch;
		fetch = async function (n, capture) {
			var auth = capture.headers?.authorization;
			if (auth && !AUTHTOKEN) {
				AUTHTOKEN = auth;
			}
		};
		var uni = function ($, getEventListeners) {
			if (AUTHTOKEN) postInit($, getEventListeners);
			else setTimeout(uni, 1000, $, getEventListeners);
		};
		uni = function ($, getEventListeners) {
			if (AUTHTOKEN) postInit($, getEventListeners);
			else setTimeout(uni, 1000, $, getEventListeners);
		};
		// ^ I'm afraid of js so double declaration just in case
		// I know I could just setInterval & self clear
		uni($, getEventListeners);
	}
})();

function fuckgraphql(eventName, clientInfo) { // it's so gay istg
	return {
		"operationName": "EventHookSendUserEvent",
		"variables": {
			"input": {
				"eventName": eventName,
				"variation": "web",
				"clientInfo": clientInfo
			}
		},
		"query": "mutation EventHookSendUserEvent($input: EventInput) {\n  sendUserEvent(input: $input)\n}\n"
	};
}

async function easy(query) {
	return await (await _aidfuck_fetch("https://api.aidungeon.io/graphql", {
		"method": "POST",
		"body": JSON.stringify(query),
		"headers": {
			"authorization": AUTHTOKEN,
			"content-type": "application/json",
			"accept": "*/*"
		}
	})).json();
}

async function postInit($, getEventListeners) {
	console.log("Pre-init routine complete.");

	if (NOHTML) {
		while (true) {
			var repeat = 1;
			try {
				repeat = Number.parseInt(await prompt("How much actions to add * 10?"));
			} catch {}
			var clientInfo = {
				"os": "web",
				"model": USERAGENT,
				"version": "unknown"
			};
			var Query1 = fuckgraphql("ad_reward_button_press", clientInfo);
			var Query2 = fuckgraphql("ad_rewarded_reward_earned", clientInfo);
			var Query3 = {
				"operationName": "IncreaseAdCounterAdContext",
				"variables": {},
				"query": "mutation IncreaseAdCounterAdContext($addActions: Int) {\n  increaseAdCountdown(addActions: $addActions)\n}\n"
			};
			var Query4 = {
				"operationName": "UserContextGetAdCountdown",
				"variables": {},
				"query": "query UserContextGetAdCountdown {\n  adCountdown {\n    id\n    currentCount\n    enforceAds\n    shouldAutoplayAds\n    __typename\n  }\n}\n"
			};
			for (var i = 0;i < repeat;i++) {
				if (EnableFastMode) {
					easy(Query1);
					easy(Query2);
					easy(Query3);
				} else {
					await easy(Query1);
					await easy(Query2);
					await easy(Query3);
				}
				console.log("Now you have " + (await easy(Query4)).data.adCountdown.currentCount + " actions." + (EnableFastMode ? " Info may be outdated due to Fast Mode." : ""));
			}
		}
	} else {
		setTimeout(($) => {
			console.log($);
			$("[style='align-items: center; display: flex; height: auto; justify-content: center; -webkit-box-align: center; -webkit-box-pack: center;']").parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
		}, 200, $);
		HTML_SubText.innerHTML = "<center><b>Refresh</b> the page after you're done farming.<br><i><small>Powered by catgirl supremacy</small></i></center>";
		HTML_WatchAdBtn.innerText = "+10 ACTIONS";
		$("#root").removeEventListener("click", getEventListeners($("#root")).click[0].listener);
		_backup = async function () {
			HTML_WatchAdBtn.parentElement.parentElement.onclick = null;
			HTML_WatchAdBtn.innerText = "PLEASE WAIT...";
			var clientInfo = {
				"os": "web",
				"model": navigator.userAgent.toLowerCase(),
				"version": "unknown"
			};
			var Query1 = fuckgraphql("ad_reward_button_press", clientInfo);
			var Query2 = fuckgraphql("ad_rewarded_reward_earned", clientInfo);
			var Query3 = {
				"operationName": "IncreaseAdCounterAdContext",
				"variables": {},
				"query": "mutation IncreaseAdCounterAdContext($addActions: Int) {\n  increaseAdCountdown(addActions: $addActions)\n}\n"
			};
			var Query4 = {
				"operationName": "UserContextGetAdCountdown",
				"variables": {},
				"query": "query UserContextGetAdCountdown {\n  adCountdown {\n    id\n    currentCount\n    enforceAds\n    shouldAutoplayAds\n    __typename\n  }\n}\n"
			};
			if (EnableFastMode) {
				easy(Query1);
				easy(Query2);
				easy(Query3);
			} else {
				await easy(Query1);
				await easy(Query2);
				await easy(Query3);
			}
			HTML_ActionText.innerHTML = "You have " + (await easy(Query4)).data.adCountdown.currentCount + " Actions" + (EnableFastMode ? "<br>Fast mode enabled: Info may be outdated." : "");
			HTML_WatchAdBtn.parentElement.parentElement.onclick = _backup;
			HTML_WatchAdBtn.innerText = "+10 ACTIONS";
		};
		HTML_WatchAdBtn.parentElement.parentElement.onclick = _backup;
	}
}

// "haven't seen worse code in my entire life" - (C) Someone, definitely
