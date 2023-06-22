const { Client } = require('pg')
module.exports = function () {
    this.registrate = async function (dataJSON) {
        const client = await connection_module()

        const data = JSON.parse(dataJSON);
        let query_content = `INSERT INTO users (email, first_name, last_name, password) VALUES (\'`
            + data.email + `\', \'` + data.first_name + `\', \'` + data.last_name + `\', \'` + data.password + `\');`;
        const res = await client.query(query_content)
        //console.log('проверка' + res.rows)
        await client.end()
    }

    this.autorise = async function (dataJSON) {

        const client = await connection_module()

        const data = JSON.parse(dataJSON);
        let query_content = 'SELECT (password) FROM users WHERE email LIKE \'' + data.email + '\'';
        const res = await client.query(query_content)
        console.log('часть строки из базы: ' + res.rows)

        if (data.password == res.rows[0].password) {
            data.result = "true";
        }
        else {
            data.result = "false"
        }
        return data.result;
    }

    this.get_PD = async function (dataJSON) {
        const client = await connection_module()

        const data = JSON.parse(dataJSON);
        let query_content = 'SELECT password FROM users WHERE email LIKE \'' + data.email + '\'';
        let res = await client.query(query_content)

        if (data.password == res.rows[0].password) {

            query_content = 'SELECT first_name, last_name, address, birthday_date, email, telephone_number FROM users WHERE email LIKE \'' + data.email + '\'';
            res = await client.query(query_content)

            //JSON приводит дату к часовому поясу UTC, далее выполняется поправка для сохранения правильной даты
            if (res.rows[0].birthday_date != null) {
                res.rows[0].birthday_date.setHours(res.rows[0].birthday_date.getHours() + res.rows[0].birthday_date.getTimezoneOffset() / -60);
            }

            let json = JSON.stringify(res.rows[0])
            return json;
        }
        else {
            return 'ошибка';
        }
    }

    this.change_PD = async function (dataJSON) {

        //console.log('1')
        const client = await connection_module()

        //console.log('1')
        const data = JSON.parse(dataJSON);
        //console.log('2')
        let query_content = `UPDATE users 
        SET first_name = \'` + data.first_name + `\'
         , last_name = \'` + data.last_name + `\'
         , address = \'` + data.address + `\'
         , birthday_date = \'` + data.birthday_date + `\'
         WHERE email LIKE \'` + data.email + `\'`;

        //console.log('Строка подающаяся в базу: ' + query_content)

        const res = await client.query(query_content)

        // 

        await client.end()
    }

    this.connection_module = async function () {
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'Cafe website user data',
            password: 'cafe123',
            port: 5432,
        })
        await client.connect()
        return client;
    }
}