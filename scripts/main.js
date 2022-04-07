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
const formProfile = profilePopup.querySelector('.popup__form');

const cardTemplate = document.querySelector('.elements-template');
const buttonAdd = postPopup.querySelector('.popup__save');
const cardContainer = document.querySelector('.elements');
const inputCardTitle = postPopup.querySelector('.popup__field_text_title');
const inputCardLink = postPopup.querySelector('.popup__field_text_link');
const formCard = postPopup.querySelector('.popup__form');
const card = postPopup.querySelector('.elements__item');
const buttonCloseImage = cardTemplate.content.querySelector('.popup__close');

const popupZoom = document.querySelector(".popup-zoom");
const popupZoomPhoto = document.querySelector(".popup__zoom-photo");
const popupZoomCaption = document.querySelector(".popup__zoom-caption");
const popupZoomClose = popupZoom.querySelector(".popup__close");
const popupList = Array.from(document.querySelectorAll('.popup'));

function openPopup(element) {
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
};

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
};

function deleteCard(event) {
    event.target.closest('.elements__item').remove();
};

function openZoomPopup(event) {
    popupZoomPhoto.src = event.target.src;
    popupZoomPhoto.alt = event.target.alt;
    popupZoomCaption.textContent = event.target.alt;
    openPopup(popupZoom);
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

popupList.forEach(handleOverley);
initialCards.forEach(renderCard);

profilePopupOpen.addEventListener('click', () => openPopup(profilePopup));
profilePopupClose.addEventListener('click', () => closePopup(profilePopup));

postPopupOpen.addEventListener('click', () => {
    openPopup(postPopup);
    disableSubmitButton(buttonAdd, 'popup__save_disabled');
});
postPopupClose.addEventListener('click', () => closePopup(postPopup));
popupZoomClose.addEventListener('click', () => closePopup(popupZoom));

formProfile.addEventListener('submit', submitFormHandler);
formCard.addEventListener('submit', addCard);