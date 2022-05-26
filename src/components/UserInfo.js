export default class UserInfo {
    constructor({ nameSelector, professionSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._profession = document.querySelector(professionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const dataUser = {
            name: this._name.textContent,
            about: this._profession.textContent,
            avatar: this._avatar.src
        };
        return dataUser;
    }

    setUserInfo(userData) {
        this._name.textContent = userData.name;
        this._profession.textContent = userData.about;
        this._avatar.src = userData.avatar;
        this._id = userData._id;
    }
}
/*
    setUserAvatar(userData) {
        this._avatar.src = userData.avatar || userData.link;
    }
}
*/