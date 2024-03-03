import USBaseInterpreatations from './US/Base';
import CNBaseInterpreatations from './CH/Base';
import { CountryCodes } from '../../constants/lang/CountryCodes';

export default function (countryCode) {
    switch(countryCode) {
        case CountryCodes.US:
            return code => __getInterpretation(code, USBaseInterpreatations);
        case CountryCodes.CN:
            return code => __getInterpretation(code, CNBaseInterpreatations);
        default:
            throw new Error(`Error, country code does not exist: ${countryCode}.`);
    }
}

function __getInterpretation(code, interpretations) {
    const interpretation = interpretations[code];
    if(!interpretation) throw new Error(`Could not find interpretation for code ${code}`);
    return interpretation;
}