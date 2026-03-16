// src/utils/StatusCode.js
class StatusCode {
  static messages = {
    200: "Success",
    201: "Created successfully",
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
    422: "Unprocessable entity",
    500: "Internal server error",
  };

  static getMessage(code, customMessage) {
    // Use customMessage if provided, else fallback to default
    return customMessage || StatusCode.messages[code] || "Unknown error";
  }
}

export default StatusCode;
