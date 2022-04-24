import { openPopup, popupZoomPhoto, popupZoomCaption, popupZoom } from './index.js';

export class Card {
    constructor(data, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);
        return cardElement
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const imageCard = this._element.querySelector('.elements__photo');
        imageCard.src = this._image;
        imageCard.alt = this._title;
        this._element.querySelector('.elements__paragraph').textContent = this._title;
        return this._element;
    }
    _handleCardLike() {
        this._element.querySelector('.elements__button-like').classList.toggle('elements__button-like_active');
    }
    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }
    _handleCardClick() {
        popupZoomPhoto.src = this._image;
        popupZoomPhoto.alt = this._title;
        popupZoomCaption.textContent = this._title;

        openPopup(popupZoom);
    }

    _setEventListeners() {
        this._element.querySelector('.elements__button-like').addEventListener('click', () => {
            this._handleCardLike();
        });

        this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
            this._handleDeleteCard();
        });

        this._element.querySelector('.elements__photo').addEventListener('click', () => {
            this._handleCardClick();
        });
    }
}