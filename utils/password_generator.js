

function generatePassword() {
    var password = "";
    var passwordLength = 8;
    var passwordCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*?";
    for (var i = 0; i < passwordLength; i++) {
        var randomIndex = Math.floor(Math.random() * passwordCharset.length);
        password += passwordCharset.charAt(randomIndex);
    }
    return password;
}


module.exports = generatePassword;