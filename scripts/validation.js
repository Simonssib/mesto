const validationList = {
    formSelector: '.popup__form',
    inputElement: '.popup__field',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field_type_error'
}

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

//функция, которая показывает ошибки
const showInputError = (formSelector, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    console.log(inputElement);
}

//функция, которая убирает ошибки
const hideInputError = (formSelector, inputElement, { inputErrorClass, errorClass }) => {
    const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(inputErrorClass);
}

//функция проверяющая валидность формы
const checkInputValidity = (formSelector, inputElement, parameters) => {
    if (inputElement.validity.valid) {
        hideInputError(formSelector, inputElement, parameters);
    } else {
        showInputError(formSelector, inputElement, inputElement.validationMessage, parameters);
    }
}

//функция переключения доступности кнопки
const toggleButtonState = (inputList, submitButtonSelector, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        submitButtonSelector.classList.add(inactiveButtonClass);
        submitButtonSelector.setAttribute('disabled', 'disabled');
    } else {
        submitButtonSelector.classList.remove(inactiveButtonClass);
        submitButtonSelector.removeAttribute('disabled');
    }
}

//функция навешивания слушателей на все инпуты в форме
const setEventListeners = (formSelector, { inputElement, submitButtonSelector, inactiveButtonClass, ...parameters }) => {
    const inputList = Array.from(formSelector.querySelectorAll(inputElement));
    const buttonElement = formSelector.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach(item => {
        item.addEventListener('input', function() {
            checkInputValidity(formSelector, item, parameters);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
}

//функция, включающая валидацию на всех формах
const enableValidation = ({ formSelector, ...parameters }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(form => {
        setEventListeners(form, parameters);
    });
}


//вызов функции
enableValidation(validationList);