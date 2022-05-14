import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ popupSelector, imageSelector, titleSelector }) {
        super(popupSelector);
        this._image = this._popup.querySelector(imageSelector);
        this._title = this._popup.querySelector(titleSelector);
    }
    open(name, link) {
        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;
        super.open();
    }
}