import {
    calculateAverage,
    calculateStandardDeviation,
    sumArray
} from '../../tools/MathTools'

describe('MathTools.calculateAverage() calculate expected values.', () => {
    test('calculateAverage calculates average for valid numeric array.', () => {
        expect(calculateAverage([0,1,2,4,8])).toEqual(3);
    });

    test('calculateAverage calculates average for [0].', () => {
        expect(calculateAverage([0])).toEqual(0);
    });

    test('calculateAverage calculates average for empty array', () => {
        expect(calculateAverage([])).toEqual(0);
    });
    
});

describe('MathTools.calculateStandardDeviation() calculate expected values.', () => {
    test('calculateStandardDeviation calculates std for valid numeric array.', () => {
        expect(calculateStandardDeviation([8,16,8,16])).toEqual(4);
    });

    test('calculateStandardDeviation calculates std for [0].', () => {
        expect(calculateStandardDeviation([0])).toEqual(0);
    });

    test('calculateStandardDeviation calculates std for empty array', () => {
        expect(calculateStandardDeviation([])).toEqual(0);
    });
    
});

describe('MathTools.sumArray() calculate expected values.', () => {
    test('sumArray calculates sum for valid numeric array.', () => {
        expect(sumArray([0,1,2,4,8])).toEqual(15);
    });

    test('sumArray calculates sum for [0].', () => {
        expect(sumArray([0])).toEqual(0);
    });

    test('sumArray calculates sum for empty array', () => {
        expect(sumArray([])).toEqual(0);
    });
    
});
