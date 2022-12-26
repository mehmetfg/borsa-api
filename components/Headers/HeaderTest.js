import React from "react";
import useSWR from "swr";
var crypto = require('crypto');
var https = require('https');

import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
var responseBody
const  getdata = () => {




}


function HeaderTest() {
  const apiKey = 'e18654355d931aa6b9acc8c3af8f7e73'; //put here your public key
  const apiSecret = '14737db361469e21c00bf2e82569dc2f'; //put here your secret key
  const requestIn = '/api/v1/account/balance'; //put here request path. For obtaining trading balance use: /api/v4/trade-account/balance
  const hostname = 'whitebit.com'; //domain without last slash. Do not use whitebit.com/
//If the nonce is similar to or lower than the previous request number, you will receive the 'too many requests' error message
  const nonce = Date.now(); //nonce is a number that is always higher than the previous request number
  const nonceWindow = true; //boolean, enable nonce validation in time range of current time +/- 5s, also check if nonce value is unique

  const data = {
    currency: "USDT", //for example for obtaining trading balance for BTC currency
    request: requestIn,
    nonce: nonce,
    nonceWindow: nonceWindow
  }


  const dataJsonStr = JSON.stringify(data);
  const payload = Buffer.from(dataJsonStr).toString('base64');
  const hash = crypto.createHmac('sha512', apiSecret);
  const signature = hash.update(payload).digest('hex');
  var responseBody =""
  const options = {
    hostname: hostname,
    path: requestIn,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-TXC-APIKEY': apiKey,
      'X-TXC-PAYLOAD': payload,
      'X-TXC-SIGNATURE': signature
    }
  }

  const req = https.request(options, res => {
    res.setEncoding('utf8')

    console.log(`statusCode: ${res.statusCode}`)



    res.on('data', chunk => {
      responseBody += chunk;
    });

    res.on('end', () => {
      if (res.statusCode !== 200) {
        console.error("Api call failed with response code", res.statusCode);
      }

      console.log('Body:', responseBody);
    });
  })

  req.on('error', error => {
    console.error("Request error", error);
  })

  console.log(responseBody);


  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">

        <Container fluid>
          <div className="header-body">
            <div className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
              BigOne
            </div>
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">

                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Hasan Bakiye
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"> CYCE</span><br />
                        <span className="h2 font-weight-bold mb-0">USDT</span>
                      </div>

                    </Row>


                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                         Susa Bakiye
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">CYCE</span><br />
                        <span className="h2 font-weight-bold mb-0"> USDT</span>
                      </div>

                    </Row>

                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Toplam Bakiye
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"> CYCE</span><br />
                        <span className="h2 font-weight-bold mb-0"> USDT</span>
                      </div>
                     
                    </Row>

                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Ödenen Fee
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">Yakında</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>




      </div>
    </>
  );
}

export default HeaderTest;
