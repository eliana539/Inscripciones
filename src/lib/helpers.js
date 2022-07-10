const bcrypt = require('bcryptjs');
const helpers ={};

helpers.encryptContrasenia = async(contrasenia)=>{
    const salt= await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(contrasenia, salt); 
    console.log(hash);
    return hash; 
};

helpers.compararContrasenia= async(contrasenia, savedcontrasenia ) =>{try {
    return await  bcrypt.compare(contrasenia, savedcontrasenia);
} catch (e) {
    console.log(e);
    
}

};

module.exports= helpers; 