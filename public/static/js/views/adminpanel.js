import abstract from "./abstract.js";

export default class extends abstract {
	constructor() {
		super();
	}

	async getHtml() {
		const html = `
        <div id="admin-section">
        <div class="description">
            <span id="admin-description">Admin panel</span>
        </div>
        <div class="admin">
            <div class="descriptions">
                <div id="artist-input">
                    <input
                        type="text"
                        placeholder="Type artist name..."
                        id="artist-name"
                        required />
                </div>
                <div id="perform-rating-info">
                    <span
                        >To perform a new rating, update or delete rating you need to provide
                        the username from SoundCloud that is located in the LINK to their
                        profile in the above text field. To correctly obtain the username, you
                        should first go to the main page of their SoundCloud profile, and then
                        extract the username from the link as shown in the examples:
                        <br />
                        from "https://soundcloud.com/speed-buda" we extract "speed-buda",
                        <br />
                        from "https://soundcloud.com/eminemofficial" we extract
                        "eminemofficial".</span
                    >
                </div>
            </div>
            <div class="buttons">
                <div id="performing-info" class="action-status">
					<span></span>
				</div>
                <div>
                    <button id="perform-new-rating" class="button">
                        Perform new rating
                    </button>
                </div>
                <div id="updating-info" class="action-status">
					<span></span>
				</div>
                <div>
                    <button id="update-rating" class="button">Update rating</button>
                </div>
                <div id="deletion-info" class="action-status">
					<span></span>
				</div>
                <div>
                    <button id="delete-rating" class="button">Delete rating</button>
                </div>
                <div>
                    <button id="push-to-soundcloud" class="button">Push to SoundCloud</button>
                </div>
            </div>
        </div>
    </div>
        `;

		return html;
	}

	async getScripts() {
		const scriptPath = "static/js/admin.js?t=1";
		return scriptPath;
	}
}
