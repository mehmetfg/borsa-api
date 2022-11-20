var axios = require('axios');
var data = JSON.stringify({
    "currency": "USDT",
    "request": "{{request}}",
    "nonce": "{{nonce}}"
});

var config = {
    method: 'post',
    url: 'https://whitebit.com/api/v1/account/balance?ticker=CYCE',
    headers: {
        'Content-Type': 'application/json',
        'X-TXC-APIKEY': 'e18654355d931aa6b9acc8c3af8f7e73',
        'X-TXC-PAYLOAD': '{{payload}}',
        'X-TXC-SIGNATURE': '{{signature}}',
        'e18654355d931aa6b9acc8c3af8f7e73': '14737db361469e21c00bf2e82569dc2f',
        'Cookie': '__cf_bm=Sv1rj5LTnXbfZKrbpDYKpQzo.SpqO7c0oVaRKmi_0R0-1668896149-0-AW84rXL5cmeW0zBUXLtyjUo2i6jGzmu2j3Js1zLqhkieSXPVO7J6V3uFV/VWQJUTWspZIL/cOfsdGx2KAmEcXuw='
    },
    data : data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });