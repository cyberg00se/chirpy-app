const crypto = require("crypto");

function encrypt(key, data) {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");

    let tag = cipher.getAuthTag();
    encrypted += "," + iv.toString("hex") + "," + tag.toString("hex");
    return encrypted;
}
function decrypt(key, data) {
    const encrypted = data.split(",");
    const iv = Buffer.from(encrypted[1], "hex");
    const tag = Buffer.from(encrypted[2], "hex");

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encrypted[0], "hex", "binary");
    decrypted += decipher.final();

    return decrypted;
}

module.exports = {
    encrypt,
    decrypt
}