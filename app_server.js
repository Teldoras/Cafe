// var express = require('express')
// var router = express.Router()
var fs = require('fs');
var http = require('http');
require('./database_interactions')();

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

                            console.log('попытка логина')
                            console.log('ответ базы данных: ' + something)
                            response.end(something);
                        }
                    });
                    break;
                case '/get_PD':
                    get_PD(data).catch((exception) => {
                        console.log('Ошибка (получение данных)');
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                    }).then((something) => {
                        if (is_error == false) {

                            console.log('попытка получить данные')
                            console.log('ответ базы данных: ' + something)
                            response.end(something);
                        }
                    });
                    break;
                case '/change_PD':
                    change_PD(data).catch((exception) => {
                        console.log('Ошибка (внесение данных)');
                        is_error = true;
                        console.log('Ошибка, код:' + exception.code);
                    }).then((something) => {
                        if (is_error == false) {
                            response.end(something);
                        }
                    });
                    break;
                default:
                    response.statusCode = 404;
                    response.setHeader('Content-Type', 'text/plain');
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
                console.log('загрузка скрипта данных')
                response.end()
                break;
            case '/change_PD':
                console.log('загрузка скрипта данных 2')
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
        return null;
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