import { keys } from '../../../constants/LangKeys';

const CNBaseInterpreatations = {};

CNBaseInterpreatations[keys.INTERPRETER] = function (subject, context, interpret, ...rest) {
    let inContextOf = !!context ? `在此背景下${context}是` : '';
    let interpretedContext = ((rest && (rest.length > 0)) ? interpret(...rest) : '返回结果。');
    return `${subject}的解释${inContextOf}${interpretedContext}`;
};

CNBaseInterpreatations[keys.ERROR_CANNOT_INSTANTIATE_TWICE] = (subject) => {
    return `发生错误: ${subject}不能被实例化两次。`;
};

export default CNBaseInterpreatations;