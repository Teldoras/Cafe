const { Client } = require('pg')
module.exports = function () {
    this.DB_take_GD = async function () {
        // console.log('получение данных о товарах')
        const client = await connection_module()

        let query_content = `SELECT * FROM goods`;
        const res = await client.query(query_content)

        let json = JSON.stringify(res.rows)
        // console.log('попытка сформировать данные' + json)

        return json;
    }

    this.DB_send_OD = async function (data) {
        // console.log('внесение данных о заказе')
        const client = await connection_module()

        // console.log(data)
        let dataJSON = JSON.parse(data)
        
        let query_content = `INSERT INTO orders (user_name, contacts, address, time) VALUES (\'`
        + dataJSON.user_name + `\', \'`
        + dataJSON.email + `\', \'`
        + dataJSON.address + `\', \'`
        + dataJSON.time + `\') RETURNING id;`

        let res = await client.query(query_content)
        const order_id = res.rows[0].id

        query_content = `INSERT INTO orders_goods (order_id, goods_id, quantity) VALUES `
        for (let i = 0; i < dataJSON.goods.length; i++) {
            query_content += `(\'` 
            + order_id + `\', \'` 
            + dataJSON.goods[i].id + `\', \'`
            + dataJSON.goods[i].quantity + `\')`;
            if (i < dataJSON.goods.length - 1){
                query_content += ','
            }
            else{
                query_content += ';'
            }
        }

        res = await client.query(query_content)
        //let json = JSON.stringify(res.rows)
        // console.log('попытка сформировать данные' + json)
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