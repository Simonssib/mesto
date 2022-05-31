import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._popupSubmitButton = this._popup.querySelector('.popup__save');
        this._defaultSubmitButtonText = this._popupSubmitButton.textContent;
        this._inputList = this._popupForm.querySelectorAll('.popup__field');
    }

    _getInputValues() {
        this._formValue = {};
        this._inputList.forEach((inputItem) => {
            this._formValue[inputItem.name] = inputItem.value;
        });
        return this._formValue;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    renderLoading(isLoading, initialMessage = 'Сохранение...') {
        if (isLoading) {
            this._popupSubmitButton.textContent = initialMessage
        } else {
            this._popupSubmitButton.textContent = this._defaultSubmitButtonText
        }
    }
}