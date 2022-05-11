export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItems(element) {
        this._container.prepend(element);
    }

    renderer() {
        this._items.forEach(item => {
            const card = this._renderer(item);
            this.addItems(card);
        })
    }
}