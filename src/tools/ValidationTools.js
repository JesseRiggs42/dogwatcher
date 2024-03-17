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
    assertIsString(string, elementName, context);
    assert(string !== '', `Element "${elementName}" cannot be empty.`);
}

function assertIsDefinedNotNull(element, elementName, context) {
    assert(typeof(element) !== 'undefined', `Element "${elementName}" in "${context}" is expected to be defined.`);
    assert(element !== null, `Element "${elementName}" in "${context}" is expected to be non-null`);
}

function assertIsFunction(func, functionName, context) {
    assertIsDefinedNotNull(func, functionName, context);
    assert(typeof(func) === 'function', `"${functionName}" is expected to be of type "function" but is "${typeof(func)}".`);
}

function assertIsNumber(number, numberName, context) {
    assertIsDefinedNotNull(number, numberName, context);
    assert(!isNaN(Number.parseInt(number)), `"${numberName}" is expected to be a number in "${context}".`);
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

function assertIsString(string, stringName, context) {
    assertIsDefinedNotNull(string, stringName, context);
    assert(typeof(string) === 'string', `"${stringName}" in "${context}" is expected to be of type "string" but is "${typeof(string)}".`);
}

function assertIsSupported(supported, optionName, context) {
    if(!supported) {
        throw new Error(`Error: "${optionName}" is not supported by "${context}".`);
    }
}

function assertIsValid(valid, subject, description) {
    if(!valid) {
        throw new Error(`Could not validate "${subject}": ${description}`);
    }
}

function assertNotInstantiated(object, objName) {
    assert(object === undefined || object === null, `Error: "${objName}" cannot be instantiated twice.`);
}

export {
    assert,
    assertIsBoolean,
    assertIsDefinedNotNull,
    assertIsFunction,
    assertIsNumber,
    assertIsNumericArray,
    assertIsString,
    assertIsStringArray,
    assertIsSupported,
    assertIsValid,
    assertNonEmptyString,
    assertNotInstantiated
}
