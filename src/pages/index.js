import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImages.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import { avatarPopupOpen, formAvatar, validationList, postPopupOpen, profilePopupOpen, popupInputProfession, popupInputName, formProfile, formCard, profileAvatarInput } from '../utils/constants.js'
import '../pages/index.css';
import Api from '../components/Api.js'


//Экземпляр АПИ
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
        authorization: '8f21f79f-6e9f-4a38-b93b-6b074dd058d2',
        'Content-Type': 'application/json'
    },
});

// Валидация форм
const formValidProfile = new FormValidator(validationList, formProfile);
formValidProfile.enableValidation();
const formValidCard = new FormValidator(validationList, formCard);
formValidCard.enableValidation();
const formValidAvatar = new FormValidator(validationList, formAvatar);
formValidAvatar.enableValidation();

//Увеличение картинки при клике
const handleCardClick = (name, link) => {
    popupZoomPhoto.open(name, link);
};

//Создаем карточку
const createCard = (data) => {
    const card = new Card(
        data,
        '.elements-template',
        userInfo._id,
        handleCardClick,
        handleDeleteIconClick,
        api
    );
    const cardElement = card.generateCard();
    return cardElement;
}

//Рендеринг карточек
const addCards = new Section(createCard, '.elements');

const handleDeleteIconClick = (card) => {
    popupDeleteCard.open();
    popupDeleteCard.getIdCard(card);
}

// Данные пользователя
const userInfo = new UserInfo({ nameSelector: '.profile__name', professionSelector: '.profile__profession', avatarSelector: '.profile__avatar' });

//Функция добавления данных пользователя
const handleUserInfo = (data) => {
    userInfo.setUserInfo(data);
    userInfo.id = data._id;
}

// Попап редактирования профиля
const popupProfile = new PopupWithForm('.popup-profile', (data) => {
    popupProfile.renderLoading(true);
    api.editUserInfo(data.name, data.profession)
        .then((userData) => {
            userInfo.setUserInfo(userData);
        })
        .then(() => {
            popupProfile.close();
        })
        .finally(() => {
            popupProfile.renderLoading(false);
        })
        .catch((err) => {
            console.log(`Ошибка ${err}`);
        });
});
popupProfile.setEventListeners();

// Попап добавления поста
const popupAddCard = new PopupWithForm('.popup-post', (data) => {
    popupAddCard.renderLoading(true);
    api.addCard(data)
        .then((res) => {
            addCards.addItems(createCard(res));
        })
        .then(() => {
            popupAddCard.close();
        })
        .finally(() => {
            popupAddCard.renderLoading(false);
        })
        .catch((err) => {
            console.log(`Ошибка ${err}`);
        })
})
popupAddCard.setEventListeners();

//Попап подтверждения при удалениии
const popupDeleteCard = new PopupWithSubmit(
    '.popup-confirm',
    (cardId) => {
        api.deleteCard(cardId)
            .then(() => {
                popupDeleteCard._card.handleDeleteCard();
            })
            .then(() => {
                popupDeleteCard.close();
            })
            .catch((err) => console.error(`Ошибка ${err}`));
    }
)
popupDeleteCard.setEventListeners();

//Попап добавления аватара
const popupEditAvatar = new PopupWithForm('.popup-avatar', () => {
    popupEditAvatar.renderLoading(true);
    api.editUserAvatar(profileAvatarInput.value)
        .then((userData) => {
            userInfo.setUserInfo(userData);
        })
        .then(() => {
            popupEditAvatar.close();
        })
        .finally(() => {
            popupEditAvatar.renderLoading(false);
        })
        .catch((err) => {
            console.log(`Ошибка загрузки аватара ${err}`);
        })
})
popupEditAvatar.setEventListeners();

// Попап для увеличения картинок
const popupZoomPhoto = new PopupWithImage({
    popupSelector: '.popup-zoom',
    imageSelector: '.popup__zoom-photo',
    titleSelector: '.popup__zoom-caption',
});
popupZoomPhoto.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, userCard]) => {
        handleUserInfo(userData);
        addCards.render(userCard);
    })
    .catch((err) => {
        console.log(err);
    });

postPopupOpen.addEventListener('click', () => {
    formValidCard.disableSubmitButton();
    popupAddCard.open();
});

profilePopupOpen.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    popupInputName.value = userData.name;
    popupInputProfession.value = userData.about;
    popupProfile.open();
});

avatarPopupOpen.addEventListener('click', () => {
    formValidAvatar.disableSubmitButton();
    popupEditAvatar.open();
})