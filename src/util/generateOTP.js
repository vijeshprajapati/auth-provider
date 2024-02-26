const generateOTP = async() =>{
    try {
        return (otp = `${Math.floor(100000 + Math.random() * 999999)}`);
    } catch (error) {
        throw error;
    }
};

module.exports = generateOTP;