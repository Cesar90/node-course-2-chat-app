const expect = require('expect');

//import isRealString
const {isRealString} = require('./validation');

//isRealString
//Should reject non-string values
//Should allow string with non-space characters

describe('isRealString', () => {
    it('Should reject non-string value', () =>{
        var res = isRealString(98); 
        expect(res).toBe(false);
    });
    
    it('should reject string with only space', () => {
       var res = isRealString(' ');
       expect(res).toBe(false);
    });
    
    it('Should allow string with non-space characters', () => {
        var res = isRealString(' Andrew ');
        expect(res).toBe(true);
    });
});;