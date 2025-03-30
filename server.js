// var express = require('express')
// var router = express.Router()
var fs = require('fs');
var http = require('http');
require('./server_account_data_interactions')();
require('./server_booking_data_interactions')();
require('./server_admin_data_interactions')();
require('./server_menu_data_interactions')();


http.createServer(function (request, response) {

    let action = request.method.toLowerCase();
    if (action == 'post') {
        let data = '';
        request.on('data', chunk => {
            data += chunk;
        });
        request.on('end', () => {
            console.log(data);
            let is_error = false;
            switch (request.url) {
                case '/registrate':
                    registrate(data).catch((exception) => {
                        console.log('Ошибка (регистрации)');
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                        if (exception.code == '23505') {

                            send_error(response, exception.code, 'Такой пользователь уже существует.');
                        }
                    }).then(() => {
                        if (is_error == false) {
                            console.log('успешная регистрация')
                            response.end();
                        }
                    })
                    break;
                case '/autorise':
                    autorise(data).catch((exception) => {
                        console.log('Ошибка (авторизации)');
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                    }).then((something) => {
                        if (is_error == false) {

                            console.log('попытка сервера совершить авторизацию')
                            console.log('ответ базы данных (авторизация): ' + something)
                            response.end(something);
                        }
                    });
                    break;
                case '/get_PD':
                    DB_get_PD(data).catch((exception) => {
                        console.log('Ошибка (получение данных)');
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                    }).then((something) => {
                        if (is_error == false) {

                            console.log('попытка сервера получить личные данные')
                            console.log('ответ базы данных (получение личных данных): ' + something)
                            response.end(something);
                        }
                    });
                    break;
                case '/change_PD':
                    DB_change_PD(data).catch((exception) => {
                        console.log('Ошибка (внесение данных)');
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                    }).then((something) => {
                        if (is_error == false) {
                            response.end(something);
                        }
                    });
                    break;
                case '/take_TD':
                    DB_take_TD().catch((exception) => {
                        console.log('Ошибка (получение данных о столиках)');
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                        console.log(exception);
                    }).then((something) => {
                        if (is_error == false) {
                            response.end(something);
                        }
                    });
                    break;
                case '/take_BD':
                    DB_take_BD(data).catch((exception) => {
                        console.log('Ошибка (получение данных о бронях)');
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                        console.log(exception);
                    }).then((something) => {
                        if (is_error == false) {
                            response.end(something);
                        }
                    });
                    break;
                case '/send_BD':
                    DB_send_BD(data).catch((exception) => {
                        console.log('Ошибка (создание нового бронирования)');
                        console.log('данные: ' + data)
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                        console.log(exception);
                    }).then((something) => {
                        if (is_error == false) {
                            console.log('данные: ' + data)
                            response.end(something);
                        }
                    });
                    break;
                case '/get_ABD':
                    DB_get_ABD(data).catch((exception) => {
                        console.log('Ошибка (получение данных админа)');
                        console.log('данные: ' + data)
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                        console.log(exception);
                    }).then((something) => {
                        if (is_error == false) {
                            console.log('данные: ' + data)
                            response.end(something);
                        }
                    })
                case '/get_AOD':
                    DB_get_AOD(data).catch((exception) => {
                        console.log('Ошибка (получение данных админа)');
                        console.log('данные: ' + data)
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                        console.log(exception);
                    }).then((something) => {
                        if (is_error == false) {
                            console.log('данные: ' + data)
                            response.end(something);
                        }
                    })
                    break;
                case '/change_BS':
                    DB_change_BS(data).catch((exception) => {
                        console.log('Ошибка (изменение статуса бронирования)');
                        console.log('данные: ' + data)
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                        console.log(exception);
                    }).then((something) => {
                        if (is_error == false) {
                            console.log('данные: ' + data)
                            response.end(something);
                        }
                    })
                    break;
                case '/take_GD':
                    DB_take_GD(data).catch((exception) => {
                        console.log('Ошибка (получение данных о товарах)');
                        console.log('данные: ' + data)
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                        console.log(exception);
                    }).then((something) => {
                        if (is_error == false) {
                            //console.log('данные: ' + data)
                            response.end(something);
                            console.log('данные: ' + something)
                        }
                    })
                    break;
                case '/send_OD':
                    DB_send_OD(data).catch((exception) => {
                        console.log('Ошибка (отправка данных о заказе)');
                        console.log('данные: ' + data)
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                        console.log(exception);
                    }).then((something) => {
                        if (is_error == false) {
                            //console.log('данные: ' + data)
                            response.end(something);
                            console.log('данные: ' + something)
                        }
                    })
                    break;
                case '/take_OD':
                    DB_take_OD(data).catch((exception) => {
                        console.log('Ошибка (получение данных о заказе)');
                        console.log('данные: ' + data)
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                        console.log(exception);
                    }).then((something) => {
                        if (is_error == false) {
                            //console.log('данные: ' + data)
                            response.end(something);
                            console.log('данные: ' + something)
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
    let name = get_name(request.url)
    if (name == '/') {
        name = '/main.html'
    }
    let format = get_format(name)

    const file = read_file('.' + name, format)
    if (file == null) {
        console.log('запрос без файла: ' + name + '.' + format)
        switch (name) {
            case '/registrate':
                console.log('загрузка скрипта регистрации')
                response.end()
                break;
            case '/autorise':
                console.log('загрузка скрипта авторизации')
                response.end()
                break;
            case '/get_PD':
                console.log('загрузка скрипта получения личных данных')
                response.end()
                break;
            case '/change_PD':
                console.log('загрузка скрипта передачи личных данных')
                response.end()
                break;
            case '/take_TD':
                console.log('загрузка скрипта получения данных о зале')
                response.end()
                break;
            case '/take_BD':
                console.log('загрузка скрипта получения данных о бронировании')
                response.end()
                break;
            case '/send_BD':
                console.log('загрузка скрипта передачи данных бронирования')
                response.end()
                break;
            case '/get_ABD':
                console.log('загрузка скрипта получения данных администрирования')
                response.end()
                break;
            case '/get_AOD':
                console.log('загрузка скрипта получения данных администрирования')
                response.end()
                break;
            case '/change_BS':
                console.log('загрузка скрипта изменения статуса бронирования')
                response.end()
                break;
            case '/take_GD':
                console.log('загрузка скрипта получения данных о товарах')
                response.end()
                break;
            case '/send_OD':
                console.log('загрузка скрипта отправления данных о заказе')
                response.end()
                break;
            case '/take_OD':
                console.log('загрузка скрипта получения данных о заказе')
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

function read_file(file_name, file_format) {
    try {
        if (file_format == "jpg") {
            return fs.readFileSync(file_name, 'Base64');
        }
        else {
            return fs.readFileSync(file_name, 'utf8');
        }
    }
    catch (exception) {
        console.log('файл не найден: ' + exception)
        if (file_format == "jpg") {
            return fs.readFileSync('./resourses/placeholder.jpg', 'Base64');
        }
        else {
            return null;
        }
    }
}

function get_format(file_url) {
    let url = file_url;

    format = file_url.split('.').pop();

    return format;
}

function get_name(file_url) {
    return file_url;
}

console.log("Server started at http://localhost:8000")