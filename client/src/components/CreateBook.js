import { Form, Button } from "react-bootstrap";
import { useState } from "react";

import axios from "axios";

// create a doua entitate master-detail - bootstrap form
function CreateBook({id}) {
    // state-uri
    const [title, setTitle] = useState("");
    const [url , setUrl] = useState("");
    const [category, setCategory] = useState("COMEDY");

    // submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`/shelf/${id}/book`, {
            title,
            url,
            genre: category,
            shelfId: id
        })  
    }

    return (
        <Form>
            {/* titlul cartii */}
            <Form.Group className="mb-3">
                <Form.Label>Titlu</Form.Label>
                <Form.Control type="text" placeholder="titlu" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>

            {/* url */}
            <Form.Group className="mb-3">
                <Form.Label>Url</Form.Label>
                <Form.Control type="url" placeholder="url" value={url} onChange={e => setUrl(e.target.value)} />
            </Form.Group>

            {/* gen */}
            <Form.Group className="mb-3">
                <Form.Label>Categorie</Form.Label>
                <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="TRAGEDY">TRAGEDY</option>
                    <option value="COMEDY">COMEDY</option>
                    <option value="ADVENTURE">ADVENTURE</option>
                    <option value="MISTERY">MISTERY</option>
                </Form.Select>
            </Form.Group>

            {/* submit */}
            <Button variant="primary" type="button" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
}

export default CreateBook;
