import BootstrapTable from "react-bootstrap-table-next";
import { Container, Row, Col, Button, Pagination } from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { useNavigate } from "react-router-dom";
import CreateVirtualShelf from "../components/CreateVirtualShelf";

const cols = [
    {
        dataField: 'id',
        text: 'ID'
    },
    {
        dataField: 'description',
        text: 'Descriere'
    },
    {
        dataField: 'creationDate',
        text: 'Data creare',
        editor: {
            type: Type.DATE
        }
    }
]



const baseUrl = "/shelfs?limit=5&sortcol=id&sort=ASC";

const pageSize = 5;

function VirtualShelves() {
    const [data, setData] = useState([]);

    const [dataUrl, setDataUrl] = useState(baseUrl);

    const [currentPage, setCurrentPage] = useState(0);
    const [noitems, setNoItems] = useState(0);

    useEffect(async () => {
        const newData = await axios.get(dataUrl);
        const numberData = await axios.get('/shelfsize');

        setData(newData.data);
        setNoItems(numberData.data.noShelves)
    }, [dataUrl]);

    
    let navigate = useNavigate();

    function navigateTo(event, link) {
        event.preventDefault();
        navigate(link);
    }

    const expandRow = {
        renderer: row => (
          <div>
              {/* read prima entitate */}
            <Button className="mx-2" size="sm" onClick={(e) => navigateTo(e, `/shelfview/${row.id}`)}>View</Button>
            {/* delete prima entiatae */}
            <Button variant="danger" className="mx2-" size="sm" onClick={(e) => {
                axios.delete(`/shelf/${row.id}`)
                setData(data.filter(x => x.id != row.id))
            }}>Delete</Button>
          </div>
        )
      };

    return (
        <>
            <Container>
                <Row className="my-4">
                    <Col className="mx-auto text-center" md={8}>
                        <h2>Rafturi</h2>
                    </Col>
                </Row>
                {/* create pentru prima entitate */}
                <Row className="my-4">
                    <Col className="mx-auto" md={6}>
                        <CreateVirtualShelf/>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col className="mx-auto" md={6}>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col md={12} className="mx-auto">
                        <BootstrapTable
                            keyField="id"
                            data={data}
                            columns={cols}
                            bordered={false}
                            noDataIndication={"Empty..."}
                            expandRow={ expandRow }
                            cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true, afterSaveCell: (oldValue, newValue, row, column) => {
                                // update prima entitate
                                console.log(oldValue, newValue, row, column)

                                const edit = {}
                                edit[column.dataField] = newValue;

                                axios.put(`/shelf/${row.id}`, edit);
                            } }) }
                        />
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col className="mx-auto" md={6}>
                        <Pagination>
                            {[...Array(Math.ceil(noitems/pageSize)).keys()].map(x => {
                                return <Pagination.Item key={x} active={x == currentPage} onClick={e => {
                                    setCurrentPage(x);
                                    setDataUrl(`/shelfs?limit=5&sortcol=id&sort=ASC&skip=${pageSize * x}`)
                                }} >{x}</Pagination.Item>
                            })}
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default VirtualShelves;
