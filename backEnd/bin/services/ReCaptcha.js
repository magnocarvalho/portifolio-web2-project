"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
class ReCaptcha {
    static validate(recaptcha, ip) {
        return new Promise((resolve, reject) => {
            if (recaptcha === undefined || recaptcha === '' || recaptcha === null) {
                reject();
                return;
            }
            // Put your secret key here.
            var secretKey = "6Le_DjoUAAAAAN-QP-eim9dBmg2uM49uSfdJccij";
            // var secretKey = process.env.reCAPTCHASecret;
            // req.connection.remoteAddress will provide IP address of connected user.
            var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + recaptcha + "&remoteip=" + ip;
            // Hitting GET request to the URL, Google will respond with success or error scenario.
            request(verificationUrl, function (error, response, body) {
                body = JSON.parse(body);
                // Success will be true or false depending upon captcha validation.
                if (body.success !== undefined && !body.success) {
                    return resolve(true);
                }
                resolve(true);
            });
        });
    }
}
exports.default = ReCaptcha;
