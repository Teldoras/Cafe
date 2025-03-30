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
    console.log('данные для авторизации: ' + user_info)
    console.log('клиент получает данные о пользователе.')
    console.log('попытка вывести напрямую: ' + json_personal_data)
    console.log('попытка вывести stringify: ' + JSON.stringify(json_personal_data))

    if (true) {
        user_name.value = json_personal_data.first_name
        user_surname.value = json_personal_data.last_name
        user_address.value = json_personal_data.address

        if (json_personal_data.birthday_date != null) {
            user_birthday.value = json_personal_data.birthday_date.split('T')[0]
        }

        user_email.value = json_personal_data.email
        user_phone.value = json_personal_data.telephone_number

        //let management = document.getElementById('management')
        if (json_personal_data.user_type >= 1) {
            create_admin_window()
            management.style.display = 'inline';
            management.style.visibility = 'visible';
        }
        else {
            management.style.display = 'none';
            management.style.visibility = 'hidden';
        }

        //const logs_text = await (await fetch('/autorisation_logs.xml')).text();
        //autorisation_logs.textContent = logs_text;

        return 'личные данные на сайте успешно заполнены.'
    }
    else {
        return 'ошибка заполнения личных данных на сайте.'
    }
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