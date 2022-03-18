class ApiError extends Error {
  constructor(status, message, data) {
    super(message);
    this.status = status;
    this.data = data;
  }

  static Forbidden(message, data) {
    return new ApiError(401, message, data);
  }
}

module.exports = ApiError;
