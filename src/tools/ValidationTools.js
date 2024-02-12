export default function assert(valid, message) {
    if(!valid) {
        throw new Error(message);
    }
}
