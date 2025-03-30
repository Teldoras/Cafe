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

    // create_admin_window()

    let bookings_records = await response.json();
    //console.log('попытка вывести записи бронирований напрямую: ' + bookings_records)
    //console.log('попытка вывести записи бронирований stringify: ' + JSON.stringify(bookings_records))

    create_booking_window(JSON.stringify(bookings_records))

}

async function get_admin_order_data(user_info) {
    let url = "/get_AOD"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: user_info
    })

    // create_admin_window()

    let orders_records = await response.json();
    console.log('попытка вывести записи бронирований напрямую: ' + bookings_records)
    console.log('попытка вывести записи бронирований stringify: ' + JSON.stringify(bookings_records))

    create_order_window(JSON.stringify(orders_records))

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
    /*let bookings_records = await response.json()*/;

    document.getElementById('booking_window').remove()
    document.getElementById('order_window').remove()

    administrator_check()
}
