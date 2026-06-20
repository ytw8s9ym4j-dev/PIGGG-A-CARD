const cart = [];
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");

const money = value => new Intl.NumberFormat("th-TH", {style:"currency", currency:"THB", maximumFractionDigits:0}).format(value);

function renderCart() {
  cartCount.textContent = cart.length;
  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty">ยังไม่มีสินค้าในตะกร้า</p>';
  } else {
    cartItems.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div><b>${item.name}</b><span>${money(item.price)}</span></div>
        <button data-remove="${i}">ลบ</button>
      </div>`).join("");
  }
  cartTotal.textContent = money(cart.reduce((sum, item) => sum + item.price, 0));
  document.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => { cart.splice(Number(button.dataset.remove), 1); renderCart(); });
  });
}
function openCart() { cartDrawer.classList.add("open"); overlay.classList.add("show"); cartDrawer.setAttribute("aria-hidden", "false");}
function hideCart() { cartDrawer.classList.remove("open"); overlay.classList.remove("show"); cartDrawer.setAttribute("aria-hidden", "true");}
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    cart.push({name:button.dataset.product, price:Number(button.dataset.price)});
    renderCart();
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1700);
  });
});
cartButton.addEventListener("click", openCart); closeCart.addEventListener("click", hideCart); overlay.addEventListener("click", hideCart);
document.getElementById("checkoutButton").addEventListener("click", () => {
  if (!cart.length) { alert("กรุณาเพิ่มสินค้าลงตะกร้าก่อน"); return; }
  alert("เดโมเว็บไซต์: ขั้นตอนถัดไปสามารถเชื่อมต่อ LINE OA, Shopify, WooCommerce หรือระบบชำระเงินได้");
});
document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(b=>b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".product-card").forEach(card => {
      card.style.display = (filter === "all" || card.dataset.category.includes(filter)) ? "" : "none";
    });
  });
});
document.getElementById("menuButton").addEventListener("click", () => document.getElementById("main-nav").classList.toggle("open"));
document.getElementById("searchButton").addEventListener("click", () => {
  document.getElementById("shop").scrollIntoView({behavior:"smooth"});
});