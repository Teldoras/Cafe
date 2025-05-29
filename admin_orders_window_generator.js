// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client'

function create_orders_window(rows = []) {

    if (false) {
        // console.log('123')
        // const root = createRoot(document.getElementById('management_output'));
        // root.render(<Order_management />)
    }
    else{
        let orders_management = document.createElement('div')
        orders_management.id = 'orders_management'
        orders_management.style.display = 'none'
    
        let orders_switch = document.createElement('div')
        orders_switch.id = 'orders_switch'
        orders_switch.style.display = 'flexbox'
    
        let new_orders_button = document.createElement('button')
        new_orders_button.id = 'new_orders_button'
        new_orders_button.textContent = 'Новые'
        new_orders_button.addEventListener('click', function(){
            refresh_order_window(0)
        })
        orders_switch.appendChild(new_orders_button)
    
        let active_orders_button = document.createElement('button')
        active_orders_button.id = 'active_orders_button'
        active_orders_button.textContent = 'Активные'
        active_orders_button.addEventListener('click', function(){
            refresh_order_window(1)
        })
        orders_switch.appendChild(active_orders_button)
    
        let closed_orders_button = document.createElement('button')
        closed_orders_button.id = 'closed_orders_button'
        closed_orders_button.textContent = 'Закрытые'
        closed_orders_button.addEventListener('click', function(){
            refresh_order_window(2)
        })
        orders_switch.appendChild(closed_orders_button)

        let all_orders_button = document.createElement('button')
        all_orders_button.id = 'all_orders_button'
        all_orders_button.textContent = 'Все'
        all_orders_button.addEventListener('click', function(){
            refresh_order_window(null)
        })
        orders_switch.appendChild(all_orders_button)
    
        orders_management.appendChild(orders_switch)
    
        let order_records = document.createElement('div')

        for (let i = 0; i < JSON.parse(rows).length; i++) {
            const element = JSON.parse(rows)[i];
            let order_record = document.createElement('p')
            order_record.id = element.id
            order_record.className = 'order_record'
            order_record.textContent = ` 
            время: ${element.time.substr(0, 5)}, 
            контакты: ${element.contacts}, 
            имя: ${element.user_name}, 
            состав: ${element.goods},
            состояние: `
            console.log(element.goods)
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
            order_record.textContent += `(${element.state})`
            if (element.notes != null) {
                order_record.textContent += `, примечания: \n` + element.notes + `;`
            }
            order_records.appendChild(order_record)
        }
        orders_management.appendChild(order_records)
        document.getElementById('management_output').appendChild(orders_management)
    }

    let order_record_menu = document.createElement('div')
    order_record_menu.id = 'order_record_menu'

    let order_record_menu_title = document.createElement('p')
    order_record_menu_title.id = 'oreder_record_menu_title'
    order_record_menu_title.textContent = 'Запись :'
    order_record_menu.appendChild(order_record_menu_title)

    let confirm_order_button = document.createElement('button')
    confirm_order_button.id = 'confirm_order_button'
    confirm_order_button.textContent = 'Подтвердить'
    confirm_order_button.addEventListener('click', function (event) {
        change_order_state(record_id, 1)
        order_record_menu.style.visibility = 'hidden'
    })
    order_record_menu.appendChild(confirm_order_button)

    let close_order_button = document.createElement('button')
    close_order_button.id = 'close_order_button'
    close_order_button.textContent = 'Закрыть'
    close_order_button.addEventListener('click', function (event) {
        change_order_state(record_id, 2)
        order_record_menu.style.visibility = 'hidden'
    })

    order_record_menu.appendChild(close_order_button)
    orders_management.appendChild(order_record_menu)

    let record_id
    let records = [].slice.call(document.getElementsByClassName('order_record'))
    records.forEach(element => {
        element.addEventListener('click', function (event) {
            order_record_menu.style.left = event.pageX + 'px'
            order_record_menu.style.top = event.pageY + 'px'
            order_record_menu.style.visibility = 'visible'
            record_id = this.id
            order_record_menu_title.textContent = 'Запись ' + record_id + ':'

        })
    });
}

async function refresh_order_window (state){

    document.getElementById('orders_management').remove();
    let user_info = {}
    user_info.email = localStorage.getItem('email')
    user_info.password = localStorage.getItem('password')
    if (state != null){
        user_info.state = state
    }
    await get_admin_orders_data(JSON.stringify(user_info))
    document.getElementById('orders_management').style.display = 'block'
}

// class Order_management extends Component {
//     render () {
//         return (
//             <div id='orders_management'>

//             </div>
//         )
//     }
// }