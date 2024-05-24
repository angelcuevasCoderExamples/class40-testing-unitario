const Assert = require('assert');
const pow = require('../pow');
const assert = Assert; 

describe('Pow function tests', ()=>{
    it('2 elevado a la potencia de 3 debería ser 8', function(){
        const result = pow(2,3);
        assert.equal(result, 8)
    })
    it('3 elevado a la potencia de 3 debería ser 27', function(){
        const result = pow(3,3);
        assert.equal(result, 27)
        
    })
})