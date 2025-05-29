async function get_personal_data(user_info) {
    let url = "/get_PD"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: user_info
    })

    let json_personal_data = await response.json();
    console.log(json_personal_data)
    if (json_personal_data) {

        if (json_personal_data.user_type >= 1) {
            console.log('замечен администратор')
            console.log(window.location.pathname)

            if (window.location.pathname == '/account.html') {
                console.log('администратор не на своём месте')
                window.stop();
                window.location.href = 'administration.html';
                return;
            }
            else {
                create_admin_window()
                management.style.display = 'inline';
                management.style.visibility = 'visible';
            }
        }
        else {
            if (window.location.pathname == '/administration.html') {
                window.stop();
                window.location.href = 'account.html';
            }
        }

        user_name.value = json_personal_data.first_name
        user_surname.value = json_personal_data.last_name
        user_address.value = json_personal_data.address

        if (json_personal_data.birthday_date != null) {
            user_birthday.value = json_personal_data.birthday_date.split('T')[0]
        }

        user_email.value = json_personal_data.email
        user_phone.value = json_personal_data.telephone_number

        //let management = document.getElementById('management')
        //const logs_text = await (await fetch('/autorisation_logs.xml')).text();
        //autorisation_logs.textContent = logs_text;

        return 'личные данные на сайте успешно заполнены.'
        
    }
    else {
        return 'ошибка заполнения личных данных на сайте.'
    }
}

async function fill_history(user_info) {
    let url = "/take_history"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: user_info
    })


    let history_array = await response.json()
    console.log(history_array)

    let history_list = document.getElementById('history_list')       
    history_array.forEach(element => {
        let history_row = document.createElement('p4')
        history_row.textContent = `
        Тип: ${element.type}, 
        номер: ${element.id}, 
        время: ${element.time_from.substr(0, 5)}-${element.time_to.substr(0, 5)}, 
        `
        history_list.appendChild(history_row)
    });
}

async function change_PD(user_info) {
    let url = "/change_PD"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: user_info
    })

    get_personal_data(user_info);
}