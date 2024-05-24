const mongoose = require('mongoose');
const { mongoUri } = require('../../config/config');
const Users = require('../../dao/Users.dao');
const chai = require('chai')

const expect = chai.expect; 

mongoose.connect(mongoUri).then(()=>{
    console.log('connected to mongodb')
})

describe('Users Dao tests [CHAI]', function(){

    this.timeout(5000)

    before(()=>{
        this.usersDao = new Users();
        this.mockUser = {
            first_name: "johh",
            last_name: "doe",
            email: "jd@email.com",
            password: "1234",
            role: "user"
        }
    })

    beforeEach(()=>{
        mongoose.connection.collections.users.drop();
    })

    it('El Dao debe poder obtener los usuarios en formato de arreglo',async ()=>{
       const result = await this.usersDao.get(); 

       expect(result).to.deep.equal([])
       expect(Array.isArray(result)).to.equal(true)
       expect(Array.isArray(result)).to.be.ok
    })
    it('El Dao debe un arreglo vacío de usuarios en su primera llamada a .get',async ()=>{
       const result = await this.usersDao.get(); 

       expect(result.length).to.be.equal(0)

    })

    it('El Dao debe agregar correctamente un elemento a la base de datos.', async ()=>{
        const result = await this.usersDao.save(this.mockUser);
        expect(result).to.have.property('_id')
    })
    it('Al agregar un nuevo usuario, éste debe crearse con un arreglo de mascotas vacío por defecto.', async  ()=>{
        const result = await this.usersDao.save(this.mockUser);
        // assert.equal(Array.isArray(result.pets), true);
        // assert.equal(result.pets.length, 0)
        expect(result).to.have.property('pets')
        expect(result.pets).to.deep.equal([])
    })
    it('El Dao puede obtener  a un usuario por email', async ()=>{
        await this.usersDao.save(this.mockUser);
        const result = await this.usersDao.getBy({email:this.mockUser.email})
    
        expect(result).to.be.a('object')
    })

})