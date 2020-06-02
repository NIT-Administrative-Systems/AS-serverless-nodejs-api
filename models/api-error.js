class ApiError {
  constructor(params) {
    this.id = params.id;
    this.links = params.links;
    this.status = params.status.toString();
    this.code = params.code;
    this.title = params.title;
    this.detail = params.detail;

    this.links = {
      ...params.links,
      about: (params.links || {}).about || '#',
    };

    // this._source
    // this._meta
  }
}

module.exports = { ApiError };
