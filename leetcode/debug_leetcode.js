/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (n === 0) return 1;

    const getAbsPow = (x, pow) => {
        if (pow === 0) return 1;
        if (pow === 1) return x;

        return getAbsPow(x * x, Math.floor(pow / 2)) * getAbsPow(x, pow % 2)
    }

    return getAbsPow((n > 0) ? x : 1 / x, Math.abs(n));
};

const executionStart = Date.now();

//----------------------------------------------------------

const x = 2.00000, n = 10

const result = myPow(x, n);
console.log(result);

//----------------------------------------------------------

const executionEnd = Date.now();
console.log(`Execution Time: ${(executionEnd - executionStart)} ms`);
