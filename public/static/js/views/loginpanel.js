import abstract from "./abstract.js";

export default class extends abstract {
	constructor() {
		super();
	}

	async getHtml() {
		const html = `
    <div id="login" class="active-section">
    <div id="margin"></div>
    <div id="inputs">
      <h2>Log in or Register</h2>
      <input type="email" placeholder="Email" id="email-input" required />
      <input
        type="password"
        placeholder="Password"
        id="password-input"
        required />
    </div>
    <div id="buttons">
      <button id="login-btn">Log In</button>
      <button id="register-btn">Register</button>
      <br />
      <span id="login-error-information"></span>
    </div>
  </div>
  <div id="register" class="inactive-section">
    <div id="margin"></div>
    <div id="inputs">
      <h2>Register</h2>
    <input
      type="email"
      placeholder="Email"
      id="email-register-input"
      required />
    <input
      type="password"
      placeholder="Password"
      id="password-register-input"
      required />
    <input
      type="password"
      placeholder="Confirm Password"
      id="confirm-password-input"
      required />
    <div id="buttons">
      <button id="register-submit-btn">Register</button>
      <button id="cancel-btn">Cancel</button>
      <br />
      <span id="register-error-information"></span>
    </div>
  </div>`;
		return html;
	}

	async getScripts() {
		const scriptPath = "static/js/login.js?t=1";
		return scriptPath;
	}
}
