function assert(valid, message) {
    if(!valid) {
        throw new Error(message);
    }
}

function validateNumericArray(numbers) {
    assert(Array.isArray(numbers), `Numeric array "${numbers}" must be array.`);
    numbers.forEach(number => {
        assert(!isNaN(Number.parseFloat(number)), `Element of numeric array "${number}" must be a number.`);
    });
}

export { assert, validateNumericArray }