const body = document.body;

document.addEventListener('DOMContentLoaded', function () {
    
    create_main_menu();
    autorisation_check();
    create_autorisation_window()
})

function create_main_menu() {

    const main_menu = document.createElement('menu')
    main_menu.id = 'header';

    const menu_button = document.createElement('button')
    menu_button.id = 'menu_button'
    menu_button.textContent = 'Меню/заказать'
    main_menu.appendChild(menu_button)

    const booking_button = document.createElement('button')
    booking_button.id = 'booking_button'
    booking_button.textContent = 'Зал/забронировать'
    main_menu.appendChild(booking_button)

    const main_button = document.createElement('button')
    main_button.id = 'main_button'
    main_button.textContent = 'Ресторан "Главный"'
    main_menu.appendChild(main_button)

    const account_buttons_box = document.createElement('div')
    account_buttons_box.id = 'account_buttons_box'

    const autorisation_button = document.createElement('button')
    autorisation_button.id = 'autorisation_button'
    autorisation_button.textContent = 'Вход/Регистрация'
    account_buttons_box.appendChild(autorisation_button)

    const account_button = document.createElement('button')
    account_button.id = 'account_button'
    account_button.textContent = 'Личный кабинет'
    account_button.style.display = 'none'
    account_buttons_box.appendChild(account_button)

    const logout_button = document.createElement('h5')
    logout_button.id = 'logout_button'
    logout_button.textContent = 'Выход'
    logout_button.style.display = 'none'
    account_buttons_box.appendChild(logout_button)

    main_menu.appendChild(account_buttons_box)

    body.prepend(main_menu);

    activate_main_menu();
}

function create_autorisation_window(){

    const black_box = document.createElement('div')
    black_box.id = 'black_box'
    body.appendChild(black_box)

    const account_box = document.createElement('div')
    account_box.id = 'account_box'
    black_box.appendChild(account_box)

    const autorisation_window = document.createElement('form')
    autorisation_window.id = 'autorisation_window'
    account_box.appendChild(autorisation_window)

    const process_name = document.createElement('h4')
    process_name.id = 'process_name'
    process_name.textContent = 'Авторизация'
    autorisation_window.appendChild(process_name)

    const email_input = document.createElement('input')
    email_input.id = 'email_input'
    email_input.type = 'text'
    email_input.placeholder = 'Адрес электронной почты'
    autorisation_window.appendChild(email_input)

    const password_input = document.createElement('input')
    password_input.id = 'password_input'
    password_input.type = 'text'
    password_input.placeholder = 'Пароль'
    autorisation_window.appendChild(password_input)

    const name_input = document.createElement('input')
    name_input.id = 'name_input'
    name_input.type = 'text'
    name_input.placeholder = 'Имя'
    autorisation_window.appendChild(name_input)

    const surname_input = document.createElement('input')
    surname_input.id = 'surname_input'
    surname_input.type = 'text'
    surname_input.placeholder = 'Фамилия'
    autorisation_window.appendChild(surname_input)

    const exception_text = document.createElement('h5')
    exception_text.id = 'exception_text'
    autorisation_window.appendChild(exception_text)

    const autorisation_accept_button  = document.createElement('button')
    autorisation_accept_button.id = 'autorisation_accept_button'
    autorisation_accept_button.textContent = 'Принять'
    autorisation_window.appendChild(autorisation_accept_button)

    const registration_accept_button  = document.createElement('button')
    registration_accept_button.id = 'registration_accept_button'
    registration_accept_button.textContent = 'Принять'
    autorisation_window.appendChild(registration_accept_button)
    
    const a_c_change_button  = document.createElement('button')
    a_c_change_button.id = 'a_c_change_button'
    a_c_change_button.textContent = 'Зарегестрироваться'
    account_box.appendChild(a_c_change_button)

    activate_autorisation_window()
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
            black_box.style.display = 'flex';
            account_box.style.display = 'flex';
            name_input.style.display = 'none';
            surname_input.style.display = 'none';
            registration_accept_button.style.display = 'none'
        }
    })

    account_button.addEventListener('click', function () {
        if (localStorage.getItem('status') == 'autorised') {
            window.location.href = 'account.html'
        }
        else{
            logout()
        }
    })

    logout_button.addEventListener('click', function () {
        logout()
    })
}

function activate_autorisation_window(){
    autorisation_accept_button.addEventListener('click', async function (event) {
        //const test = await import("./registration.js");
        event.preventDefault();
        let users = event.srcElement.form;
    
        if (data_check(users)) { //проверка правильности введённых данных
            let user_info = {}
            user_info.email = users[0].value
            user_info.password = users[1].value
    
            autorise(JSON.stringify(user_info));
        }
    })

    registration_accept_button.addEventListener('click', async function (event) {
        //const test = await import("./registration.js");
        event.preventDefault();
        let users = event.srcElement.form;
    
        if (data_check(users)) { //проверка правильности введённых данных
            let user_info = {}
            user_info.email = users[0].value
            user_info.password = users[1].value
            user_info.first_name = users[2].value
            user_info.last_name = users[3].value
            registrate(JSON.stringify(user_info));
            //добавить задержку
            //autorise(JSON.stringify(user_info)); //а надо ли
        }
    })

    a_c_change_button.addEventListener('click', function (event) {
        event.preventDefault();
        if (process_name.textContent == 'Авторизация') {
            process_name.textContent = 'Регистрация'
            name_input.style.display = 'block';
            surname_input.style.display = 'block';
            registration_accept_button.style.display = 'block';
            autorisation_accept_button.style.display = 'none';
            a_c_change_button.textContent = 'Авторизоваться'
            return;
        }
        if (process_name.textContent == 'Регистрация') {
            process_name.textContent = 'Авторизация'
            name_input.style.display = 'none';
            surname_input.style.display = 'none';
            registration_accept_button.style.display = 'none';
            autorisation_accept_button.style.display = 'block';
            a_c_change_button.textContent = 'Зарегестрироваться'
            return;
        }
    })

    document.getElementById('black_box').addEventListener('click', function(e) {
        console.log(e.target);
        if (e.target == document.getElementById('black_box'))
        {
            account_box.style.display = 'none';
            black_box.style.display = 'none'
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
    if (response.status == 400) {
        let json = await response.json();
        exception_text.textContent = json.text;
    }
    else {
        window.location.href = 'account.html'
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

    let json = await response.json();

    const data = JSON.parse(user_info)

    if (json) {
        localStorage.setItem('email', data.email);
        localStorage.setItem('password', data.password);
        localStorage.setItem('status', "autorised");
        autorisation_check();
        account_box.style.display = 'none';
        black_box.style.display = 'none'
    }
    else {
        exception_text.textContent = 'Неверный логин/пароль.';
    }
}

function logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('status');

    if (window.location.pathname != '/main.html' || '/menu.html' || '/booking.html') {
        window.location.href = 'main.html';
    }
    else {
        autorisation_button.style.display = "inline";
        account_button.style.display = "none"
        logout_button.style.display = "none"
    }
}

function data_check(users) {
    if (true) {
        return true;
    }
}