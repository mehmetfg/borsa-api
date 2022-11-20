import React from "react";
import useSWR from "swr";

import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import fetcher from "../../client/fetcher";



//const endpoint = `https://big.one/api/v3/viewer/trades?asset_pair_name=CYCE-USDT&limit=200`;
//const endpoint = `https://whitebit.com/api/v1/account/balance?tricker=CYCE`;



const tradeApi = `${process.env.NEXT_PUBLIC_API_URL}/trades`;
const cyceHasanBalance = `${process.env.NEXT_PUBLIC_API_URL}/whitebalance/cyce?account=hasan`;
const usdtHasanBalance = `${process.env.NEXT_PUBLIC_API_URL}/whitebalance/usdt?account=hasan`;
const cyceSusaBalance = `${process.env.NEXT_PUBLIC_API_URL}/whitebalance/cyce?account=susa`;
const usdtSusaBalance = `${process.env.NEXT_PUBLIC_API_URL}/whitebalance/usdt?account=susa`;


function HeaderWhiteBit() {
  const { data: trades } = useSWR(tradeApi);

  const { data: hasanCyce } = useSWR(cyceHasanBalance);
  const { data: hasanUsdt } = useSWR(usdtHasanBalance);

  const { data: susaCyce } = useSWR(cyceSusaBalance);
  const { data: susaUsdt } =  useSWR(usdtSusaBalance);



  let hasanCyceBalance = Number(hasanCyce?.balance)
  hasanCyceBalance = new Intl.NumberFormat('tr', { maximumSignificantDigits: 9 }).format(hasanCyceBalance);

  let hasanUsdtBalance = Number(hasanUsdt?.balance)
  hasanUsdtBalance = new Intl.NumberFormat('tr', { maximumSignificantDigits: 9 }).format(hasanUsdtBalance);

  let susaCyceBalance = 0//Number(susaCyce?.balance)
  susaCyceBalance = new Intl.NumberFormat('tr', { maximumSignificantDigits: 9 }).format(susaCyceBalance);

  let susaUsdtBalance = 0//Number(susaUsdt?.balance)
  susaUsdtBalance = new Intl.NumberFormat('tr', { maximumSignificantDigits: 9 }).format(susaUsdtBalance);
  
  let totalCyceBalance = Number(0) + Number(hasanCyce?.balance)
  totalCyceBalance = new Intl.NumberFormat('tr', { maximumSignificantDigits: 9 }).format(totalCyceBalance);

  let totalUsdtBalance = Number(0) + Number(hasanUsdt?.balance)
  totalUsdtBalance = new Intl.NumberFormat('tr', { maximumSignificantDigits: 9 }).format(totalUsdtBalance);

  if (!trades || trades.length === 0) return null;

  let totalBuy = trades
    .filter(x => x.taker_side === "BID")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  totalBuy = new Intl.NumberFormat('tr', { maximumSignificantDigits: 9 }).format(totalBuy)


  let totalSell = trades
    .filter(x => x.taker_side === "ASK")
    .reduce((sum, item) => sum + Number(item.amount), 0);


  totalSell = new Intl.NumberFormat('tr', { maximumSignificantDigits: 9 }).format(totalSell)

  let volume = trades
    .reduce((sum, item) => sum + Number(item.amount), 0);

  volume = new Intl.NumberFormat('tr', { maximumSignificantDigits: 9 }).format(volume)

  return (
    <>
      <div className="header bg-gradient-dark pb-8 ">

        <Container fluid>

          <div className="header-body">
            <div className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
              Whitebite
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
                        <span className="h2 font-weight-bold mb-0">{hasanCyceBalance} CYCE</span><br />
                        <span className="h2 font-weight-bold mb-0">{hasanUsdtBalance} USDT</span>
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
                        <span className="h2 font-weight-bold mb-0">{susaCyceBalance} CYCE</span><br />
                        <span className="h2 font-weight-bold mb-0">{susaUsdtBalance} USDT</span>
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
                        <span className="h2 font-weight-bold mb-0">{totalCyceBalance} CYCE</span><br />
                        <span className="h2 font-weight-bold mb-0">{totalUsdtBalance} USDT</span>
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

export default HeaderWhiteBit;
