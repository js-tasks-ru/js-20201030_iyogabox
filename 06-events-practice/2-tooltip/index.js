class Tooltip {
	static instance;
	element;

	showTooltip = (event) => {
	  const currentDataset = event.target.closest("[data-tooltip]");
	  if (currentDataset) {
		this.render(currentDataset.dataset.tooltip);
		document.addEventListener("pointermove", this.onMouseMove);
	  }
	};
	onMouseMove = (event) => {
	  this.moveTooltip(event);
	};
	moveTooltip(event) {
	  const left = event.clientX + 10;
	  const top = event.clientY + 10;
	  this.element.style.left = `${left}px`;
	  this.element.style.top = `${top}px`;
	}

	removeTooltip = () => {
	  if (this.element) {
		this.element.remove();
	  }
	};
	removeLisener() {
	  document.removeEventListener("pointerover", this.showTooltip);
	}
	constructor() {
	  if (Tooltip.instance) {
		return Tooltip.instance;
	  }
	  Tooltip.instance = this;
	}

	eventListener() {
	  document.addEventListener("pointerover", this.showTooltip);
	  document.addEventListener("pointerout", this.removeTooltip);
	}

	initialize() {
	  this.eventListener();
	}
	render(html) {
	  this.element = document.createElement("div");
	  this.element.className = "tooltip";
	  this.element.innerHTML = html;
	  document.body.append(this.element);
	}

	destroy() {
	  document.removeEventListener("pointerover", this.showTooltip);
	  document.removeEventListener("pointerout", this.removeTooltip);
	  this.removeTooltip();
	}
  }

  const tooltip = new Tooltip();

  export default tooltip;

