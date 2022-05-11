export default class FormValidator {
    constructor(data, form) {
        this._data = data;
        this._form = form;
    }
    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._data.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._data.errorClass);
    }
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(this._data.errorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(this._data.inputErrorClass);
    }
    _hasInvalidInput() {
        this._inputList = Array.from(this._form.querySelectorAll(this._data.inputElement));
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }

    _toggleButtonState() {
        this._buttonElement = this._form.querySelector(this._data.submitButtonSelector);

        if (this._hasInvalidInput(this._inputList)) {
            this.disableSubmitButton();
        } else {
            this._buttonElement.classList.remove(this._data.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', 'disabled');
        }
    }

    disableSubmitButton() {
        this._buttonElement.classList.add(this._data.inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', 'disabled');
    }

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }

    enableValidation() {
        this._inputList = Array.from(this._form.querySelectorAll(this._data.inputElement));
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
}