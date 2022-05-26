export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItems(element) {
        this._container.prepend(element);
    }

    renderer(items) {
        items.reverse().forEach((item) => {
            const element = this._renderer(item);
            this.addItems(element);
        })
    }
}