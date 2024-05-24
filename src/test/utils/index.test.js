const chai = require('chai');
const { createHash, passwordValidation } = require('../../utils');
const expect = chai.expect; 

describe('Utils.js Tests', ()=>{

    it('El servicio debe realizar un hasheo efectivo de la contraseña (debe corroborarse que el resultado sea diferente a la contraseña original', async ()=>{
        const originalPassword = "1234";
        const hashedPassword = await createHash(originalPassword)

        expect(hashedPassword).not.to.be.equal(originalPassword)
    })
    it('El hasheo realizado debe poder compararse de manera efectiva con la contraseña original (la comparación debe resultar en true)',async ()=>{
        const originalPassword = "1234";
        const hashedPassword = await createHash(originalPassword)
        const isSamePassword = await passwordValidation({password: hashedPassword}, originalPassword)
        expect(isSamePassword).to.be.equal(true)
    })
    it('Si la contraseña hasheada se altera, debe fallar en la comparación de la contraseña original.' , async()=>{
        // const originalPassword = "1234";
        // const loginInputPassword = "12345"
        // const hashedPassword = await createHash(originalPassword)
        // const isSamePassword = await passwordValidation({password: hashedPassword}, loginInputPassword)
        // expect(isSamePassword).to.be.equal(false)
        const originalPassword = "1234";
        const hashedPassword = await createHash(originalPassword)
        const alteredPassword = hashedPassword+"abc"
        const isSamePassword = await passwordValidation({password: alteredPassword}, originalPassword)
        expect(isSamePassword).to.be.equal(false)
    })
})