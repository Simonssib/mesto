const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.popup-open');
const popupClose = document.querySelector('.popup__close');

popupOpen.addEventListener('click', function() {
    popup.classList.add('popup__opened');
});

popupClose.addEventListener('click', function() {
    popup.classList.remove('popup__opened');
});


let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let popupName = document.querySelector('.popup__name');
let popupProfession = document.querySelector('.popup__profession');
const saveButton = document.querySelector('.popup__save');

saveButton.addEventListener('click', function() {
    profileName.textContent = popupName.value;
    profileProfession.textContent = popupProfession.value;
    popup.classList.remove('popup__opened');
});


const likeButton = document.querySelectorAll('.elements__button-like');

function likeActive(parent) {
    parent.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle('elements__button-like_active');
        });
    });
}
likeActive(likeButton);