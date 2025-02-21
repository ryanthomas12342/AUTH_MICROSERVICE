class AppError extends Error {
  constructor(explanation, code) {
    super(explanation);
    (this.explanation = explanation), (this.statusCode = code);
  }
}

module.exports = AppError;
