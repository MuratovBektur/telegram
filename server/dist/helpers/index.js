export default {
    randomNumber(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },
    isObject(v) {
        return !!v && typeof v === 'object' && !Array.isArray(v);
    }
};
