function error(message, code) {
  const e = new Error(message);

  if (code) {
    e.status = code; // <--- Cambia statusCode a status
  }

  return e;
}

export default error;
