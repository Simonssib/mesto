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
const buttonSave = document.querySelector('.popup__save');
const likeButtonList = document.querySelectorAll('.elements__button-like');
const formProfile = profilePopup.querySelector('.popup__input');

const cardTemplate = document.querySelector('.elements-template');
const buttonAdd = postPopup.querySelector('.popup__save');
const cardContainer = document.querySelector('.elements');
const inputCardTitle = postPopup.querySelector('.popup__field_text_title');
const inputCardLink = postPopup.querySelector('.popup__field_text_link');
const formCard = postPopup.querySelector('.popup__input');
const card = postPopup.querySelector('.elements__item');
const buttonCloseImage = cardTemplate.content.querySelector('.popup__close');

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupZoom = document.querySelector(".popup-zoom");
const popupZoomPhoto = document.querySelector(".popup__zoom-photo");
const popupZoomCaption = document.querySelector(".popup__zoom-caption");
const popupZoomClose = popupZoom.querySelector(".popup__close");


function openPopup(element) {
    element.classList.add('popup_opened');
}

function closePopup(element) {
    element.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    closePopup(profilePopup);
}

function createCard(item) {
    const cardElement = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
    const likeButtonCard = cardElement.querySelector('.elements__button-like');
    const deleteButtonCard = cardElement.querySelector('.elements__button-delete');
    const cardImage = cardElement.querySelector('.elements__photo');
    cardElement.querySelector('.elements__photo').src = item.link;
    cardElement.querySelector('.elements__photo').alt = item.name;
    cardElement.querySelector('.elements__paragraph').textContent = item.name;
    likeButtonCard.addEventListener('click', likeCard);
    deleteButtonCard.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', openZoomPopup);
    return cardElement;
};

function renderCard(element) {
    const cardElement = createCard(element);
    cardContainer.prepend(cardElement);
}

function createNewCard() {
    const newCard = { name: inputCardTitle.value, link: inputCardLink.value };
    renderCard(newCard);
    inputCardTitle.value = '';
    inputCardLink.value = '';
};

function addCard(event) {
    event.preventDefault();
    createNewCard();
    closePopup(postPopup);
};

function likeCard(event) {
    event.target.classList.toggle('elements__button-like_active');
}

function deleteCard(event) {
    event.target.closest('.elements__item').remove();
};

function openZoomPopup(event) {
    popupZoomPhoto.src = event.target.src;
    popupZoomPhoto.alt = event.target.alt;
    popupZoomCaption.textContent = event.target.alt;
    openPopup(popupZoom);
}


initialCards.forEach(renderCard);

profilePopupOpen.addEventListener('click', () => openPopup(profilePopup));
profilePopupClose.addEventListener('click', () => closePopup(profilePopup));

postPopupOpen.addEventListener('click', () => openPopup(postPopup));
postPopupClose.addEventListener('click', () => closePopup(postPopup));
popupZoomClose.addEventListener('click', () => closePopup(popupZoom));


formProfile.addEventListener('submit', formSubmitHandler);
formCard.addEventListener('submit', addCard);