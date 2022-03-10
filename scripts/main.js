const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.profile__button-edit');
const popupClose = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let popupName = document.querySelector('.popup__field_text_name');
let popupProfession = document.querySelector('.popup__field_text_profession');
const saveButton = document.querySelector('.popup__save');
const likeButtonList = document.querySelectorAll('.elements__button-like');
let form = document.querySelector('.popup__input');

function openPopup() {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileProfession.textContent = popupProfession.value;
    closePopup();
}

function likeActive(parent) {
    parent.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle('elements__button-like_active');
        });
    });
}

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);
likeActive(likeButtonList);
