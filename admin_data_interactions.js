//import create_orders_window from './admin_orders_window_generator'
//const {create_order_window} = require('./admin_orders_window_generator')

//import './admin_bookings_window_generator.mjs'
//require('./admin_bookings_window_generator.js')
//import './admin_orders_window_generator.mjs'
//require('./admin_orders_window_generator.js')


async function get_admin_data(user_info) {
    let url = "/get_AD"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: user_info
    })

    // create_admin_window()

    // let bookings_records = await response.json();
    // console.log('попытка вывести записи бронирований напрямую: ' + bookings_records)
    // console.log('попытка вывести записи бронирований stringify: ' + JSON.stringify(bookings_records))

    // create_booking_window(JSON.stringify(bookings_records))

    // create_order_window()

    // create_staff_window()

    // if (true) {

    //     return 'данные админа успешно получены'
    // }
    // else {
    //     return 'ошибка получения данных админа'
    // }    
}

async function get_admin_booking_data(user_info) {
    let url = "/get_ABD"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: user_info
    })

    let bookings_records = await response.json()

    create_booking_window(JSON.stringify(bookings_records))
}

async function get_admin_orders_data(user_info) {
    let url = "/get_AOD"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: user_info
    })

    let orders_records = await response.json();

    create_orders_window(JSON.stringify(orders_records))
}

async function change_booking_state(booking_id, new_state) {
    let url = "/change_BS"

    let json_booking_data = {booking_id: booking_id, new_state: new_state}

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: JSON.stringify(json_booking_data)
    })

    refresh_booking_window ()
}

async function change_order_state(order_id, new_state) {
    let url = "/change_OS"

    let json_order_data = {order_id: order_id, new_state: new_state}

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: JSON.stringify(json_order_data)
    })

    refresh_order_window ()
}
