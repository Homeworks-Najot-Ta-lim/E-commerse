const filters = document.querySelector(".filters");
const productsContainer = document.querySelector(".products");
const card = document.querySelector(".card");



fetchAllCategories();

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
  } catch (error) {
    console.error(error);
  } finally {
  }
}

async function renderProducts() {

  try {
    const products = await fetchProducts();
    productsContainer.innerHTML = `<div id="product-container" class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <p class="text-center text-gray-500">serching...</p>
  </div>`;  
    const items = products.map(
      (product) => `
    <a href="./ondeProduct.html?id=${product.id}" class="shadow">
    <div class="card ">
        <div class="card-image w-full h-[350px] object-cover">
            <img src="${product.image}" class="w-full h-full" alt="${
        product.title
      }">
        </div>
        <div class="card-body p-4">
            <h1 class="card-title text-lg font-semibold mb-2">${
              product.title
            }</h1>
            <h4 class="card-price text-lg text-green-600 font-bold mb-2">${
              product.price
            }$</h4>
            <p class="text-sm text-gray-600">${"⭐️".repeat(
              Math.round(product.rating.rate)
            )} 
                <span>(${product.rating.count})</span>
            </p>
        </div>
    </div>
    </a>
      `
    );
    productsContainer.innerHTML = items.join("");
  } catch (error) {
    console.error(error);
  }
}

renderProducts();

async function fetchCategories() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

const fetchOneCategoryData = async (ctName) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${ctName}`
  );

  return await response.json();
};

async function fetchAllCategories() {
  const categories = await fetchCategories();
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.classList.add("liStyles");

    const button = document.createElement("button");
    button.classList.add("liButtonsStyles");
    button.textContent = category;

    button.onclick = async () => {
      try {
        productsContainer.innerHTML = `<div id="product-container" class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <p class="text-center text-gray-500">Loading...</p>
  </div>`;
        const products = await fetchOneCategoryData(category);
        const items = products.map(
          (product) => `
          <a href="./ondeProduct.html?id=${product.id}" class="shadow">
          <div class="card">
              <div class="card-image w-full h-[350px] object-cover">
                  <img src="${product.image}" class="w-full h-full" alt="${
            product.title
          }">
              </div>
              <div class="card-body p-4">
                  <h1 class="card-title text-lg font-semibold mb-2">${
                    product.title
                  }</h1>
                  <h4 class="card-price text-lg text-green-600 font-bold mb-2">${
                    product.price
                  }$</h4>
                  <p class="text-sm text-gray-600">${"⭐️".repeat(
                    Math.round(product.rating.rate)
                  )} 
                      <span>(${product.rating.count})</span>
                  </p>
              </div>
          </div>
          </a>
            `
        );
        productsContainer.innerHTML = items.join("");
      } catch (error) {}
    };

    li.append(button);
    filters.append(li);
  });
}

const sortProducts = async (sortOrder) => {
  productsContainer.innerHTML = `<div id="product-container" class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
  <p class="text-center text-gray-500">Loading...</p>
</div>`;  
  const products = await fetchProducts();
  console.log(1)
  if (sortOrder === "asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "deck") {
    products.sort((a, b) => b.price - a.price);
  }

    const items = products.map(
      (product) => `
    <a href="./ondeProduct.html?id=${product.id}" class="shadow">
    <div class="card">
        <div class="card-image w-full h-[350px] object-cover">
            <img src="${product.image}" class="w-full h-full" alt="${
        product.title
      }">
        </div>
        <div class="card-body p-4">
            <h1 class="card-title text-lg font-semibold mb-2">${
              product.title
            }</h1>
            <h4 class="card-price text-lg text-green-600 font-bold mb-2">${
              product.price
            }$</h4>
            <p class="text-sm text-gray-600">${"⭐️".repeat(
              Math.round(product.rating.rate)
            )} 
                <span>(${product.rating.count})</span>
            </p>
        </div>
    </div>
    </a>
      `
    );
    productsContainer.innerHTML = items.join("");
};



const serchEngine = async(serchingData) => {
  try {
    productsContainer.innerHTML = `<div id="product-container" class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
  <p class="text-center text-gray-500">serching...</p>
</div>`;  

  const products = await fetchProducts()
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(serchingData.toLowerCase())
);


const items = filteredProducts.map(
  (product) => `
<a href="./ondeProduct.html?id=${product.id}" class="shadow">
<div class="card">
    <div class="card-image w-full h-[350px] object-cover">
        <img src="${product.image}" class="w-full h-full" alt="${
    product.title
  }">
    </div>
    <div class="card-body p-4">
        <h1 class="card-title text-lg font-semibold mb-2">${
          product.title
        }</h1>
        <h4 class="card-price text-lg text-green-600 font-bold mb-2">${
          product.price
        }$</h4>
        <p class="text-sm text-gray-600">${"⭐️".repeat(
          Math.round(product.rating.rate)
        )} 
            <span>(${product.rating.count})</span>
        </p>
    </div>
</div>
</a>
  `
);
productsContainer.innerHTML = items.join("");

if(serchingData.length ===0){
  productsContainer.innerHTML = `<div id="product-container" class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
  <p class="text-center text-gray-500">Loading...</p>
</div>`;
  renderProducts()
}

if(filteredProducts.length ==0){
  productsContainer.innerHTML = `<div id="product-container" class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
  <p class="text-center text-gray-500">product not found</p>
</div>`; 
}



  } catch (error) {
    productsContainer.innerHTML = `<div id="product-container" class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <p class="text-center text-gray-500">Something wrong</p>
  </div>`; 
  }

}




const orderModal = document.getElementById('orderModal');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');



const orderView = () =>{
  renderOrderItems();
  orderModal.classList.remove('translate-x-full');
  orderModal.classList.add('translate-x-0');
}

closeModal.addEventListener('click', () => {
  orderModal.classList.remove('translate-x-0');
  orderModal.classList.add('translate-x-full');
});
const renderOrderItems = () => {
    const items = JSON.parse(localStorage.getItem('orderItems')) || [];
    modalContent.innerHTML = items.map(item => `
        <div class="border-b pb-4 object-cover">
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 rounded-md mb-2">
            <h2 class="text-lg font-semibold">${item.title}</h2>
            <p class="text-gray-700">$${item.price}</p>
            <button class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onclick="deleteOrder(${item.id})"><i class="bi bi-trash3"></i><button>
        </div>
    `).join('');
    if(!items.length){
      modalContent.innerHTML = `<div id="product-container" class="max-w-4xl mx-auto p-6 bg-white rounded-lg">
  <p class="text-center text-gray-500">Cart is empty...</p>
</div>`
    }
};

const deleteOrder = (productId)=>{
  try {
    let orderData = JSON.parse(localStorage.getItem('orderItems'))
    orderData = orderData.filter(item => item.id !== productId);
    localStorage.setItem('orderItems', JSON.stringify(orderData))
    toastr.success('Deleted order', 'Deleted', {
      timeOut: 7000, 
      positionClass: 'toast-top-right',
      progressBar: true,
    });

    (()=>{
      const orderCount = JSON.parse(localStorage.getItem('orderItems'))
      document.querySelector(".order-count").textContent = orderCount.length
    })()

    orderModal.classList.remove('translate-x-0');
  orderModal.classList.add('translate-x-full');


  } catch (error) {
    
  }
}


const clearFilter = () => {
  renderProducts()
  console.log(1)
}



(()=>{
  const orderCount = JSON.parse(localStorage.getItem('orderItems'))
  document.querySelector(".order-count").textContent = orderCount.length
})()


