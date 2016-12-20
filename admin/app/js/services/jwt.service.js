class JWT {
  constructor(AppConstants, LocalStorageService) {
    this._AppConstants = AppConstants;
    this._LocalStorageService = LocalStorageService;
  }

  save(token) {
    this._LocalStorageService.set(this._AppConstants.jwtKey,token);
  }

  get() {
    return this._LocalStorageService.get(this._AppConstants.jwtKey);
  }

  destroy() {
    this._LocalStorageService.remove(this._AppConstants.jwtKey);
  }
}


JWT.$inject = ['AppConstants', 'LocalStorageService'];
export default JWT;
