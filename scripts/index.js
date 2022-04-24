import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import { initialCards, validationList } from './constants.js'

const profilePopup = document.querySelector('.popup-profile');
const profilePopupOpen = document.querySelector('.profile__button-edit');
const profilePopupClose = profilePopup.querySelector('.popup__close');

const postPopup = document.querySelector('.popup-post');
const postPopupOpen = document.querySelector('.profile__button-add');
const postPopupClose = postPopup.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupInputName = document.querySelector('.popup__field_text_name');
const popupInputProfession = document.querySelector('.popup__field_text_profession');
const formProfile = profilePopup.querySelector('.popup__form');

const cardTemplate = document.querySelector('.elements-template');
const buttonAdd = postPopup.querySelector('.popup__save');
const cardContainer = document.querySelector('.elements');
const inputCardTitle = postPopup.querySelector('.popup__field_text_title');
const inputCardLink = postPopup.querySelector('.popup__field_text_link');
const formCard = postPopup.querySelector('.popup__form');

export const popupZoom = document.querySelector(".popup-zoom");
export const popupZoomPhoto = document.querySelector(".popup__zoom-photo");
export const popupZoomCaption = document.querySelector(".popup__zoom-caption");
const popupZoomClose = popupZoom.querySelector(".popup__close");
const popupList = Array.from(document.querySelectorAll('.popup'));

const formValidProfile = new FormValidator(validationList, formProfile);
const formValidCard = new FormValidator(validationList, formCard);

export function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscUp);
};

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscUp);
};

function submitFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    closePopup(profilePopup);
};

const createCard = (data) => {
    const card = new Card(data, '.elements-template');
    const cardElement = card.generateCard();
    return cardElement;
}

const renderCard = (data, container) => {
    const cardElement = createCard(data);
    container.prepend(cardElement);
}

function createNewCard(event) {
    event.preventDefault();
    renderCard({
        name: inputCardTitle.value,
        link: inputCardLink.value,
    }, cardContainer);
    closePopup(postPopup);
    formCard.reset();
};

const addCards = (initialCards) => {
    initialCards.forEach((item) => {
        renderCard(item, cardContainer);
    });
};

const handleEscUp = (evt) => {
    if (evt.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
};

const handleOverley = (popup) => {
    popup.addEventListener('mousedown', evt => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    });
}

addCards(initialCards);

popupList.forEach(handleOverley);

profilePopupOpen.addEventListener('click', () => openPopup(profilePopup));
profilePopupClose.addEventListener('click', () => closePopup(profilePopup));

postPopupOpen.addEventListener('click', () => {
    openPopup(postPopup);
    formValidCard.disableSubmitButton();
});
postPopupClose.addEventListener('click', () => closePopup(postPopup));
popupZoomClose.addEventListener('click', () => closePopup(popupZoom));

formValidProfile.enableValidation();
formValidCard.enableValidation();

formProfile.addEventListener('submit', submitFormHandler);
formCard.addEventListener('submit', createNewCard);