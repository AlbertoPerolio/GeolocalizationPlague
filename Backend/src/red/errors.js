import * as answer from "./answer.js";

function errors(err, req, res, next) {
  console.error("[error]", err);

  const message = err.message || "Inside error";
  const status = err.statusCode || err.status || 500;

  answer.error(req, res, message, status);
}

export default errors;
