/*
// 부가세 계산 양식 원본
const price = 10000 // 소비자가격
const priceKrw = new Intl.NumberFormat('kr-KO', { style: 'currency', currency: 'KRW' }).format(price)
let tax = price / 11 * 10
tax = Math.round(tax)
tax = new Intl.NumberFormat('kr-KO', { style: 'currency', currency: 'KRW' }).format(tax)
tax = tax
let originalPrice = price / 11
originalPrice =  Math.round(originalPrice)
originalPrice = new Intl.NumberFormat('kr-KO', { style: 'currency', currency: 'KRW' }).format(originalPrice)
originalPrice = originalPrice
*/

/*
// 부가세 함수 줄이기 전
const curByCountry = {
    en: {
        format: "en-Us",
        currency: "USD",
    },
    kr: {
        format: "kr-Ko",
        currency: "KRW"
    }
}

const allPrice = ((price, country) => {
    const countryCode = country || "kr"
    const cur = curByCountry[countryCode]
    // console.log(cur)
    const total =  new Intl.NumberFormat(cur.format, { style: 'currency', currency: cur.currency }).format(price)
    
    let supplied = price / 11 * 10
    supplied = Math.round(supplied)
    supplied = new Intl.NumberFormat(cur.format , { style: 'currency', currency: cur.currency }).format(supplied)
    
    let surTax = price / 11
    surTax =  Math.round(surTax)
    surTax = new Intl.NumberFormat(cur.format , { style: 'currency', currency: cur.currency }).format(surTax)

    return {
        total: total,
        supplyPrice: supplied,
        surTax: surTax,
    }
})

console.log(allPrice(10000, "en"))
console.log(allPrice(10000))
*/

// 부가세 함수 줄인 것
const curByCountry = {
    en: {
        format: "en-Us",
        currency: "USD",
    },
    kr: {
        format: "kr-Ko",
        currency: "KRW"
    }
}
const currencySymbol = ((number, countryCode) => {
    const cur = curByCountry[countryCode]
    return new Intl.NumberFormat(cur.format, { style: 'currency', currency: cur.currency }).format(number)
})

const allPrice = ((price, country) => {
    const countryCode = country || "kr"
    return {
        total: currencySymbol(price, countryCode),
        supplyPrice: currencySymbol(Math.round(price / 11 * 10), countryCode),
        surTax: currencySymbol(Math.round(price / 11), countryCode)
    }  
})

console.log(allPrice(10000, "en"))
console.log(allPrice(10000))


// 부가세 및 공급가액만 따로 뽑기
/*
1. 함수 인자 추가 (실패)
2. return값을 배열로 뽑아서 중첩함수 사용 (실패-어떤 조건을 붙여야 하는지 모르겠음)
*/

// const curByCountry = {
//     en: {
//         format: "en-Us",
//         currency: "USD",
//     },
//     kr: {
//         format: "kr-Ko",
//         currency: "KRW"
//     }
// }

// const currencySymbol = ((number, countryCode) => {
//     const cur = curByCountry[countryCode]
//     return new Intl.NumberFormat(cur.format, { style: 'currency', currency: cur.currency }).format(number)
// })

// // console.log(currencySymbol(10000, "kr"))

// const allPrice = ((price, country) => {
//     const countryCode = country || "kr"
//     return {
//         total: currencySymbol(price, countryCode),
//         supplyPrice: currencySymbol(Math.round(price / 11 * 10), countryCode),
//         surTax: currencySymbol(Math.round(price / 11), countryCode),
//     }
// })

// console.log(allPrice(10000, "kr"))
// console.log(allPrice(10000).total)

// const divideReturn = allPrice(10000)

// console.log(divideReturn.total)


