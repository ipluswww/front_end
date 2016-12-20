class LocalStorageService {
  constructor($window) {
    this._$window = $window;
  }

  clear() {
      this._$window.localStorage.clear();
  }

  get(key) {
    let value = this._$window.localStorage.getItem(key);
    return value && JSON.parse(value);
  }

  remove(key) {
    this._$window.localStorage.removeItem(key);
  }

  set(key,value) {
    this._$window.localStorage.setItem(key, JSON.stringify(value));
  }
}


LocalStorageService.$inject = [ '$window'];
export default LocalStorageService;
