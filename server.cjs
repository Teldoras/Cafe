// var express = require('express')
// var router = express.Router()

// import * as fs from 'node:fs';
const fs = require('fs');
// import * as http from 'node:http';
const http = require('http');

// import './server_account_data_interactions.cjs'
require('./server/server_account_data_interactions.cjs')();
// import './server_booking_data_interactions.cjs'
require('./server/server_booking_data_interactions.cjs')();
// import './server_admin_data_interactions.cjs'
require('./server/server_admin_data_interactions.cjs')();
// import './server_menu_data_interactions.cjs'
require('./server/server_menu_data_interactions.cjs')();


http.createServer(function (request, response) {

    let action = request.method.toLowerCase();
    if (action == 'post') {
        let request_data = '';
        request.on('data', chunk => {
            request_data += chunk;
        });
        request.on('end', () => {
            let is_error = false;
            switch (request.url) {
                case '/registrate':
                    registrate(request_data).catch((exception) => {
                        is_error = true;
                        if (exception.code == '23505') {
                            send_error(response, exception.code, 'Такой пользователь уже существует.');
                        }
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    })
                    break;
                case '/autorise':
                    autorise(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    });
                    break;
                case '/get_PD':
                    DB_get_PD(request_data).catch((exception) => {
                        is_error = true;
                        console.log('ошибка получения персональных данных.')
                        console.log('данные запроса: ' + request_data)
                        console.log('ошибка: ' + exception)
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    });
                    break;
                case '/change_PD':
                    DB_change_PD(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    });
                    break;
                case '/take_history':
                    DB_take_history(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            console.log(response_data)
                            response.end(response_data);
                        }
                    });
                    break;
                case '/take_TD':
                    DB_take_TD().catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    });
                    break;
                case '/take_BD':
                    DB_take_BD(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    });
                    break;
                case '/send_BD':
                    DB_send_BD(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    });
                    break;
                case '/get_ABD':
                    DB_get_ABD(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            console.log(response_data)
                            response.end(response_data);
                        }
                    })
                    break;
                case '/get_AOD':
                    DB_get_AOD(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    })
                    break;
                case '/change_BS':
                    DB_change_BS(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    })
                    break;
                case '/change_OS':
                    DB_change_OS(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    })
                    break;
                case '/take_GD':
                    DB_take_GD(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    })
                    break;
                case '/send_OD':
                    DB_send_OD(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    })
                    break;
                case '/take_OD':
                    DB_take_OD(request_data).catch((exception) => {
                        is_error = true;
                    }).then((response_data) => {
                        if (is_error == false) {
                            response.end(response_data);
                        }
                    })
                    break;
                default:
                    response.statusCode = 404;
                    response.setHeader('Content-Type', 'text/ain');
                    response.end('Not found');
                    break;
            }
        });
    }
    if (action == 'get') {
        send_response(request, response)
    }

}).listen(8000);

function send_response(request, response) {
    
    let url = request.url
    if (url == '/') {
        url = '/main.html'
    }
    let format = get_format(url)

    let file = read_file('.' + url, format)

    if (file == null) {
        console.log('запрос без файла: ' + url + '.' + format)
        switch (url) {
            case '/registrate':
                // console.log('загрузка скрипта регистрации')
                response.end()
                break;
            case '/autorise':
                // console.log('загрузка скрипта авторизации')
                response.end()
                break;
            case '/get_PD':
                // console.log('загрузка скрипта получения личных данных')
                response.end()
                break;
            case '/change_PD':
                // console.log('загрузка скрипта передачи личных данных')
                response.end()
                break;
            case '/take_TD':
                // console.log('загрузка скрипта получения данных о зале')
                response.end()
                break;
            case '/take_BD':
                // console.log('загрузка скрипта получения данных о бронировании')
                response.end()
                break;
            case '/send_BD':
                // console.log('загрузка скрипта передачи данных бронирования')
                response.end()
                break;
            case '/get_ABD':
                // console.log('загрузка скрипта получения данных администрирования')
                response.end()
                break;
            case '/get_AOD':
                // console.log('загрузка скрипта получения данных администрирования')
                response.end()
                break;
            case '/change_BS':
                // console.log('загрузка скрипта изменения статуса бронирования')
                response.end()
                break;
            case '/change_OS':
                // console.log('загрузка скрипта изменения статуса бронирования')
                response.end()
                break;
            case '/take_GD':
                // console.log('загрузка скрипта получения данных о товарах')
                response.end()
                break;
            case '/send_OD':
                // console.log('загрузка скрипта отправления данных о заказе')
                response.end()
                break;
            case '/take_OD':
                // console.log('загрузка скрипта получения данных о заказе')
                response.end()
                break;
            default:
                response.statusCode = 404;
                response.setHeader('Content-Type', 'text/plain');
                response.end('Not found');
                break;
        }
    }
    else {
        let type_of_content = "text/";
        if (format == "jpg") { type_of_content = "image/" }
        response.writeHeader(200, { "Content-Type": type_of_content + format });
        if (format == "jpg") {
            response.end(file, "Base64");
        }
        else {
            response.write(file);
            response.end();
        }
    }
}

function send_error(response, code, text) {
    response.setHeader('Content-Type', 'text/json');
    let error_info = {}
    error_info.code = code;
    error_info.text = text;
    response.statusCode = 400;
    response.end(JSON.stringify(error_info));
}

function read_file(file_url, file_format) {
    try {
        switch (file_format) {
            case "jpg":
                return fs.readFileSync('' + file_url, 'Base64');
                break;
            case "html":
                try {
                    console.log(`файл "${file_url}"`)
                    return fs.readFileSync('' + file_url, 'utf8');
                } catch (error) {
                    let file_name = get_name(file_url)
                    let new_url = `.${file_name}${file_name}.${file_format}`
                    console.log(`отсутствует файл ${file_url}, новый путь: "${new_url}"`)
                    return fs.readFileSync('' + new_url, 'utf8');
                }
                break;
            default:
                return fs.readFileSync('' + file_url, 'utf8');
                break;
        }
    }
    catch (exception) {
        console.log(`файл "${file_url}" не найден: ${exception}`)
        if (file_format == "jpg") {
            return fs.readFileSync('./resourses/placeholder.jpg', 'Base64');
        }
        else {
            return null;
        }
    }
}

function get_name(file_url) {
    let parts = file_url.split('.');
    let name = parts[parts.length - 2]
    return name;
}

function get_format(file_url) {
    let format = file_url.split('.').pop();
    return format;
}

console.log("Server started at http://localhost:8000")