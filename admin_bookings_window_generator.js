function create_booking_window(rows = []) {

    // if (!document.getElementById('show_booking_window_button'))
    // {
    //     let show_booking_window_button = document.createElement('button')
    //     show_booking_window_button.id = 'show_booking_window_button'
    //     show_booking_window_button.textContent = 'Бронирования'
    //     document.getElementById('management_controls').appendChild(show_booking_window_button)    
    
        
    // }

    let booking_management = document.createElement('div')
    booking_management.id = 'booking_management'

    let booking_switch = document.createElement('div')
    booking_switch.id = 'booking_switch'
    booking_switch.style.display = 'flexbox'

    let new_bookings_button = document.createElement('button')
    new_bookings_button.id = 'new_bookings_button'
    new_bookings_button.textContent = 'Новые'
    booking_switch.appendChild(new_bookings_button)

    let active_bookings_button = document.createElement('button')
    active_bookings_button.id = 'active_bookings_button'
    active_bookings_button.textContent = 'Активные'
    booking_switch.appendChild(active_bookings_button)

    let closed_bookings_button = document.createElement('button')
    closed_bookings_button.id = 'closed_bookings_button'
    closed_bookings_button.textContent = 'Закрытые'
    booking_switch.appendChild(closed_bookings_button)

    booking_management.appendChild(booking_switch)

    let booking_records = document.createElement('div')

    console.log('строки бронирований: ' + rows)
    console.log('строки бронирований: ' + JSON.stringify(rows))

    for (let i = 0; i < JSON.parse(rows).length; i++) {
        const element = JSON.parse(rows)[i];
        let booking_record = document.createElement('p')
        booking_record.id = element.id
        booking_record.className = 'booking_record'
        booking_record.textContent = `
        столики: ` + element.tables + `
        , время: ` + element.time_from.substr(0, 5) + ` - ` + element.time_to.substr(0, 5) + `
        , имя: ` + element.user_name + `
        , контакты: ` + element.contacts + `
        , состояние: `
        switch (element.state) {
            case 0:
                booking_record.textContent += `заявка `
                break;
            case 1:
                booking_record.textContent += `одобрено `
                break;
            case 2:
                booking_record.textContent += `закрыто `
                break;
            default:
                booking_record.textContent += `ОШИБКА! `
                break;
        }
        booking_record.textContent += `(` + element.state + `)`
        if (element.notes != null) {
            booking_record.textContent += `, примечания: \n` + element.notes + `;`
        }
        booking_records.appendChild(booking_record)
    }
    booking_management.appendChild(booking_records)
    document.getElementById('management_output').appendChild(booking_management)

    let record_menu = document.createElement('div')
    record_menu.id = 'record_menu'

    let record_menu_title = document.createElement('p')
    record_menu_title.id = 'record_menu_title'
    record_menu_title.textContent = 'Запись :'
    record_menu.appendChild(record_menu_title)

    let confirm_booking_button = document.createElement('button')
    confirm_booking_button.id = 'confirm_booking_button'
    confirm_booking_button.textContent = 'Подтвердить'
    confirm_booking_button.addEventListener('click', function (event) {
        change_booking_state(record_id, 1)
        record_menu.style.visibility = 'hidden'
    })
    record_menu.appendChild(confirm_booking_button)

    let close_booking_button = document.createElement('button')
    close_booking_button.id = 'close_booking_button'
    close_booking_button.textContent = 'Закрыть'
    close_booking_button.addEventListener('click', function (event) {
        change_booking_state(record_id, 2)
        record_menu.style.visibility = 'hidden'
    })
    record_menu.appendChild(close_booking_button)

    booking_management.appendChild(record_menu)

    

    let record_id
    let records = [].slice.call(document.getElementsByClassName('booking_record'))
    records.forEach(element => {
        element.addEventListener('click', function (event) {
            record_menu.style.left = event.pageX + 'px'
            record_menu.style.top = event.pageY + 'px'
            record_menu.style.visibility = 'visible'
            record_id = this.id
            record_menu_title.textContent = 'Запись ' + record_id + ':'

        })
    });
}

function refresh_booking_data (){
    
}