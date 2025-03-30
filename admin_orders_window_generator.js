function create_order_window(rows = []) {

    // if (!document.getElementById('show_order_window_button')) {
    //     let show_order_window_button = document.createElement('button')
    //     show_order_window_button.id = 'show_order_window_button'
    //     show_order_window_button.textContent = 'Заказы'
    //     document.getElementById('management_controls').appendChild(show_booking_window_button)
    // }

    let order_management = document.createElement('div')
    order_management.id = 'order_management'
    order_window.style.display = 'none'

    let order_switch = document.createElement('div')
    order_switch.id = 'order_switch'
    order_switch.style.display = 'flexbox'

    let new_orders_button = document.createElement('button')
    new_orders_button.id = 'new_orders_button'
    new_orders_button.textContent = 'Новые'
    order_switch.appendChild(new_orders_button)

    let active_orders_button = document.createElement('button')
    active_orders_button.id = 'active_orders_button'
    active_orders_button.textContent = 'Активные'
    order_switch.appendChild(active_orders_button)

    let closed_orders_button = document.createElement('button')
    closed_orders_button.id = 'closed_orders_button'
    closed_orders_button.textContent = 'Закрытые'
    order_switch.appendChild(closed_orders_button)

    order_management.appendChild(order_switch)

    let order_records = document.createElement('div')

    console.log('строки заказов: ' + rows)
    console.log('строки заказов: ' + JSON.stringify(rows))

    for (let i = 0; i < JSON.parse(rows).length; i++) {
        const element = JSON.parse(rows)[i];
        let order_record = document.createElement('p')
        order_record.id = element.id
        order_record.className = 'order_record'
        order_record.textContent = ` `
        // столики: ` + element.tables + `
        // , время: ` + element.time_from.substr(0, 5) + ` - ` + element.time_to.substr(0, 5) + `
        // , имя: ` + element.user_name + `
        // , контакты: ` + element.contacts + `
        // , состояние: `
        switch (element.state) {
            case 0:
                order_record.textContent += `заявка `
                break;
            case 1:
                order_record.textContent += `одобрено `
                break;
            case 2:
                order_record.textContent += `закрыто `
                break;
            default:
                order_record.textContent += `ОШИБКА! `
                break;
        }
        order_record.textContent += `(` + element.state + `)`
        if (element.notes != null) {
            order_record.textContent += `, примечания: \n` + element.notes + `;`
        }
        order_records.appendChild(order_record)
    }
    order_management.appendChild(order_records)
    document.getElementById('management_output').appendChild(order_management)

}