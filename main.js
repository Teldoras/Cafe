
let news_tape = document.getElementById('news_tape');
let scroll_data = [0, 0, 0, 0]; // elenent id, state, position. state: 0 - stopped, 1 - moved, 2 - impulsed, 3 - corrected.
let coords = document.getElementById('coords');
let account_box = document.getElementById('account_box')

document.addEventListener('DOMContentLoaded', function () {
    
})

document.addEventListener('mousemove', function (event) {
    let x = event.clientX;
    let y = event.clientY;

    coords.textContent = 'X: ' + x + '   Y: ' + y + '\r\n' +
        scroll_data[0] + ' ' + scroll_data[1] + ' ' + scroll_data[2] + ' ' + scroll_data[3] + '\r\n';
})

//const test = require ('registration');

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

news_tape.addEventListener('mousedown', function () {
    start_movement(this);
})
news_tape.addEventListener('mousemove', function (event) {
    if ((scroll_data[0] == this) && (scroll_data[1] == 1)) {
        scroll_data[2] = scroll_data[2] + event.movementX;
        scroll_data[0].style.left = scroll_data[2] - (scroll_data[0].parentElement.getBoundingClientRect().left + 6) + 'px';
    }
})
news_tape.addEventListener('mouseup', function () {
    this.style.cursor = 'grab';
    if ((scroll_data[0] == this) && (scroll_data[1] == 1)) {
        check_position(this)
    }
})
news_tape.addEventListener('mouseleave', function () {
    this.style.cursor = 'grab';
    if ((scroll_data[0] == this) && (scroll_data[1] == 1)) {
        check_position(this);
    }
})


function start_movement(moved_element_id) {
    scroll_data[0] = moved_element_id;
    scroll_data[1] = 1;
    scroll_data[2] = moved_element_id.getBoundingClientRect().left;
    moved_element_id.style.cursor = 'grabbing';
}

function continue_movement(moved_element_id) {

}

function stop_movement() {
    console.log('stopped')
    scroll_data[0] = 0;
    scroll_data[1] = 0;
    scroll_data[2] = 0;
    scroll_data[3] = 0;
}

function correct_element_position(moved_element_id) {
    if ((scroll_data[0] == moved_element_id) && (scroll_data[1] == 3)) {
        let left_position = moved_element_id.getBoundingClientRect().left;
        let right_position = moved_element_id.getBoundingClientRect().right;
        let left_border = moved_element_id.parentElement.getBoundingClientRect().left;
        let right_border = moved_element_id.parentElement.getBoundingClientRect().right;

        //переменная корректировки
        //рамка родителя, паддинг родителя, собственный марджин
        let correction_value = 6;

        switch (true) {
            case (left_position > (left_border + correction_value - 2)):
                {
                    left_position -= Math.ceil((left_position - (left_border + correction_value)) / 3);
                    moved_element_id.style.left = left_position - (left_border + correction_value + 2) + 'px';
                    //console.log('left bump');
                    break;
                }
            case (right_position < (right_border - correction_value)):
                {
                    left_position += Math.ceil((right_border - (right_position + correction_value - 2)) / 3);
                    moved_element_id.style.left = left_position - (left_border + correction_value) + 'px';
                    //console.log('right bump');
                    break;
                }
            default:
                //console.log('stop movement');
                stop_movement();
                break;
        }
        setTimeout(correct_element_position, 20, moved_element_id);
    }
    else {
        stop_movement();
    }
}
function check_position(moved_element_id) {
    let left_position = moved_element_id.getBoundingClientRect().left;
    let right_position = moved_element_id.getBoundingClientRect().right;
    let left_border = moved_element_id.parentElement.getBoundingClientRect().left;
    let right_border = moved_element_id.parentElement.getBoundingClientRect().right;

    //переменная корректировки
    //рамка родителя, паддинг родителя, собственный марджин
    let correction_value = 6;

    if (left_position > (left_border + correction_value) || right_position < (right_border - correction_value)) {
        scroll_data[1] = 3;
        correct_element_position(moved_element_id);
    }
    else {
        stop_movement();
    }
}

function data_check(users) {
    if (true) {
        return true;
    }
}