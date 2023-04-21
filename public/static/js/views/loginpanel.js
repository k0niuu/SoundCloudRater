import abstract from "./abstract.js";

export default class extends abstract {
	constructor(params) {
		super(params);
		this.setTitle("Login");
	}

	async getHtml() {
		return `
        <div id="login">
        <div id="margin"></div>
        <div id="inputs">
        <h2>Log in or Register</h2>
          <input type="email" placeholder="Email" id="email-input" required />
          <input
            type="password"
            placeholder="Password"
            id="password-input"
            required
          />
          </div>
          <div id="buttons">
            <button id="login-btn">Log in</button>
            <button id="register-btn">Register</button>
            <br />
            <span id="login-error-information"></span>
          </div>
        </div>
        `;
	}
}
