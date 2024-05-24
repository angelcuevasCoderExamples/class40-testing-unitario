const chai = require('chai');
const UserDTO = require('../../dto/User.dto');
const expect = chai.expect; 

describe('Users.dto Tests', ()=>{

    before(()=>{
        this.mockUser = {
            first_name: "johh",
            last_name: "doe",
            email: "jd@email.com",
            password: "1234",
            role: "user"
        }
    })

    it('Por parte del DTO de usuario: Corroborar que el DTO unifique el nombre y apellido en una única propiedad. (Recuerda que puedes evaluar múltiples expects)', async ()=>{
        const dtoInstance = UserDTO.getUserTokenFrom(this.mockUser);
        expect(dtoInstance.name).to.includes(this.mockUser.first_name);
        expect(dtoInstance.name).to.includes(this.mockUser.last_name);

        //otra alternativa 
        const inputUser = {
            first_name: 'David',
            last_name: 'Gonzalez',
            role: 'admin',
            email: 'email@mail.com',
        };

        const expectedDTO = {
            name: 'David Gonzalez',
            role: 'admin',
            email: 'email@mail.com',
        };

        
        const result = UserDTO.getUserTokenFrom(inputUser);
        expect(result).to.be.deep.equal(expectedDTO);
    })
    it('Por parte del DTO de usuario: El DTO debe eliminar las propiedades innecesarias como password, first_name, last_name.', async ()=>{
        const dtoInstance = UserDTO.getUserTokenFrom(this.mockUser);
        expect(dtoInstance).not.to.have.property('password')
        expect(dtoInstance).not.to.have.property('first_name')
        expect(dtoInstance).not.to.have.property('last_name')
    })

})