import Popup from '../components/Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._popupSubmitButton = this._popup.querySelector('.popup__confirm');
        this.defaultSubmitButtonText = this._popupSubmitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSubmitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._id);
        })
    }

    getIdCard(card) {
        this._id = card._id;
        this._card = card;
    }

}