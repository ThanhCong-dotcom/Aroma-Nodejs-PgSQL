
$(document).ready(() => {
    $('.add-to-cart').on('click', addToCart)
})

function addToCart() {
    var id = $(this).data('id');
    var quantity = $('#sst') ? $('#sst').val() : 1
    $.ajax({
        url: '/cart',
        type: 'POST',
        data: { id, quantity },
        success: function (result) {
            if (result.totalQuantity > 0) {
                $('#cart-badge').html(result.totalQuantity);
                //alert('thêm vào giỏ thành công')
            }

        }
    })
}

function updateCart(id, quantity) {
    if (quantity == 0) {
        removeCartItem(id);
    }
    else {
        updateCartItem(id, quantity)
    }
}
function removeCartItem(id) {
    $.ajax({
        url: '/cart',
        type: 'DELETE',
        data: { id },
        success: function (result) {
            $('#cart-badge').html(result.totalQuantity);
            $('#totalPrice').html('$' + result.totalPrice);

            if (result.totalQuantity > 0) {
                $(`#item${id}`).remove();
            }
            else {
                $('#cart-body').html('<div class="alter-info text-center">Your cart empty</div>')

            }

        }
    })
}
function updateCartItem(id, quantity) {
    $.ajax({
        url: '/cart',
        type: 'PUT',
        data: { id, quantity },
        success: function (result) {
            $('#cart-badge').html(result.totalQuantity);
            $('#totalPrice').html('$' + result.totalPrice);
            $(`#price${id}`).html('$' + result.item.price);

        }
    })
}
function clearCart() {
    if (confirm('do you clear all items ?')) {
        $.ajax({
            url: '/cart/all',
            type: 'DELETE',
            success: function () {
                $('#cart-badge').html('0');
                $('#cart-body').html('<div class="alter-info text-center">Your cart empty</div>')
            }
        })
    }
}
