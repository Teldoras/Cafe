document.addEventListener('DOMContentLoaded', function () {
    autorisation_check();
})

function autorisation_check() {
    if (localStorage.getItem('status') == 'autorised') {

        // let user_info = {}
        // user_info.email = localStorage.getItem('email')
        // user_info.password = localStorage.getItem('password')
        // autorise(JSON.stringify(user_info))

        autorisation_button.style.display = "none";
        account_button.style.display = "inline"
        logout_button.style.display = "inline"
    }
}

menu_button.addEventListener('click', function () {
    window.location.href = 'menu.html';
})

main_button.addEventListener('click', function () {
    window.location.href = 'main.html';
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

    if (window.location.pathname == '/account.html')
    {
        window.location.href = 'main.html';
    }
    else
    {
    autorisation_button.style.display = "inline";
    account_button.style.display = "none"
    logout_button.style.display = "none"
    }
})