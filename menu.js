const choosen_goods = [] // [{goods_id, goods_name, quantity, price}]
const basket_list = document.getElementById('basket_list')


document.addEventListener('DOMContentLoaded', function () {
    take_goods_data()
})

document.getElementById('basket_confirm_button').addEventListener('click', function (event) {
    //choosen_goods.length = 0;
    //refresh_basket();
    document.getElementById('order_box').style.visibility = 'visible'

})

document.getElementById('order_confirm_button').addEventListener('click', function (event){
    event.preventDefault()
    let order_data = {}
    order_data.user_name = document.getElementById('order_name').value
    order_data.email = document.getElementById('order_contacts').value
    order_data.address = document.getElementById('order_address').value
    order_data.time = document.getElementById('order_time').value
    order_data.goods = [] = choosen_goods
    send_order_data(JSON.stringify(order_data))

    document.getElementById('order_box').style.visibility = 'hidden'
})



function refresh_basket() {
    clear_basket()
    let basket_cost = 0.0
    choosen_goods.forEach(element => {
        let new_item = document.createElement('p')
        element.cost = element.price * element.quantity
        new_item.textContent =
            element.goods_name
            + ', ' + element.quantity + ' шт.'
            + ', стоимость: ' + element.cost + ' р.'
        basket_list.appendChild(new_item)
        basket_cost += element.cost
    });
    document.getElementById('goods_cost').textContent = 'Общая стоимость: ' + basket_cost + ' р.';
}

function clear_basket() {
    document.getElementById('goods_cost').textContent = 'Общая стоимость: '
    while (basket_list.firstElementChild) {
        basket_list.removeChild(basket_list.lastElementChild);
    }
}