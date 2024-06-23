export const sanitizeParams = (req, res, next) => {
    const { word } = req.params;
    if (/^[a-zA-Z0-9-]+$/.test(word)) {
      next();
    } else {
      res.status(400).json({
        error: "Invalid parameter. Special characters are not allowed.",
      });
    }
  };