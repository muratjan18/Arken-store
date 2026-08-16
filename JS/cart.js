let plus = document.querySelector('.plus')
let minus = document.querySelector('.minus')
let ccountext = document.querySelector('.ccount-text')
function renderCart(e) {
    let getcart = localStorage.getItem('cart')
    let cart = getcart ?
        JSON.parse(getcart) : []
    let grid = document.querySelector('.korzinGrid')
    if (!grid) {
        console.log('Элемента нет')
        return
    }
    grid.innerHTML = '';
    if (cart.length === 0) {
        let cartNames = document.querySelector('.cart-names')
        cartNames.style.display = 'none'
        grid.innerHTML = `
        <h1>Корзина пуста</h1>`
        let zakaz = document.querySelector('.zakaz')
    zakaz.innerHTML = ''
    zakaz.style.display = 'none'
        return
    }
    let zakaz = document.querySelector('.zakaz')
    let zakazHtml = '<p class="zakaz-title">ИТОГО</p>'
    let total = 0
    for (let item of cart) {
        grid.innerHTML += `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.img}" class="cart-img" alt="${item.name}">
            <p>${item.name}
        <br>${item.price} ₽ </p>
    <div class="cccount">
        <p class="plus">+</p>
        <p class="ccount-text">${item.count}</p>
        <p class="minus">-</p>
        </div>
        <p class="ccount-text">Итого: ${item.price * item.count} ₽<p>
            <p class="close-item"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 20 20">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></p>
        </div>`
        let itemTotal = item.price * item.count
        total += parseInt(itemTotal)
        zakazHtml += `
    <div class="ppe-prd">
      <p class="zakaz-product">${item.name} × ${item.count}</p>
      <p class="product-price">${itemTotal} ₽</p>
    </div>`
    }
    zakazHtml += `
  <hr>
  <div class="perp">
    <p>Итого</p>
    <p>${total} ₽</p>
  </div>
  <button class="registr">ОФОРМИТЬ ЗАКАЗ</button>`

zakaz.innerHTML = zakazHtml
}
renderCart()

document.querySelector('.korzinGrid').addEventListener('click', function (e) {
    if (e.target.classList.contains('plus')) {
        let indx = e.target.closest('.cart-item')
        let id = indx.dataset.id
        let cart = JSON.parse(localStorage.getItem('cart')) || []
        console.log(cart)
        let index = cart.findIndex(item =>
            item.id === id)
        console.log(index)
        console.log(cart[index])
        if (index !== -1) {
            cart[index].count += 1
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
    renderCart()
    let indx = e.target.closest('.cart-item')
    let id = indx.dataset.id
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    console.log(cart)
    let index = cart.findIndex(item =>
        item.id === id)
    console.log(index)
    console.log(cart[index])
    if (e.target.classList.contains('minus')) {
        if (index !== -1) {
            cart[index].count -= 1
            localStorage.setItem('cart', JSON.stringify(cart))
            if (cart[index].count <= 0) {
                cart.splice(index, 1)
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            renderCart()
        }
    }

    if (e.target.classList.contains('close-item')) {
        if (!e.target.classList.contains('close-item')) {
            return
        }
        cart = cart.filter(item => item.id !== id)
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    renderCart()
})
