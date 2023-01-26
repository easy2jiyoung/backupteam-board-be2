// const arr = [2, 1, 3, 10];

// arr.sort((a, b) => {
//     return b - a
// })

// console.log(arr)

// function foo(a, b) {
//     return bar(a, b);
// }

// function bar(a, b) {
//     return a + b;
// }

// console.log(foo(1, 2))

// const currentPage = 1
// const pageCount = 3

// let pageGroup = Math.ceil(currentPage / pageCount) // 1

const pageGroup = 1
const pageCount = 3
const totalPage = Math.ceil(movies.length / 4)

let lastNumber = pageGroup * pageCount // 3
if (lastNumber > totalPage) {
  lastNumber = totalPage
}
let firstNumber = lastNumber - (pageCount - 1) // 1

const next = lastNumber + 1 // 6
const prev = firstNumber - 1 // 0

// 1~5만큼 페이지네이션 그려줌
for (let i = firstNumber; i <= lastNumber; i++) {
  html += `<button class="pageNumber" id="page_${i}">${i}</button>`
}