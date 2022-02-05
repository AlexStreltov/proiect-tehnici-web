const express = require("express");
const cors = require("cors");
const validator = require("validator");
const path = require("path");

const app = express();

// incarcare modele si init db
const db = require("./models");
db.sequelize.sync();

// json rest api
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')))

// // cors
// app.use(cors({
//     origin: "http://localhost:3000"
// }));


// operatie POST pentru prima entitate
app.post("/shelf", async (req, res) => {

    if (!req.body.description || req.body.description.length < 3) {
        return res.status(500).send({
            error: "Invalid description size"
        });
    }

    const shelf = await db.VirtualShelf.create({
        ...req.body,
        creationDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.status(201).send(shelf);
});

// operatie GET pentru prima entitate
app.get("/shelf/:id", async (req, res) => {
    const shelf = await db.VirtualShelf.findByPk(req.params.id);

    // 404 daca nu exista
    if (!shelf) {
        return res.status(404).send();
    }

    return res.status(200).send(shelf);
});

// operatie PUT pentru prima entitate
app.put("/shelf/:id", async (req, res) => {
    console.log(req.params.id);

    const shelf = await db.VirtualShelf.findByPk(req.params.id);

    // 404 daca nu exista
    if (!shelf) {
        return res.status(404).send();
    }

    await db.VirtualShelf.update(req.body, {
        where: {
            id: req.params.id,
        },
    });

    return res.status(200).send();
});

// operatie DELETE pentru prima entitate
app.delete("/shelf/:id", async (req, res) => {
    await db.Book.destroy({
        where: {
            shelfId: req.params.id
        }
    });

    await db.VirtualShelf.destroy({
        where: {
            id: req.params.id,
        },
    });

    return res.status(200).send();
});

app.get("/shelfsize", async (req, res) => {
    const shelves = await db.VirtualShelf.findAll();

    return res.status(200).send({
        noShelves: shelves.length
    })
})

// operatie GET pentru prima entitate, paginare, sortare dupa coloana
app.get("/shelfs", async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.skip) || 0;
    const sortcol = req.query.sortcol;;
    const sort = req.query.sort;

    const cols = ["id", "description", "creationDate"];

    // daca avem o coloana invalida
    if (!cols.includes(sortcol) && sortcol != undefined) {
        return res.status(500).send({
            error: "Invalid sort column"
        });
    }

    // daca avem un mod de sortare incompatibil
    if (sort != "DESC" && sort != "ASC" && sort != undefined) {
        return res.status(500).send();
    }

    let shelfs;

    if (sortcol && sort) {
        shelfs = await db.VirtualShelf.findAll({
            offset,
            limit,
            order: [[sortcol, sort]]
        });
    } else {
        shelfs = await db.VirtualShelf.findAll({
            offset,
            limit
        });
    }

    return res.status(200).send(shelfs);
});

// operatie POST pentru a doua entitate ca subresursa
app.post("/shelf/:id/book", async (req, res) => {

    console.log(req.body)

    if (!req.body.title || req.body.title.length < 5) {
        return res.status(500).send({
            error: "Invalid title size"
        });
    }

    if (!req.body.url || !validator.isURL(req.body.url)) {
        return res.status(500).send({
            error: "Invalid url"
        });
    }

    const book = await db.Book.create({
        ...req.body,
        shelfId: req.params.id,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.status(201).send(book);
});

// operatie GET pentru a doua entitate ca subresursa
app.get("/shelf/:id/book/:bookid", async (req, res) => {
    const book = await db.Book.findByPk(req.params.bookid);

    if (!book) {
        return res.status(404).send();
    }

    return res.status(200).send(book);
});


// operatie PUT pentru a doua entitate ca subresursa
app.put("/shelf/:id/book/:bookid", async (req, res) => {
    const book = await db.Book.findByPk(req.params.id);

    if (!book) {
        return res.status(404).send();
    }

    await db.Book.update(req.body, {
        where: {
            id: req.params.bookid,
        },
    });

    return res.status(200).send();
});

// operatie DELETE pentru a doua entitate ca subresursa
app.delete("/shelf/:id/book/:bookid", async (req, res) => {
    await db.Book.destroy({
        where: {
            id: req.params.bookid,
        },
    });

    return res.status(200).send();
});

// operatie GET pentru a doua entitate ca subresursa
app.get("/shelf/:id/book", async (req, res) => {
    const book = await db.Book.findAll({
        where: {
            shelfId: req.params.id,
        },
    });

    return res.status(200).send(book);
});

// pornim serverul
app.listen(process.env.PORT || 5000, async () => {
    console.log("app start on 5000");
});
