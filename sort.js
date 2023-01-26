// const arr = [2, 1, 3, 10];

// arr.sort((a, b) => {
//     return b - a
// })

// console.log(arr)

function foo(a, b) {
    return bar(a, b);
}

function bar(a, b) {
    return a + b;
}

console.log(foo(1, 2))