// 4. Security: Input Validation & Sanitization Middleware
const sanitizeString = (val) => (typeof val === 'string' ? val.trim().replace(/[<>]/g, '') : val);

const validateBody = (requiredFields = []) => {
  return (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
      for (const key of Object.keys(req.body)) {
        if (typeof req.body[key] === 'string') {
          req.body[key] = sanitizeString(req.body[key]);
        }
      }
    }
    const missing = requiredFields.filter((field) => !req.body || req.body[field] === undefined || req.body[field] === '');
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`
      });
    }
    next();
  };
};

module.exports = { validateBody };
