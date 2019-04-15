/**
 * A better `typeof`
 * @param {Any} any
 * @return {String} type name
 */
const typeOf = any => Object.prototype.toString.call(any).slice(8, -1).toLowerCase()
export default typeOf
