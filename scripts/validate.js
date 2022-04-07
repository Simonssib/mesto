const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

/*функция, показывающая ошибки*/
const showInputError = (formSelector, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(errorClass);
    console.log(inputElement);
}

/*функция, скрывающая ошибки*/
const hideInputError = (formSelector, inputElement, { inputErrorClass, errorClass }) => {
    const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(inputErrorClass);
}

/*функция, проверяющая валидность формы*/
const checkInputValidity = (formSelector, inputElement, rest) => {
    if (inputElement.validity.valid) {
        hideInputError(formSelector, inputElement, rest);
    } else {
        showInputError(formSelector, inputElement, inputElement.validationMessage, rest);
    }
}

/*функция переключения кнопки*/
const toggleButtonState = (inputList, submitButtonSelector, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        submitButtonSelector.classList.add(inactiveButtonClass);
        submitButtonSelector.setAttribute('disabled', 'disabled');
    } else {
        submitButtonSelector.classList.remove(inactiveButtonClass);
        submitButtonSelector.removeAttribute('disabled');
    }
}

/*функция прикрепления слушателей на все инпуты в форме*/
const setEventListeners = (formSelector, { inputElement, submitButtonSelector, inactiveButtonClass, ...rest }) => {
    const inputList = Array.from(formSelector.querySelectorAll(inputElement));
    const buttonElement = formSelector.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach(item => {
        item.addEventListener('input', function() {
            checkInputValidity(formSelector, item, rest);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
}

/*включаем валидацию на все формы*/
const enableValidation = ({ formSelector, ...rest }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(form => {
        setEventListeners(form, rest);
    });
}

/*функция блокировки кнопки сохранения*/
const disableSubmitButton = (submitButtonSelector, inactiveButtonClass) => {
    submitButtonSelector.classList.add(inactiveButtonClass);
    submitButtonSelector.setAttribute('disabled', 'disabled');
}

enableValidation(validationList);