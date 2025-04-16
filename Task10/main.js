const productSection = document.querySelector(".products");
const CategoryList = document.querySelectorAll(".filter-list li");
const searchBar = document.getElementById("search");
const cartOpen = document.getElementById("cart-logo");
const cartClose = document.querySelector(".close-cart");
const cartItems = document.querySelector(".cart-items");

let allData = []; 
let selectedCategory = "All";

// localStorage.setItem('products', []);
function addtocart(product) {
    let temp = [];
    try {
        const stored = localStorage.getItem('products');
        if (stored) {
            temp = JSON.parse(stored);
            if (!Array.isArray(temp)) temp = [];
        }
    } catch (err) {
        console.error("Failed to parse products from localStorage", err);
        temp = [];
    }
    if(product.cart){
        temp.forEach(item =>{
            if(product.id == item.id){
                item.quantity++;
            }
        })
    }
    else{
        let p = {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "cart": product.cart,
            "quantity":1
        }
        temp.push(p);
    }
    localStorage.setItem('products', JSON.stringify(temp));
    loadProducts();
}


function loadProducts(category = "All", keyword = "") {
    if (allData.length > 0) {
        renderFilteredProducts(category, keyword);
    } else {
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                allData = data;
                renderFilteredProducts(category, keyword);
            })
            .catch(error => console.error(error));
    }

    CategoryList.forEach(item =>{
        if(item.textContent === category){
            item.classList.add("active");
        }
        else{
            item.classList.remove("active");
        }
    })
}

function renderFilteredProducts(category, keyword) {
    productSection.innerHTML = "";
    let filtered = allData;
    if (category !== "All") {
        filtered = filtered.filter(product => product.category === category);
    }
    if (keyword.trim() !== "") {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(keyword.toLowerCase())
        );
    }
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    filtered.forEach(product => {
        product.cart = false;
        createCard(product);
    });
}


function createCard(product) {
    try {
        const stored = localStorage.getItem('products');
        if (stored) {
            let temp = JSON.parse(stored);
            temp.forEach(item =>{
                if(item.id==product.id) product.cart = true;
            })
            cartOpen.innerHTML= `
            <h3 id="cart-title">Cart</h3>
            <label id="cart-count">${temp.length}</label>`;
        }
    } catch (err) {
        console.error("Failed to parse products from localStorage", err);
    }

    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
        <img src="${product.image}" class="card-img">
        <div class="card-content">
            <h3 class="card-title">${product.name}</h3>
            <h5 class="card-price">₹ ${product.price}/-</h5>
            <p class="card-desc">${product.description}</p>
            <p class="add-cart">${product.cart ? "Add extra one" : "Add to Cart"}</p>
        </div>`;
    productSection.appendChild(div);

    const addBtn = div.querySelector(".add-cart");
    addBtn.addEventListener("click", () => addtocart(product));
}

CategoryList.forEach(filter => {
    filter.addEventListener("click", () => {
        selectedCategory = filter.textContent;
        loadProducts(selectedCategory, searchBar.value);
    });
});

searchBar.addEventListener("input", () => {
    loadProducts(selectedCategory, searchBar.value);
});

cartOpen.addEventListener("click", () => {
    cartItems.innerHTML = ""; 
    document.querySelector(".cart-modal").classList.remove("hidden");
    let CartProducts = JSON.parse(localStorage.getItem('products')) || [];
    let sum = 0;
    CartProducts.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>₹ ${product.price}</td>
            <td>${product.quantity} 
                <button class="btn increase">+</button> 
                <button class="btn decrease">-</button>
            </td>
            <td>₹ ${Math.round(product.quantity*product.price)}</td>
        `;
        cartItems.appendChild(row);
        sum += (product.quantity*product.price);
        
        const incBtn = row.querySelector(".increase");
        incBtn.addEventListener("click",() => {
            product.quantity++;
            localStorage.setItem('products', JSON.stringify(CartProducts));
            cartOpen.click();
        });

        const decBtn = row.querySelector(".decrease");
        decBtn.addEventListener("click",() => {
            product.quantity--;
            if (product.quantity === 0) {
                CartProducts = CartProducts.filter(item => item.id !== product.id);
            }
            localStorage.setItem('products', JSON.stringify(CartProducts));
            cartOpen.click();
        });
    });
    document.getElementById("cart-total-price").textContent = Math.round(sum);
});

cartClose.addEventListener("click",()=>{
    document.querySelector(".cart-modal").classList.add("hidden");
    loadProducts();
})


// Initial load
loadProducts();
