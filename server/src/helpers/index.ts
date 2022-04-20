export default {
  randomNumber(min: number, max: number): number {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  },
  isObject(v: any): boolean {
    return Object.prototype.toString.call(v) === "[object Object]";
  },
};
