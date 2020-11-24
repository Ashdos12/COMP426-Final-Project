const express = require('express');

const app = express();

const comment = require('./comment.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});

app.get('/comment', (req, res) => {
    res.json(comment.getAllIDs());
    return;
});
app.get('/data', (req, res) => {
    res.sendFile('/data/comment.json', { root: __dirname });
});

app.get('/comment/:id', (req, res) => {
    let b = comment.findByID(req.params.id);
    if (b == null) {
        res.status(404).send("comment not found");
        return;
    }
    res.json(b);
});

app.get('/comment/isbn/:isbn', (req, res) => {
    let b = comment.findByISBN(req.params.isbn);
    if (b == null) {
        res.status(404).send("comment not found");
        return;
    }
    res.json(b);
});

app.post('/comment', (req, res) => {
    let body = req.body.body;
    let author = req.body.author;
    let isbn = req.body.isbn;
    let c = comment.create(author, body, isbn);
    return res.json(c);
    /*
    let {isbn, id, author, rating} = req.body;

    let c = comment.create(isbn, id, author, rating);
    if (c == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(c);
    */
});

app.put('/comment/:id', (req, res) => {
    let c = comment.findByID(req.params.id);
    if (c == null) {
        res.status(404).send("Book not found");
        return;
    }

    let { body } = req.body;
    c.body = body;
    c.update();

    res.json(c);
});

app.delete('/comment/:id', (req, res) => {
    let c = comment.findByID(req.params.id);
    if (c == null) {
        res.status(404).send("Book not found");
        return;
    }
    c.delete();
    res.json(true);
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});