import { keys } from '../../../constants/LangKeys';

const USBaseInterpreatations = {};

USBaseInterpreatations[keys.INTERPRETER] = function (subject, context, interpret, ...rest) {
    let inContextOf = !!context ? ` in context of ${context} is ` : '';
    let interpretedContext = ((rest && (rest.length > 0)) ? interpret(...rest) : 'return results.');
    return `Interpretation of ${subject}${inContextOf}${interpretedContext}`;
};

USBaseInterpreatations[keys.ERROR_CANNOT_INSTANTIATE_TWICE] = (subject) => {
    return `Error: ${subject} cannot be instantiated twice.`;
};

export default USBaseInterpreatations;