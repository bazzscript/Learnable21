var assert = require('assert');




describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
        });
    });
});

describe('Math', function () {
    it('should test if 3*3 equals 9', function () {
        assert.equal(9, 3 * 3);
    });

    it('Should test if (3–4)*8 equals -8', function () {
        assert.equal(-8, (3 - 4) * 8);
    });
})