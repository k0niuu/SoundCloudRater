import admin from "./views/adminpanel.js";
import loginpanel from "./views/loginpanel.js";
import rate from "./views/ratepanel.js";
import scores from "./views/scorespanel.js";

const navigationBar = document.querySelector("header");
// const userEmail = document.querySelector(".user span");
// const adminButton = document.querySelector("#admin-link");

export const navigateTo = (url) => {
	history.pushState(null, null, url);
	router();
};

const router = async (callback) => {
	const routes = [
		{ path: "/", view: loginpanel },
		{ path: "/rate", view: rate },
		{ path: "/scores", view: scores },
		{ path: "/admin", view: admin },
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
	document.querySelector("#app").innerHTML = html;
	if (!(match.route == routes[0])) {
		navigationBar.style.display = "block";
	}

	const scriptPath = await view.getScripts();
	const randomNum = Math.floor(Math.random() * 1000000) + 1;
	const updatedPath = scriptPath.slice(0, -1) + randomNum;

	const scriptsContainer = document.querySelector("#scripts");
	const existingScript = scriptsContainer.querySelector(
		`script[src='${updatedPath}']`
	);
	if (existingScript) {
		existingScript.remove();
	}

	const script = document.createElement("script");
	script.type = "module";
	script.src = updatedPath;
	script.onload = callback;
	scriptsContainer.appendChild(script);
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", (e) => {
		if (e.target.matches("[data-link")) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
	});

	router();
});
