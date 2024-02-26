const bcrypt = require('bcrypt');

const hashData = async(data, salt = 10) => {
        try {
            const hashedData = await bcrypt.hash(data, salt);
            return hashedData;
        } catch (error) {
            throw error;
        }
};

module.exports = hashData;