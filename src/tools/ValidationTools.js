// TODO: MOST OF THESE FUNCTIONS ARE UNTESTED

function assert(valid, message) {
    if(!valid) {
        throw new Error(message);
    }
}

function assertIsBoolean(boolean, elementName, context) {
    assert(boolean !== null, `Element "${elementName}" in "${context}" is expected to be non-null`);
    assert(typeof(boolean) === 'boolean', `Element "${elementName}" in "${context}" is expected to be of type "boolean" but is "${typeof(boolean)}".`);
}

function assertNonEmptyString(string, elementName, context) {
    assert(typeof(string) === 'string', `Element "${elementName}" in "${context}" is expected to be of type "string" but is "${typeof(string)}".`);
    assert(string !== '', `Element "${elementName}" cannot be empty.`);
}

function assertIsDefinedNotNull(element, elementName, context) {
    assert(typeof(element) !== 'undefined', `Element "${elementName}" in "${context}" is expected to be defined.`);
    assert(element !== null, `Element "${elementName}" in "${context}" is expected to be non-null`);
}

function assertIsNumericArray(numbers, arrayName, context) {
    assertIsDefinedNotNull(numbers, arrayName, context);
    assert(Array.isArray(numbers), `Numeric array "${arrayName}" in "${context}" must be array.`);
    numbers.forEach(number => {
        assert(!isNaN(Number.parseFloat(number)), `Element of numeric array "${arrayName}" in "${context}" must be a number.`);
    });
}

function assertIsStringArray(stringArray, arrayName, context) {
    assertIsDefinedNotNull(stringArray, arrayName, context);
    assert(Array.isArray(stringArray), `Element "${arrayName}" in "${context}" is expected to be of type "array" but is "${typeof(stringArray)}".`);
    stringArray.forEach(string => {
        assert(typeof(string) === 'string', `Element "${string}" of String Array "${arrayName}" in "${context}" is expected to be of type "string" but is "${typeof(string)}".`);
    });
}

function assertNotInstantiated(object, objName) {
    assert(object === undefined || object === null, `Error: "${objName}" cannot be instantiated twice.`);
}

export { assert, assertIsBoolean, assertIsDefinedNotNull, assertIsNumericArray, assertIsStringArray, assertNonEmptyString, assertNotInstantiated }