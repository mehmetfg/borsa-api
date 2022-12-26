import React from "react";

// reactstrap components
import {
  Card,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";

import useSWR from "swr";
import dayjs from "dayjs";


import Admin from "layouts/Admin.js";
import Header from "components/Headers/Header.js";
import "dayjs/locale/tr";
import HeaderWhiteBit from "../../components/Headers/HeaderWhiteBit";
import HeaderCoinSpeed from "../../components/Headers/HeaderCoinSpeed";

const api = `${process.env.NEXT_PUBLIC_API_URL}/trades`;

function Tables() {
  const { data, error } = useSWR(api);
  const trades = data;

  if (!data) return null;

  return (
    <>
      <HeaderCoinSpeed/>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                  <th scope="col">Tip</th>
                    <th scope="col">Id</th>
                    <th scope="col">Fiyat</th>
                    <th scope="col">Miktar</th>
                    <th scope="col">USDT Değeri</th>
                    <th scope="col">Gerçekleşme</th>
                  </tr>
                </thead>
                <tbody>
                  {trades?.map(item => {
                    let type = null;

                    if (item.taker_side === "BID")
                      type = <i className="fas fa-arrow-up text-success mr-3" />;
                    else type = <i className="fas fa-arrow-down text-warning mr-3" />

                    return (
                      <tr scope="row" className={
                        item.taker_side === "ASK" ? "text-danger" : ""
                      }>

                       <td>{type}</td>
                        <td>{item.id}</td>
                        <td>{item.price}</td>
                        <td>{item.amount}</td>
                        <td>{Number(item.price) * Number(item.amount)}</td>
                        <td>{dayjs(item.inserted_at).locale("tr").format("DD MMM YYYY HH:mm:ss")}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>

              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Geri</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">İleri</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

Tables.layout = Admin;

export default Tables;
