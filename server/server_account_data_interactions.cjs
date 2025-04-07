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

            // try {

            //     update_autorisation_log(data);
            // }
            // catch (ex) {
            //     console.error(ex)
            // }
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
        let query_content = `UPDATE users SET 
        first_name = '${data.first_name}', 
        last_name = '${data.last_name}', 
        address = '${data.address}', 
        birthday_date = '${data.birthday_date}', 
        telephone_number = '${data.phone_number}' 
        WHERE email LIKE '${data.email}';`;

        const res = await client.query(query_content)

        await client.end()
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