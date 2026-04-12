module.exports = (req, res, next) => {
  const clean = (obj) => {
    if (!obj || typeof obj !== "object") return;
    for (const key in obj) {
      if (key.includes("$") || key.includes(".")) delete obj[key];
      else clean(obj[key]);
    }
  };

  clean(req.body);
  clean(req.query);
  clean(req.params);

  next();
};