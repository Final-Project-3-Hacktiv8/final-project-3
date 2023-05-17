const bcrypt = require('bcryptjs');
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

// const hashPassword = (password) => {
//     const salt = 10;
//     bcrypt.hash(password, salt)
//     .then(hash => {
//         return hash;
//     }).catch(err => {
//         console.log(err);
//     })
// }

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {hashPassword, comparePassword}