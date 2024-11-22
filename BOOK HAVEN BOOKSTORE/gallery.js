document.getElementById("cart-modal").style.display = 'none'

let cart = [];

// Load cart from SessionStorage if available
const savedCart = JSON.parse(sessionStorage.getItem("cart"));
if (savedCart) {
    cart = savedCart;
}

// Add item to cart
function addToCart(imageUrl, description) {
    // Add item to cart array
    cart.push({ imageUrl, description});
    
    // Save cart to SessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Show dialog message
    alert("Item added.");
}

// Open the cart modal and display items
function openCartModal() {
    const cartItemsList = document.getElementById("cart-items-list");
    cartItemsList.innerHTML = ""; // Clear previous list

    // Add items to the cart modal
    cart.forEach(item => {
        const li = document.createElement("li");
        // Create image element
        const img = document.createElement("img");
        img.src = item.imageUrl;  // Set image URL
        img.alt = item.description;  // Set image alt text
        img.width = 50;  // You can adjust the image width as needed
        
        // Add the image and description to the list item
        li.appendChild(img);
        li.appendChild(document.createTextNode(` ${item.description}`));
        cartItemsList.appendChild(li);
    });

    // Show the modal
    const modal = document.getElementById("cart-modal");
    modal.style.display = "flex";
}

// Close the cart modal
function closeCartModal() {
    const modal = document.getElementById("cart-modal");
    modal.style.display = "none";
}

// Clear the cart
function clearCart() {
    cart = [];
    sessionStorage.removeItem("cart"); // Remove cart from SessionStorage
    openCartModal(); // Refresh the modal to show empty cart
    alert('Cart cleared');
}
// Clear the processed cart
function clearCart() {
    cart = [];
    sessionStorage.removeItem("cart"); // Remove cart from SessionStorage
    openCartModal(); // Refresh the modal to show empty cart
}

// Process the order and show confirmation
function processOrder() {
    alert("Thank you for your order.");
    clearProcessedCart(); // Optionally, clear the cart after order is processed
}

// Close modal if user clicks outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("cart-modal");
    if (event.target === modal) {
        closeCartModal();  // Close modal when clicking outside the modal content
    }
}

