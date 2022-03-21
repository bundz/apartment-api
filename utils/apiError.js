class ApiError extends Error {
  constructor(status, message, data) {
    super(message);
    this.status = status;
    this.data = data;
  }

  static badRequest(message, data) {
    return new ApiError(400, message, data);
  }

  static Unauthorized(message, data) {
    return new ApiError(401, message, data);
  }

  static Forbidden(message, data) {
    return new ApiError(403, message, data);
  }

  static notFound(message, data) {
    return new ApiError(404, message, data);
  }
}

module.exports = ApiError;
