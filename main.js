// main.js

document.addEventListener('DOMContentLoaded', function () {
    // Attach click event listeners to all "Add to Cart" buttons
    var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Get the product ID from the data attribute
            var productId = button.parentElement.getAttribute('data-product-id');

            // Call the addToCart function with the product ID
            addToCart(productId);
        });
    });

    // Function to add a product to the cart using AJAX
    function addToCart(productId) {
        fetch('cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'product_id=' + productId,
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response
            if (data.success) {
                alert(data.message);
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
