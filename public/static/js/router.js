import admin from "./views/admin.js";
import loginpanel from "./views/loginpanel.js";
import rate from "./views/rate.js";
import scores from "./views/scores.js";

const navgateTo = (url) => {
	history.pushState(null, null, url);
	router();
};

const router = async () => {
	const routes = [
		{ path: "/", view: loginpanel },
		{ path: "/rate", view: rate },
		{ path: "/scores", view: scores },
		{ path: "/admin", view: admin },
		// { path: "/", view: () => console.log("viewing dashboard") },
	];

	const potentialMatches = routes.map((route) => {
		return {
			route: route,
			isMatch: location.pathname === route.path,
		};
	});

	let match = potentialMatches.find(
		(potentialMatches) => potentialMatches.isMatch
	);

	if (!match) {
		match = {
			route: routes[0],
			isMatch: true,
		};
	}

	const view = new match.route.view();
	const html = await view.getHtml();
	const scripts = await view.getScripts();

	document.querySelector("#app").innerHTML = html;
	console.log(html);
	document.querySelector("#scripts").innerHTML = scripts;
	console.log(scripts);
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", (e) => {
		if (e.target.matches("[data-link")) {
			e.preventDefault();
			navgateTo(e.target.href);
		}
	});

	router();
});
