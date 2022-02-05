import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";


const baseUrl = "/shelf"

// read a doua entitate - master - detail
function Book() {
    // id-ul din url
    const {id, listId} = useParams();

    const [data, setData] = useState([]);

    const [dataUrl, setDataUrl] = useState(`${baseUrl}/${listId}/book/${id}`);

    // preluam datele din server
    useEffect(async () => {
        const newData = await axios.get(dataUrl);

        setData(newData.data);
    }, [dataUrl]);

    return (
        <>
        <Container>
            <Row className="my-4">
                <Col className="mx-auto text-center" md={8}>
                    {/* afisare titlu, descriere si url */}
                    <h3>{data.title}</h3>
                    <p>gen: {data.genre}</p>
                    <p>url: <a href={data.url}>{data.url}</a></p>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Book;