export default class SortableTable {
	element;
	_subElements = {};
	constructor(header = [], { data = [] } = {}) {
	  this.header = header;
	  this.data = data;

	  this.render();
	}

	get tableHeader() {
	  return `<div data-element="header" class="sortable-table__header sortable-table__row">
							  ${this.header.map((item) => this.getHeaderRow(item)).join("")}</div>
		  `;
	}

	getHeaderRow({ id, title, sortable }) {
	  return `
		  <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
					  <span>${title}</span>
					  <span data-element="arrow" class="sortable-table__sort-arrow">
					  <span class="sort-arrow"></span>
					  </span>
		  </div>`;
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
	get table() {
	  return `
		  <div class="sortable-table">
			   ${this.tableHeader}
			   ${this.tableBody}
		  </div>
		`;
	}

	render() {
	  const blank = document.createElement("div");
	  blank.innerHTML = this.table;
	  this.element = blank.firstElementChild;
	  this._subElements = this.subElements;
	}
	get subElements() {
	  const elements = this.element.querySelectorAll("[data-element]");
	  return [...elements].reduce((accum, subElement) => {
		accum[subElement.dataset.element] = subElement;
		return accum;
	  }, {});
	}
	sort(field, order) {
	  const sortedData = this.sortData(field, order);
	  const allColumns = this.element.querySelectorAll(
		".sortable-table__cell[data-id]"
	  );
	  const currentColumn = this.element.querySelector(
		`.sortable-table__cell[data-id="${field}"]`
	  );

	  allColumns.forEach((column) => {
		column.dataset.order = "";
	  });

	  currentColumn.dataset.order = order;
	  this.subElements.body.innerHTML = this.getTableRows(sortedData);
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

	remove() {
	  this.element.remove();
	}

	destroy() {
	  this.remove();
	  this._subElements = {};
	}
  }


