const body = document.body;

document.addEventListener('DOMContentLoaded', function () {
    create_main_menu();
    autorisation_check();
})

function create_main_menu() {

    let main_menu = document.createElement('menu')
    main_menu.id = 'header';

    let menu_button = document.createElement('button')
    menu_button.id = 'menu_button'
    menu_button.textContent = 'Меню/заказать'
    main_menu.appendChild(menu_button)

    let booking_button = document.createElement('button')
    booking_button.id = 'booking_button'
    booking_button.textContent = 'Зал/забронировать'
    main_menu.appendChild(booking_button)

    let main_button = document.createElement('button')
    main_button.id = 'main_button'
    main_button.textContent = 'Ресторан "Главный"'
    main_menu.appendChild(main_button)

    let account_box = document.createElement('div')
    account_box.id = 'account_buttons_box'

    let autorisation_button = document.createElement('button')
    autorisation_button.id = 'autorisation_button'
    autorisation_button.textContent = 'Вход/Регистрация'
    account_box.appendChild(autorisation_button)

    let account_button = document.createElement('button')
    account_button.id = 'account_button'
    account_button.textContent = 'Личный кабинет'
    account_button.style.display = 'none'
    account_box.appendChild(account_button)

    let logout_button = document.createElement('h5')
    logout_button.id = 'logout_button'
    logout_button.textContent = 'Выход'
    logout_button.style.display = 'none'
    account_box.appendChild(logout_button)

    main_menu.appendChild(account_box)

    body.prepend(main_menu);

    activate_main_menu();

}

function activate_main_menu() {
    menu_button.addEventListener('click', function () {
        window.location.href = 'menu.html';
    })

    main_button.addEventListener('click', function () {
        window.location.href = 'main.html';
    })

    booking_button.addEventListener('click', function () {
        window.location.href = 'booking.html';
    })

    autorisation_button.addEventListener('click', function () {
        if (localStorage.getItem('status') == 'autorised') {
            window.location.href = 'account.html';
        }
        else {
            account_box.style.visibility = 'visible';
            autorisation_window.style.display = 'flex';
            name_input.style.display = 'none';
            surname_input.style.display = 'none';
            registration_accept_button.style.display = 'none'
        }
    })

    account_button.addEventListener('click', function () {
        if (localStorage.getItem('status') == 'autorised') {
            window.location.href = './account.html';
        }
    })

    logout_button.addEventListener('click', function () {

        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('status');

        if (window.location.pathname == '/account.html') {
            window.location.href = 'main.html';
        }
        else {
            autorisation_button.style.display = "inline";
            account_button.style.display = "none"
            logout_button.style.display = "none"
        }
    })
}

function autorisation_check() {
    if (localStorage.getItem('status') == 'autorised') {

        autorisation_button.style.display = "none";
        account_button.style.display = "inline"
        logout_button.style.display = "inline"
    }
    else {
        if (window.location.pathname == '/account.html') {
            window.location.href = 'main.html';
        }
    }
}

async function registrate(user_info) {
    let url = "/registrate"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: user_info
    })
    //console.log('данные регистрации: ' + user_info);
    if (response.status == 400) {
        let json = await response.json();
        exception_text.textContent = json.text;
        //console.log('данные регистрации (возврат джейсона): ' + json.text);
    }
    else {
        window.location.href = './account.html';
        //window.location.href;
    }
}

async function autorise(user_info) {
    let url = "/autorise"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: user_info
    })
    //console.log('данные авторизации: ' + user_info);

    let json = await response.json();

    const data = JSON.parse(user_info)

    if (json) {
        localStorage.setItem('email', data.email);
        localStorage.setItem('password', data.password);
        localStorage.setItem('status', "autorised");
        autorisation_check();
        account_box.style.visibility = "hidden"
        //window.location.href = './account.html';
    }
    else {
        exception_text.textContent = 'Неверный логин/пароль.';
    }
}