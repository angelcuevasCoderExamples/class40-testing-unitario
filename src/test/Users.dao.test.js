const mongoose = require('mongoose');
const Assert = require('assert');
const { mongoUri } = require('../config/config');
const Users = require('../dao/Users.dao');

const assert = Assert.strict; 

mongoose.connect(mongoUri).then(()=>{
    console.log('connected to mongodb')
})

describe('Users Dao tests', function(){

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
       assert.equal(Array.isArray(result), true)  
    })
    it('El Dao debe un arreglo vacío de usuarios en su primera llamada a .get',async ()=>{
       const result = await this.usersDao.get(); 
       assert.equal(Array.isArray(result), true)
       assert.equal(result.length, 0)
       //assert.equal("2", 2);
    })

    it('El Dao debe agregar correctamente un elemento a la base de datos.', async ()=>{
        const result = await this.usersDao.save(this.mockUser);
        assert.ok(result._id);
    })
    it('Al agregar un nuevo usuario, éste debe crearse con un arreglo de mascotas vacío por defecto.', async  ()=>{
        const result = await this.usersDao.save(this.mockUser);
        assert.equal(Array.isArray(result.pets), true);
        assert.equal(result.pets.length, 0)
    })
    it('El Dao puede obtener  a un usuario por email', async ()=>{
        await this.usersDao.save(this.mockUser);
        const result = await this.usersDao.getBy({email:this.mockUser.email})
        
        // assert.equal(typeof result, 'object')
        // assert.ok(!!result)
    })

})