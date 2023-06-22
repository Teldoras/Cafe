


document.addEventListener('DOMContentLoaded', function () {
    administrator_check();
    autorisation_check();
})

function administrator_check() {

}

function autorisation_check() {
    if (localStorage.getItem('status') == 'autorised') {
        let user_info = {}
        user_info.email = localStorage.getItem('email')
        user_info.password = localStorage.getItem('password')
        get_PD(JSON.stringify(user_info))

        autorisation_button.style.display = "none";
        account_button.style.display = "inline"
        logout_button.style.display = "inline"
    }
    else {
        window.location.href = 'main.html';
    }
}

main_button.addEventListener('click', function () {
    window.location.href = 'main.html';
})

// logout_button.addEventListener('click', function () {

//     localStorage.removeItem('email');
//     localStorage.removeItem('password');
//     localStorage.removeItem('status');

//     window.location.href = 'main.html';
// })

personal_data_confirm_button.addEventListener('click', function (event) {

    event.preventDefault();
    let users = event.srcElement.form;

    let user_info = {}
    user_info.first_name = users[0].value
    user_info.last_name = users[1].value
    user_info.address = users[2].value
    user_info.birthday_date = users[3].value
    user_info.email = users[4].value
    user_info.phone_number = users[5].value

    console.log('персональные данные с сайта (JSON): ' + user_info)
    console.log('персональные данные с сайта (строка): ' + JSON.stringify(user_info))
    change_PD(JSON.stringify(user_info));

})