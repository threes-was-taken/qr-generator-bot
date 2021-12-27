const validUrl = require('valid-url');

exports.checkUri = (urlString) => validUrl.isUri(urlString);