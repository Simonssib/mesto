export default class UserInfo {
    constructor({ name, profession }) {
        this._name = document.querySelector(name);
        this._profession = document.querySelector(profession);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            profession: this._profession.textContent,
        };
    }

    setUserInfo({ name, profession }) {
        this._name.textContent = name;
        this._profession.textContent = profession;
    }
}