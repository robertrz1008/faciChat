const x = [
    {id: 1, name: "jose"},
    {id: 3, name: "rober"},
    {id: 5, name: "jaul"},
    {id: 7, name: "elm"},
    {id: 9, name: "andres"},
]
const y = [
    {id: 1, name: "jose"},
    {id: 2, name: "rober"},
    {id: 5, name: "jaul"},
    {id: 6, name: "elm"},
    {id: 9, name: "andres"}
]

const newX = x.reduce((cc, el) => cc.concat(el.data), [])

console.log(newX)

