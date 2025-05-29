const { Client } = require('pg')
module.exports = function () {
    this.registrate = async function (dataJSON) {
        const client = await connection_module()

        const data = JSON.parse(dataJSON);
        let query_content = `
            INSERT INTO users (email, first_name, last_name, password) 
            VALUES ('${data.email}', '${data.first_name}', '${data.last_name}', '${data.password}');`;
        const res = await client.query(query_content)
        await client.end()
    }

    this.autorise = async function (dataJSON) {

        const client = await connection_module()
        const data = JSON.parse(dataJSON);

        let query_content = `SELECT password FROM users WHERE email LIKE '${data.email}'`;
        const res = await client.query(query_content)

        if (data.password == res.rows[0].password) {

            data.result = "true";

            query_content = `SELECT (first_name) FROM users WHERE email LIKE '${data.email}'`;
            const res_2 = await client.query(query_content)
            data.first_name = res_2.rows[0].first_name;

        }
        else {
            data.result = "false"
        }
        return data.result;
    }

    this.DB_get_PD = async function (dataJSON) {

        const client = await connection_module()
        const data = JSON.parse(dataJSON);

        let query_content = `SELECT password FROM users WHERE email LIKE '${data.email}';`;
        let res = await client.query(query_content)

        if (data.password == res.rows[0].password) {

            query_content = `
            SELECT first_name, last_name, address, birthday_date, email, telephone_number, user_type 
            FROM users WHERE email LIKE '${data.email}';`;
            res = await client.query(query_content)

            //JSON приводит дату к часовому поясу UTC, далее выполняется поправка для сохранения правильной даты
            if (res.rows[0].birthday_date != null) {
                res.rows[0].birthday_date.setHours(res.rows[0].birthday_date.getHours() + res.rows[0].birthday_date.getTimezoneOffset() / -60);
            }

            //console.log(res.rows[0])
            let json = JSON.stringify(res.rows[0])
            //console.log(JSON.stringify(res.rows[0]))
            return json;
        }
        else {
            return 'ошибка';
        }
    }

    this.DB_change_PD = async function (dataJSON) {

        const client = await connection_module()
        const data = JSON.parse(dataJSON);

        // console.log('смена персональных данных, данные: ', data)

        let query_content = `UPDATE users SET 
        first_name = '${data.first_name}', 
        last_name = '${data.last_name}', 
        address = '${data.address}', 
        birthday_date = ${data.birthday_date}, 
        telephone_number = '${data.phone_number}' 
        WHERE email LIKE '${data.email}';`;

        // console.log('запрос: ', query_content)
        try {
            let res = await client.query(query_content)
        } catch (error) {
            console.log(error)
        }
        
        // console.log('смена персональных данных, результат: ', res)

        await client.end()
    }

    this.DB_take_history = async function (dataJSON) {
        const client = await connection_module()
        const data = JSON.parse(dataJSON);

        // console.log(data)

        let query_content = `SELECT password FROM users WHERE email LIKE '${data.email}';`;
        const res = await client.query(query_content)

        // console.log(res.rows)

        if (data.password == res.rows[0].password) {

            query_content = `
                SELECT * FROM bookings 
                LEFT JOIN bookings_users ON id = booking_id
                WHERE LOWER(user_email) LIKE LOWER('hous_2009@mail.ru')`;
            let res_2 = await client.query(query_content)

            // console.log(res_2)
            // console.log(res_2.rows)
            // console.log(res_2.rows[0])

            let history_list = new Array();
            res_2.rows.forEach(booking => {
                booking.type = 'бронь'
                history_list.push(booking)
            });

            //console.log(history_list)
            let json = JSON.stringify(history_list)
            //console.log(json)
            return json;
        }
        else {
            return 'ошибка';
        }

    }

    this.connection_module = async function () {
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'Cafe website DB',
            password: 'postgres',
            port: 5432,
        })
        await client.connect()

        return client;
    }

}