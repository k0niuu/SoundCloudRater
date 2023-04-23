import abstract from "./abstract.js";

export default class extends abstract {
	constructor() {
		super();
	}

	async getHtml() {
		const html = `
    <div id="rate-section">
    <div class="description">
      <span id="rate-description"
        >Vote for the song you like more, or choose a draw if you can't decide
        which one to pick!</span
      >
    </div>
    <div class="rate">
      <div>
        <div style="height: 40px"></div>
        <div class="soundcloud-player">
          <iframe
            id="soundcloud-widget-first"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1350831556&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            frameborder="no"></iframe>
        </div>
        <div class="choose-buttons">
          <button type="button" id="choose-first">CHOOSE FIRST</button>
        </div>
      </div>
      <div class="empty">
        <div style="height: 280px"></div>
        <div class="draw">
          <button type="button" id="draw">DRAW</button>
        </div>
      </div>
      <div>
        <div style="height: 40px"></div>
          <div class="soundcloud-player">
            <iframe
              id="soundcloud-widget-second"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1390671679&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              frameborder="no"></iframe>
          </div>
          <div class="choose-buttons">
            <button type="button" id="choose-second">CHOOSE SECOND</button>
          </div>
        </div>
      </div>
  </div>`;
		return html;
	}

	async getScripts() {
		const scriptPath = "static/js/rate.js?t=1";
		return scriptPath;
	}
}
