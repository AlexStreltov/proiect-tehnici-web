import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import CreateBook from "../components/CreateBook";

// coloanele tabelului
const cols = [
    {
        dataField: 'id',
        text: 'ID'
    },
    {
        dataField: 'title',
        text: 'Title'
    },
    {
        dataField: 'genre',
        text: 'Gen',
        editor: {
            type: Type.SELECT,
            options: [{
                value: 'TRAGEDY',
                label: 'TRAGEDY'
            }, {
                value: 'COMEDY',
                label: 'COMEDY'
            }, {
                value: 'ADVENTURE',
                label: 'ADVENTURE'
            }, {
                value: 'MISTERY',
                label: 'MISTERY'
            }]
        }
    },
    {
        dataField: 'url',
        text: 'URL'
    }
]


const baseUrl = "/shelf";

// read pentru prima entitate
function VirtualShelf() {
    // id-ul din url
    const {id} = useParams();

    const [data, setData] = useState([]);
    const [book, setBook] = useState([]);

    const [dataUrl, setDataUrl] = useState(`${baseUrl}/${id}`);

    // preluam datele, datele shelf si books
    useEffect(async () => {
        const newData = await axios.get(dataUrl);

        setData(newData.data);

        const newBook = await axios.get(`${dataUrl}/book`)

        setBook(newBook.data);
    }, [dataUrl]);

    let navigate = useNavigate();

    function navigateTo(event, link) {
        event.preventDefault();
        navigate(link);
    }

    // expand rand pentru view si delete
    const expandRow = {
        renderer: row => (
          <div>
              {/* buton view */}
            <Button className="mx-2" size="sm" onClick={(e) => navigateTo(e, `/shelfview/${id}/book/${row.id}`)}>View</Button>
            {/* buton delete - DELETE pentru a doua entitate */}
            <Button variant="danger" className="mx-2" size="sm" onClick={(e) => {
                axios.delete(`/shelf/${id}/book/${row.id}`)
                setBook(book.filter(x => x.id != row.id))
            }}>Delete</Button>
          </div>
        )
      };

    return (
        <>
        {/* layout grid */}
        <Container>
            <Row className="my-4">
                <Col className="mx-auto text-center" md={8}>
                    {/* detaliile shelfei */}
                    <h2>Raft</h2>
                    <p>Data Creare: {data.creationDate}</p>
                    <p>Descriere: {data.description}</p>
                </Col>
            </Row>
            <Row className="my-4">
                    <Col className="mx-auto" md={6}>
                        {/* formular create book */}
                        <CreateBook id={id} />
                    </Col>
                </Row>
            <Row className="my-4">
                    <Col md={12} className="mx-auto">
                        {/* tabelul cu bookuri - read pentru a doua entitate */}
                        <BootstrapTable
                            keyField="id"
                            data={book}
                            columns={cols}
                            bordered={false}
                            noDataIndication={"Empty..."}
                            expandRow={ expandRow }
                            cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true, afterSaveCell: (oldValue, newValue, row, column) => {
                                console.log(oldValue, newValue, row, column)
                                // update a doua entitate
                                const edit = {}
                                edit[column.dataField] = newValue;

                                axios.put(`/shelf/${id}/book/${row.id}`, edit);
                            } }) }
                        />
                    </Col>
                </Row>
        </Container>
        </>
    );
}

export default VirtualShelf;