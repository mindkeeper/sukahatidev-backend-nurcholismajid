const sendResponse = {
  success: (res, status, data) => {
    const response = {
      status: status,
      message: "Success",
      data: data || null,
    };
    return res.status(status).json(response);
  },
  clientError: {
    badRequest: (res, message = "Bad Request") => {
      return res.status(400).json({
        status: 400,
        message: message,
      });
    },
    unauthorized: (res, message = "Unauthorized") => {
      return res.status(401).json({
        status: 401,
        message: message,
      });
    },
    forbidden: (res, message = "Forbidden") => {
      return res.status(403).json({
        status: 403,
        message: message,
      });
    },
    notFound: (res, message = "Not Found") => {
      return res.status(404).json({
        status: 404,
        message: message,
      });
    },
  },
  serverError: {
    internalServerError: (res, message = "Internal Server Error") => {
      return res.status(500).json({
        status: 500,
        message: message,
      });
    },
  },
};

const responseMiddleware = (req, res, next) => {
  res.sendSuccess = (status, data) => {
    sendResponse.success(res, status, data);
  };

  res.sendClientError = (status, message) => {
    switch (status) {
      case 400:
        sendResponse.clientError.badRequest(res, message);
        break;
      case 401:
        sendResponse.clientError.unauthorized(res, message);
        break;
      case 403:
        sendResponse.clientError.forbidden(res, message);
        break;
      case 404:
        sendResponse.clientError.notFound(res, message);
        break;
      default:
        sendResponse.clientError.badRequest(res, message);
    }
  };

  res.sendServerError = (message = "Internal Server Error") => {
    sendResponse.serverError.internalServerError(res, message);
  };

  next();
};

module.exports = responseMiddleware;
