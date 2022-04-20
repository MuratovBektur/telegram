export default {
    randomNumber(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },
    isObject(v) {
        return Object.prototype.toString.call(v) === "[object Object]";
    },
};
