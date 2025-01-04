const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checoutBtn = document.getElementById("checout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCount = document.getElementById("cart-count")
const nameInput = document.getElementById("name")
const nameWarn = document.getElementById("name-warn")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")


let cart = [];

cartBtn.addEventListener("click", function () {
    cartModal.style.display = "flex"
    updateCartModal()
})
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
})
menu.addEventListener("click", function (event) {


    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})
function addToCart(name, price) {
    const existeItem = cart.find(item => item.name === name)

    if (existeItem) {
        existeItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModal()
}
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">${item.name}</p>
              <p>Qtd: ${item.quantity}</p>
              <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-btn" data-name="${item.name}">
            Remover
            </button>
          </div>
        `
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)
    })
    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    cartCount.innerHTML = cart.length
}
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItamCart(name)
    }
})
function removeItamCart(name) {
    const index = cart.findIndex(item => item.name === name)

    if (index !== -1) {
        const item = cart[index]
        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal()
            return
        }
        cart.splice(index, 1)
        updateCartModal()
    }
}

addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value
    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})

nameInput.addEventListener("input", function (event) {
    let inputValue = event.target.value
    if (inputValue !== "") {
        nameInput.classList.remove("border-red-500")
        nameWarn.classList.add("hidden")
    }

})

checoutBtn.addEventListener("click", function () {

    const isOpen = checoutRestauranteOpen()
    if (!isOpen) {

        Toastify({
            text: "O Restaurente está fechado!",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
    }).showToast()
     return
        }

    if (cart.length === 0) return
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return
    }

    if (cart.length === 0) return
    if (nameInput.value === "") {
        nameWarn.classList.remove("hidden")
        nameInput.classList.add("border-red-500")
        return
    }

    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantidade: (${item.quantity}) preço: R$${item.price * item.quantity} |`
        )
    }).join("")
    const menssage = encodeURIComponent(cartItems)
    const phone = "+5562981025245"
    window.open(`https://wa.me/${phone}?text=${menssage} Total: ${cartTotal.textContent} Nome: ${nameInput.value} Endereço: ${addressInput.value}`, "_blank")
    cart = []
    updateCartModal()

})
function checoutRestauranteOpen() {
    const data = new Date()
    const hora = data.getHours()
    return hora >= 8 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checoutRestauranteOpen()

if (isOpen) {
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-grenn-600")
} else {
    spanItem.classList.remove("bg-grenn-600")
    spanItem.classList.add("bg-red-500")
}