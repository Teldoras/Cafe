async function change_PD(user_info) {
    let url = "/change_PD"
    let response = await fetch(url, {
       method: "POST",
       headers: {
          "Content-Type": "text/json"
       },
       body: user_info
    })

    get_PD(user_info);
 }