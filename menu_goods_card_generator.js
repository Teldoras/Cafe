function fill_goods(goods_data = []) {

    goods_data.forEach(element => {
        create_card(element)
    });

}

function create_card(g_data) {

    let new_card = document.createElement('div')
    new_card.className = 'goods_cards'
    new_card.id = 'g_card_' + g_data.id

    let new_name = document.createElement('p4')
    new_name.className = 'goods_names'
    new_name.id = 'g_name_' + g_data.id
    new_name.textContent = g_data.goods_name
    new_card.appendChild(new_name)

    let new_image = document.createElement('img')
    new_image.className = 'goods_pictures'
    new_image.id = 'g_picture_' + g_data.id
    new_image.src = 'resourses/menu_pics/' + g_data.id + '.jpg'
    new_card.appendChild(new_image)

    let new_input = document.createElement('input')
    new_input.type = 'number'
    new_input.id = 'g_number_' + g_data.id
    new_input.className = 'goods_numbers'
    new_input.value = '1'
    new_card.appendChild(new_input)

    let new_label = document.createElement('label')
    new_label.className = 'goods_prices'
    new_label.id = 'g_price_' + g_data.id
    new_label.textContent = g_data.price + ' р.'
    new_card.appendChild(new_label)

    let new_button = document.createElement('button')
    new_button.className = 'goods_buttons'
    new_button.id = 'g_button_' + g_data.id
    new_button.textContent = 'Добавить.'
    new_button.value = g_data.id
    activate_g_button(new_button)
    new_card.appendChild(new_button)

    let new_discr = document.createElement('div')
    new_discr.className = 'goods_description'
    new_discr.id = 'g_discription_' + g_data.id
    try {
        new_discr.textContent = g_data.discription
    } catch (error) {
        new_discr.textContent = 'Описание'
    }
    new_card.appendChild(new_discr)

    document.getElementById('goods_list').appendChild(new_card)
}

function activate_g_button(button = document.createElement('button')) {
    button.addEventListener('click', function (event) {
        event.preventDefault()
        let repeat_check = false
        //console.log(this.value)
        for (let i = 0; i < choosen_goods.length; i++) {
            const element = choosen_goods[i];
            
            if (element.id == this.value) {
                element.quantity += Number(document.getElementById('g_number_' + this.value).value)
                repeat_check = true
            }
        }
        if (repeat_check == false)
        {
            choosen_goods.push({
                id: Number(this.value),
                quantity: Number(document.getElementById('g_number_' + this.value).value),
                goods_name: document.getElementById('g_name_' + this.value).textContent,
                price: Number(document.getElementById('g_price_' + this.value).textContent.slice(0, -3))
            })
            console.log(choosen_goods)
        }
        refresh_basket()
    })
}