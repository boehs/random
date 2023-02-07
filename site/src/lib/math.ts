const symbols = ['theta', 'pi']
const fns = ['sin', 'sinh', 'cos', 'tan', 'sqrt', 'mod', 'geq', 'leq', 'log', 'ln', 'max', 'min']
const symTrans = {
    "*": "cdot",
    "/": "div",
    ">=": "ge",
    "<=": "le",
    "acos": "arccos",
    "asin": "arcsin",
    "atan": "arctan"
}
const fnSym = {
    "abs": '|'
}
 
const translate = (inp: string) => {
    inp = inp.replaceAll(new RegExp('(' + symbols.join('|') + ')','g'), '\\$1')
    inp = inp.replaceAll(new RegExp(`(${fns.join('|')})\\(([^)]*)\\)`,'g'), `\\$1{$2}`)
    Object.entries(symTrans).forEach(([b,a]) => inp = inp.replaceAll(b,'\\' + a))
    Object.entries(fnSym).forEach(([b,a]) => inp = inp.replaceAll(new RegExp(b + `\\(([^)]*)\\)`, 'g'),`${a}$1${a}`))
    console.log(inp)
    return inp
}

export default translate