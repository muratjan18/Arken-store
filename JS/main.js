localStorage.removeItem('cart')
let btns = document.querySelectorAll('.btns')
let gridItems = document.querySelectorAll('.product-grid-item')
let productGrid = document.querySelector('.product-grid')
for (let btn of btns) {
    btn.addEventListener('click', function (e) {
        for (let b of btns) {
            b.classList.remove('active')
        }
        btn.classList.add('active')
        document.querySelectorAll('.np').forEach(b=>b.classList.remove('act'))
        filterProducts()
    })
}
let actClasses = document.querySelectorAll('.np')

for(let elem of actClasses){
    elem.addEventListener('click', function(e){
        for(let b of actClasses){
            b.classList.remove('act')
        }
        elem.classList.add('act')
        document.querySelectorAll('.btns').forEach(b=>b.classList.remove('active'))
        filterProducts()
    })
}

// от 60 до 90 - женское
// от 100 - мужское
// до 50 - детское
function filterProducts(e) {
    // let prodc = document.querySelector('product-grid-item[value="22"]')
    //     console.log(prodc)
    let activeBtn = document.querySelector('.about-buttons .active')|| document.querySelector('.nav-left .act')
    console.log('activeBtn: ', activeBtn)
    console.log('value: ', activeBtn?.value)
    if(!activeBtn){
        return
    }
    if (activeBtn.value == 'women') {
        for (let elem of gridItems) {
            let price = parseInt(elem.getAttribute('value'))
            if (price > 59 && price < 90) {
                let visible = document.querySelectorAll('.product-grid-item[style="display: block;"]').length
                document.querySelector('.product-title').innerHTML = visible + ' товаров'
                console.log(price)
                elem.style.display = 'block'
            } else {
                elem.style.display = 'none'
            }
        }
    }
    if (activeBtn.value == 'men') {
        for (let elem of gridItems) {
            let price = parseInt(elem.getAttribute('value'))
            if (price > 100) {
                let visible = document.querySelectorAll('.product-grid-item[style="display: block;"]').length
                document.querySelector('.product-title').innerHTML = visible + ' товаров'
                // document.querySelector('.product-title').textContent = '3 товаров'
                console.log(price)
                elem.style.display = 'block'
            } else {
                elem.style.display = 'none'
            }
        }
    }
    if (activeBtn.value == 'baby') {
        for (let elem of gridItems) {
            let price = parseInt(elem.getAttribute('value'))
            if (price < 50) {
                // let visible = document.querySelectorAll('.product-grid-item[style="display: block;"]').length
                // document.querySelector('.product-title').innerHTML = visible + ' товаров'
                document.querySelector('.product-title').textContent = '2 товаров'
                console.log(price)
                elem.style.display = 'block'
            } else {
                elem.style.display = 'none'
            }
        }
    }
    if (activeBtn.value == 'all') {
        for (let elem of gridItems) {
            let price = parseInt(elem.getAttribute('value'))
            if (price) {
                document.querySelector('.product-title').textContent = '12 товаров'
                console.log(price)
                elem.style.display = 'block'
            }
        }
    }


}
filterProducts()


let selectt = document.querySelector('#myselect1')
let selectItems = [...selectt]
function sortedProducts(e) {
    let aaprice = Array.from(gridItems)
    // for(let elem of aaprice){
    // let price = parseInt(elem.getAttribute('value'))
    // aaprice.push(price)
    if (selectt.value === 'sm-item') {
        aaprice.sort((a, b) => {
            let priceA = parseInt(a.getAttribute('value'))
            let priceB = parseInt(b.getAttribute('value'))
            return priceA - priceB
        })
        productGrid.innerHTML = ''
        for (let elem of aaprice) {
            productGrid.append(elem)
        }
    }
    if (selectt.value === 'bg-item') {
        aaprice.sort((a, b) => {
            let priceA = parseInt(a.getAttribute('value'))
            let priceB = parseInt(b.getAttribute('value'))
            return priceB - priceA
        })
        productGrid.innerHTML = ''
        for (let elem of aaprice) {
            productGrid.append(elem)
        }

    }
    if (selectt.value === 'def-item') {
        return
    }
}
sortedProducts()
selectt.addEventListener('change', function (e) {
    sortedProducts()
})

let input = document.querySelector('.poisk')
input.oninput = function (e) {
    poiskk()
}
function poiskk(e) {
    let arr = Array.from(gridItems)
    for (let elem of arr) {
        let name = elem.querySelector('p').textContent.toLowerCase()
        let query = input.value.toLowerCase()
        if (name.includes(query)) {
            elem.style.display = 'block'
        }
        else {
            elem.style.display = 'none'
        }
    }
}
poiskk()


let ddact = document.querySelectorAll('.ddact')
let dfd = Array.from(ddact)
productGrid.addEventListener('mouseover', function(e){
    let item = e.target.closest('.product-grid-item')
    item.querySelector('.ddact').style.display = 'flex'
    if(!item){
        return
    }
    
})
productGrid.addEventListener('mouseout', function(e){
    let item = e.target.closest('.product-grid-item')
    item.querySelector('.ddact').style.display = 'flex'
    if(!item){
        return
    }
})



let prplus = document.querySelectorAll('.prplus')
let prmin = document.querySelectorAll('.prmin')
let price = document.querySelectorAll('.price')
let pls = Array.from(prplus)
let count = 1



let total = 0
let allobjct = {}
productGrid.addEventListener('click', function(e){
    let item = e.target.closest('.product-grid-item')
    if(!item) return
    let span = item.querySelector('.price')
    let count = parseInt(span.textContent)
    let korzBtn = document.querySelector('.korz__btn')
    let korZzz = document.querySelector('.korZzz')
    if(e.target.classList.contains('prplus')){
        count++
        span.textContent = count + ' товаров'
        total++
    }
    if(e.target.classList.contains('prmin')){
        count--
        span.textContent = count + ' товаров'
        total--
    }
    if(count<0){
        count = 0
        span.textContent = count + ' товаров'
    }
    if(count>0){
        korzBtn.style.display = 'block'
        korZzz.innerHTML = total
    } else{
        korzBtn.style.display = 'none'
    }
    // console.log(total)
    let objid = item.dataset.id
    if(allobjct[objid]){
        allobjct[objid].count++
    } else{
        allobjct[objid] = {
            id: objid,
            name: item.dataset.name,
            price: item.dataset.price,
            img: item.dataset.img,
            count: 1
        }
    }
    let arrayobjj = Object.values(allobjct)
    // console.log(arrayobjj)
    localStorage.setItem('cart', JSON.stringify(arrayobjj))
    renderCart()
})

function renderCart(e){
    let getcart = localStorage.getItem('cart')
    let cart = getcart ?
    JSON.parse(getcart) : []
    let grid = document.querySelector('.korzinGrid')
    if(!grid){
        console.log('Элемента нет')
        return
    }
    grid.innerHTML = '';
    if(cart.length === 0){
        grid.innerHTML = `
        <h1>Корзина пуста</h1>`
        return
    }
    for(let item of cart){
        grid.innerHTML += `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.img}" alt="${item.name}">
            <p>${item.name}</p>
            <p>${item.price} ₽ * ${item.count}</p>
            <p>Итого: ${item.price * item.count} ₽<p>
        </div>`
    }
} 
renderCart()

let filterToggle = document.getElementById('filterToggle')
let filterPanel = document.getElementById('filterPanel')
filterToggle.addEventListener('click', function(e){
    filterPanel.classList.toggle('open')
    let span = this.querySelector('span')
    if(filterPanel.classList.contains('open')){
        filterPanel.style.display = 'block'
    } else{
        filterPanel.style.display = 'none'
    }
})