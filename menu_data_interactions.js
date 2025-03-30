async function take_goods_data() {
    let url = "/take_GD"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: ''
    })

    let goods_data = await response.json()

    console.log(goods_data)
    console.log(JSON.stringify(goods_data))

    fill_goods(goods_data)

}

async function send_order_data(order_data) {
    let url = "/send_OD"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: order_data
    })

}