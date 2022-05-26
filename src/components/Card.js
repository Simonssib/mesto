export default class Card {
    constructor({ name, link, likes, _id, owner },
        cardSelector,
        userId,
        handleCardClick,
        handleDeleteIconClick,
        setLike,
        removeLike
    ) {
        this._title = name;
        this._image = link;
        this._likes = likes;
        this._id = _id;
        this._owner = owner;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._countLike = this._likes.length;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._setLike = setLike;
        this._removeLike = removeLike;
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
        this._imageCard = this._element.querySelector('.elements__photo');
        this._buttonLike = this._element.querySelector('.elements__button-like');
        this._likeCount = this._element.querySelector('.elements__number-like');
        this._imageCard.src = this._image;
        this._imageCard.alt = this._title;
        this._setEventListeners();
        this._element.querySelector('.elements__paragraph').textContent = this._title;
        this._likeCount.textContent = this._likes.length;

        if (this._owner._id !== this._userId) {
            this._element.querySelector('.elements__button-delete').remove();
        }

        if (this._likes.some((likeAuthor) => likeAuthor._id === this._userId)) {
            this._buttonLike.classList.add('elements__button-like_active');
        }

        return this._element;
    }

    handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
            this._handleDeleteIconClick(this);
        });

        this._element.querySelector('.elements__button-like').addEventListener('click', (evt) => {
            if (!evt.target.classList.contains('elements__button-like_active')) {
                this._setLike(this._id, evt, this._countLike);
                this._countLike += 1;
            } else {
                this._removeLike(this._id, evt, this._countLike);
                this._countLike -= 1;
            }
        });

        this._element.querySelector('.elements__photo').addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        });
    }
}