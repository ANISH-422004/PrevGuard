const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 5-digit random number
    return code;
}
module.exports = generateVerificationCode;