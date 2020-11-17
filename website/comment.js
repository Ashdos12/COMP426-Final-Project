const comment_data = require('data-store')({ path: process.cwd() + '/data/comment.json' });
class comment {
    constructor (id, author, body, isbn) {
        this.isbn = isbn;
        this.id = id;
        this.author = author;
        this.body = body;
    }

    update () {
        comment_data.set(this.id.toString(), this);
    }

    delete () {
        comment_data.del(this.id.toString());
    }
}

comment.getAllIDs = () => {
    //return ["test"];
    return Object.keys(comment_data.data).map((id => {return parseInt(id);}));
}

comment.findByID = (id) => {
    let cdata = comment_data.get(id);
    if (cdata != null) {
        return new comment(cdata.id, cdata.author, cdata.body, cdata.isbn);
    }
    return null;
}
comment.findByISBN = (isbn) => {
    let arr=[];
    Object.values(comment_data.data).forEach(element => {
        //console.log(element.body);
        if(element.isbn==isbn) {
            console.log(element);
              arr.push(new comment(element.id, element.author, element.body));
        }
    })

    if (arr != null) {
        return arr;
    }

    return null;
}


comment.next_id = comment.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

comment.create = (author, body, isbn) => {
    id = comment.next_id;
    comment.next_id += 1;
    let com = new comment(id, author, body, isbn);
    comment_data.set(com.id.toString(), com);
    return com;
}

module.exports = comment;
