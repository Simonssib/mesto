export default class Card {
    constructor({ name, link, likes, _id, owner },
        cardSelector,
        userId,
        handleCardClick,
        handleDeleteIconClick,
        api
    ) {
        this._title = name;
        this._image = link;
        this._likes = likes;
        this._id = _id;
        this._owner = owner;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._countLike = this._likes.length;
        this._api = api;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
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


    removeLike(id) {
        this._api.removeLike(id)
            .then((res) => {
                return res.likes.length
            })
            .then((count) => {
                this._likeCount.textContent = count;
            })
            .then(() => {
                this._buttonLike.classList.remove('elements__button-like_active');
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    };

    setLike(id) {
        this._api.setLike(id)
            .then((res) => {
                return res.likes.length;
            })
            .then((count) => {
                this._likeCount.textContent = count;
            })
            .then(() => {
                this._buttonLike.classList.add('elements__button-like_active');
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }

    _setEventListeners() {
        this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
            this._handleDeleteIconClick(this);
        });

        this._element.querySelector('.elements__button-like').addEventListener('click', (evt) => {
            if (!evt.target.classList.contains('elements__button-like_active')) {
                this.setLike(this._id);

            } else {
                this.removeLike(this._id);

            }
        });

        this._element.querySelector('.elements__photo').addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        });
    }
}