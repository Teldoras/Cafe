

document.addEventListener('DOMContentLoaded', async function () {
    await fill_personal_data()
    let user_info = {}
    user_info.email = localStorage.getItem('email')
    user_info.password = localStorage.getItem('password')
    await get_admin_booking_data(JSON.stringify(user_info))
    await get_admin_orders_data(JSON.stringify(user_info))
    //administrator_check();
})

async function fill_personal_data() {

    let user_info = {}
    user_info.email = localStorage.getItem('email')
    user_info.password = localStorage.getItem('password')
    await get_personal_data(JSON.stringify(user_info))
}

// async function administrator_check() {
//     let user_info = {}
//     user_info.email = localStorage.getItem('email')
//     user_info.password = localStorage.getItem('password')
//     await get_admin_booking_data(JSON.stringify(user_info))
//     await get_admin_orders_data(JSON.stringify(user_info))
// }

personal_data_confirm_button.addEventListener('click', function (event) {

    event.preventDefault();
    let users = event.srcElement.form;

    let user_info = {}
    user_info.first_name = users[0].value
    user_info.last_name = users[1].value
    user_info.address = users[2].value
    user_info.birthday_date = users[3].value
    user_info.email = localStorage.getItem('email')

    let pn = users[5].value
    pn = pn.replaceAll('-', '')
    pn = pn.replaceAll(' ', '')
    if (pn.length > 10) {
        pn = pn.replace('+7', '8')
        pn = pn.replace('8', '')
    }

    user_info.phone_number = pn
    user_info.password = localStorage.getItem('password')

    change_PD(JSON.stringify(user_info));

})

function create_admin_window() {
    let show_booking_window_button = document.createElement('button')
    show_booking_window_button.id = 'show_booking_window_button'
    show_booking_window_button.textContent = 'Бронирования'
    document.getElementById('management_controls').appendChild(show_booking_window_button)

    let show_order_window_button = document.createElement('button')
    show_order_window_button.id = 'show_order_window_button'
    show_order_window_button.textContent = 'Заказы'
    document.getElementById('management_controls').appendChild(show_order_window_button)

    // let show_staff_window_button = document.createElement('button')
    // show_staff_window_button.id = 'show_staff_window_button'
    // show_staff_window_button.textContent = 'Персонал'
    // document.getElementById('management_controls').appendChild(show_staff_window_button)

    show_booking_window_button.addEventListener('click', function (event) {
        booking_management.style.display = 'block'
        orders_management.style.display = 'none'
        //staff_management.style.display = 'none'
    })
    
    show_order_window_button.addEventListener('click', function (event) {
        booking_management.style.display = 'none'
        orders_management.style.display = 'block'
        //staff_management.style.display = 'none'
    })
    
    // show_staff_window_button.addEventListener('click', function (event) {
    //     booking_management.style.display = 'none'
    //     orders_management.style.display = 'none'
    //     staff_management.style.display = 'block'
    // })
}



