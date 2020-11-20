export default class SortableTable {
	element;
	_subElements = {};
	typeOfSort = "desc";

	headerEvent = (event) => {
	  const column = event.target.closest('[data-sortable="true"]');
	  if (!column) {
		return;
	  }
	  const { id, order } = column.dataset;
	  const sortingOrder = order === "asc" ? "desc" : "asc";
	  const sortedData = this.sortData(id, sortingOrder);
	  column.dataset.order = sortingOrder;
	  column.append(this.subElements.arrow);
	  this.subElements.body.innerHTML = this.getTableRows(sortedData);
	};
	constructor(
	  header,
	  {
		data = [],
		sorted = {
		  id: header.find((item) => item.sortable).id,
		  order: "asc",
		},
	  } = {}
	) {
	  this.header = header;
	  this.data = data;
	  this.sorted = sorted;
	  console.log("this.sorted = ", this.sorted);
	  this.render();
	}

	render() {
	  const blank = document.createElement("div");
	  blank.innerHTML = this.table;
	  this.element = blank.firstElementChild;
	  this._subElements = this.subElements;
	  console.log("this._subElements =", this._subElements.header);
	  this.eventListener();
	}
	eventListener() {
	  this.subElements.header.addEventListener("pointerdown", this.headerEvent);
	}

	sortData(field, order) {
	  const arr = [...this.data];
	  const column = this.header.find((item) => item.id === field);
	  const { sortType, customSorting } = column;
	  const direction = order === "asc" ? 1 : -1;

	  return arr.sort((a, b) => {
		switch (sortType) {
		  case "number":
			return direction * (a[field] - b[field]);
		  case "string":
			return direction * a[field].localeCompare(b[field], "ru");
		  case "custom":
			return direction * customSorting(a, b);
		  default:
			return direction * (a[field] - b[field]);
		}
	  });
	}

	get table() {
	  return `
			<div class="sortable-table">
				 ${this.tableHeader}
				 ${this.tableBody}
			</div>
		  `;
	}

	get tableHeader() {
	  return `<div data-element="header" class="sortable-table__header sortable-table__row">
								${this.header.map((item) => this.getHeaderRow(item)).join("")}</div>
			`;
	}

	getHeaderRow({ id, title, sortable }) {
	  const order = (this.sorted.id === id) ? this.sorted.order : 'asc';
	  return `
			<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" ${(sortable) ? `data-order="${order}"` : ""}>
						<span>${title}</span>
						${this.getArrowForSortingColumn(id)}
			</div>`;
	}
	getArrowForSortingColumn(id) {
	  const isOrderExist = (this.sorted.id === id) ? this.sorted.order : '';

	  return (isOrderExist) ?
		`<span data-element="arrow" class="sortable-table__sort-arrow">
		  <span class="sort-arrow"></span>
		</span>` : "";
	}

	getTableRows(data) {
	  return data
		.map(
		  (item) => `
		  <div class="sortable-table__row">
			 ${this.getTableRow(item)}
		  </div>
		`
		)
		.join("");
	}

	getTableRow(item) {
	  const cells = this.header.map(({ id, template }) => {
		return {
		  id,
		  template,
		};
	  });
	  return cells
		.map(({ id, template }) => {
		  return template
			? template(item[id])
			: `<div class="sortable-table__cell">${item[id]}</div>`;
		})
		.join("");
	}
	get tableBody() {
	  return `
		<div data-element="body" class="sortable-table__body">
			 ${this.getTableRows(this.data)}
		   </div>`;
	}

	get subElements() {
	  const elements = this.element.querySelectorAll("[data-element]");
	  return [...elements].reduce((accum, subElement) => {
		accum[subElement.dataset.element] = subElement;
		return accum;
	  }, {});
	}


	remove() {
	  this.element.remove();
	}

	destroy() {
	  this.remove();
	  this._subElements = {};
	  document.removeEventListener("pointerdown", this.headerEvent);
	}
  }
