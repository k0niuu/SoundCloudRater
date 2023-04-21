import abstract from "./abstract.js";

export default class extends abstract {
	constructor(params) {
		super(params);
		this.setTitle("score");
	}

	async getHtml() {
		return `
        <div id="scores-section">
        <div class="search-container">
          <input type="text" id="search-input" placeholder="Wyszukaj..." />
          <button id="search-button"><i class="fa fa-search"></i></button>
        </div>
        <div class="scores">
          <ol class="track-list">
            <li>Nazwa pierwszego utworu</li>
            <li>Nazwa drugiego utworu</li>
            <li>Nazwa trzeciego utworu</li>
            <li>Nazwa czwartego utworu</li>
            <li>Nazwa piątego utworu</li>
            <li>Nazwa pierwszego utworu</li>
            <li>Nazwa drugiego utworu</li>
            <li>Nazwa trzeciego utworu</li>
            <li>Nazwa czwartego utworu</li>
            <li>Nazwa piątego utworu</li>
            <li>Nazwa pierwszego utworu</li>
            <li>Nazwa drugiego utworu</li>
            <li>Nazwa trzeciego utworu</li>
            <li>Nazwa czwartego utworu</li>
            <li>Nazwa piątego utworu</li>
          </ol>
        </div>
    </div>
        `;
	}
}
