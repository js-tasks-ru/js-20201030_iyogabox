export default class NotificationMessage {
	element;
	static isExist;

	constructor(message = "", { duration = 0, type = "error" } = {}) {
	  this.message = message;
	  this.duration = duration;
	  this.type = type;
	  if (NotificationMessage.isExist) {
		NotificationMessage.isExist.remove();
	  }

	  this.render();
	}

	get template() {
	  const element = document.createElement("div");
	  element.innerHTML = `
		<div class="notification ${this.type}" style="--value:${this.duration}ms">
		<div class="timer"></div>
		<div class="inner-wrapper">
		  <div class="notification-header">${this.type}</div>
		  <div class="notification-body">
			${this.message}
		  </div>
		</div>
	  </div>
		`;
	  return element.firstElementChild;
	}
	render() {
	  this.element = this.template;
	}

	show(parentElement = document.body) {
	  parentElement.append(this.element);
	  NotificationMessage.isExist = this.element;
	  setTimeout(() => {
		this.remove();
	  }, this.duration);
	}
	remove() {
	  this.element.remove();
	}
	destroy() {
	  this.remove();
	}
  }

