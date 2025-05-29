
document.addEventListener('DOMContentLoaded', async function () {
    await fill_personal_data()
    //administrator_check();
})

async function fill_personal_data() {
    let user_info = {}
    user_info.email = localStorage.getItem('email')
    user_info.password = localStorage.getItem('password')
    await get_personal_data(JSON.stringify(user_info))
    await fill_history(JSON.stringify(user_info))

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

function fill_history(rows = []){
    for (let i = 0; i < JSON.parse(rows).length; i++) {

        
        history_record.textContent += `(${element.state})`
        if (element.notes != null) {
            history_record.textContent += `, примечания: ${element.notes};`
        }
        document.getElementById('history_list').appendChild(history_record)
    }
}




