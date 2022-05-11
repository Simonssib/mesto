import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Popup from '../components/Popup.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImages.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import { initialCards, validationList, postPopupOpen, profilePopupOpen, popupInputProfession, popupInputName, formProfile, formCard } from '../utils/constants.js'
import '../pages/index.css';

// Валидация форм
const formValidProfile = new FormValidator(validationList, formProfile);
formValidProfile.enableValidation();
const formValidCard = new FormValidator(validationList, formCard);
formValidCard.enableValidation();

// popup для увеличения картинок
const popupZoomPhoto = new PopupWithImage({
    popupSelector: '.popup-zoom',
    imageUrl: '.popup__zoom-photo',
    imageName: '.popup__zoom-caption',
});
popupZoomPhoto.setEventListeners();

// Функция увеличения картинки при клике
const handleCardClick = (name, link) => {
    popupZoomPhoto.open(name, link);
}

//Создание и рендер карточек с фото
const createCard = (data) => {
    const card = new Card(data, '.elements-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
}
const addCards = new Section({
        items: initialCards,
        renderer: createCard,
    },
    '.elements'
);
addCards.renderer();

// Попап добавления карточки с фото
const popupAddCard = new PopupWithForm('.popup-post', (data) => {
    addCards.addItems(createCard(data));
});
popupAddCard.setEventListeners();

// Попап редактирования профиля
const userInfo = new UserInfo({ name: '.profile__name', profession: '.profile__profession' });
const popupProfile = new PopupWithForm('.popup-profile', (data) => {
    userInfo.setUserInfo(data);
});
popupProfile.setEventListeners();

postPopupOpen.addEventListener('click', () => {
    formValidCard.disableSubmitButton();
    popupAddCard.open();
});
profilePopupOpen.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    popupInputName.value = userData.name;
    popupInputProfession.value = userData.profession;
    popupProfile.open();
});