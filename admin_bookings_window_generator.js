

function create_booking_window(rows = []) {

    let booking_management = document.createElement('div')
    booking_management.id = 'booking_management'

    let bookings_switch = document.createElement('div')
    bookings_switch.id = 'bookings_switch'
    bookings_switch.style.display = 'flexbox'

    let new_bookings_button = document.createElement('button')
    new_bookings_button.id = 'new_bookings_button'
    new_bookings_button.textContent = 'Новые'
    new_bookings_button.addEventListener('click', function(){
        refresh_booking_window(0)
    })
    bookings_switch.appendChild(new_bookings_button)

    let active_bookings_button = document.createElement('button')
    active_bookings_button.id = 'active_bookings_button'
    active_bookings_button.textContent = 'Активные'
    active_bookings_button.addEventListener('click', function(){
        refresh_booking_window(1)
    })
    bookings_switch.appendChild(active_bookings_button)

    let closed_bookings_button = document.createElement('button')
    closed_bookings_button.id = 'closed_bookings_button'
    closed_bookings_button.textContent = 'Закрытые'
    closed_bookings_button.addEventListener('click', function(){
        refresh_booking_window(2)
    })
    bookings_switch.appendChild(closed_bookings_button)

    let all_bookings_button = document.createElement('button')
    all_bookings_button.id = 'all_bookings_button'
    all_bookings_button.textContent = 'Все'
    all_bookings_button.addEventListener('click', function(){
        refresh_booking_window(null)
    })
    bookings_switch.appendChild(all_bookings_button)

    booking_management.appendChild(bookings_switch)

    let booking_records = document.createElement('div')

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
        booking_record.textContent += `(${element.state})`
        if (element.notes != null) {
            booking_record.textContent += `, примечания: ${element.notes};`
        }
        booking_records.appendChild(booking_record)
    }
    booking_management.appendChild(booking_records)
    document.getElementById('management_output').appendChild(booking_management)

    let booking_record_menu = document.createElement('div')
    booking_record_menu.id = 'booking_record_menu'

    let booking_record_menu_title = document.createElement('p')
    booking_record_menu_title.id = 'booking_record_menu_title'
    booking_record_menu_title.textContent = 'Запись :'
    booking_record_menu.appendChild(booking_record_menu_title)

    let confirm_booking_button = document.createElement('button')
    confirm_booking_button.id = 'confirm_booking_button'
    confirm_booking_button.textContent = 'Подтвердить'
    confirm_booking_button.addEventListener('click', function (event) {
        change_booking_state(record_id, 1)
        booking_record_menu.style.visibility = 'hidden'
    })
    booking_record_menu.appendChild(confirm_booking_button)

    let close_booking_button = document.createElement('button')
    close_booking_button.id = 'close_booking_button'
    close_booking_button.textContent = 'Закрыть'
    close_booking_button.addEventListener('click', function (event) {
        change_booking_state(record_id, 2)
        booking_record_menu.style.visibility = 'hidden'
    })

    booking_record_menu.appendChild(close_booking_button)
    booking_management.appendChild(booking_record_menu)

    let record_id
    let records = [].slice.call(document.getElementsByClassName('booking_record'))
    records.forEach(element => {
        element.addEventListener('click', function (event) {
            booking_record_menu.style.left = event.pageX + 'px'
            booking_record_menu.style.top = event.pageY + 'px'
            booking_record_menu.style.visibility = 'visible'
            record_id = this.id
            booking_record_menu_title.textContent = 'Запись ' + record_id + ':'

        })
    });
}

async function refresh_booking_window (state){
    document.getElementById('booking_management').remove();
    let user_info = {}
    user_info.email = localStorage.getItem('email')
    user_info.password = localStorage.getItem('password')
    if (state != null){
        user_info.state = state
    }
    await get_admin_booking_data(JSON.stringify(user_info))
}