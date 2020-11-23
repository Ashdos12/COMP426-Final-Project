var user = document.getElementById("author_name").value;
console.log("profile.js loading!!!!!");

export const renderBook = function(author, desc, image, isbn, title) {
    return '<div class="book row"><div class="column"><img src="' +
        image + '" alt="book image" width="100" height="150"></div><div class="column right"><button class="bookTitle">' +
        title + '</button><p class="sects">ISBN-10: </p><p class="isbn stats">' +
        isbn + '</p><p class="sects">Author(s): </p><p class="author stats">' +
        author + '</p><p class="sects">Summary: </p><p class="description stats">' +
        desc + '</p></div></div>';
}

export const renderReview = function(id, text, author) {
    if (author == user) {
        return '<div id=' + id + ' class="posted"><div><h2>' + author + '</h2><p id=' + id + 'text>' + text + '</p><br><button class="ed">edit</edit><button class="delete">delete</button></div><br><br><br></div>';
    } else {
        return '<div id=' + id + ' class="posted"><div><h2>' + author + '</h2><p id=' + id + 'text>' + text + '</p><br></div><br><br><br></div>';
    }
}
export async function getCommentsByAuthor(author) {
    const result = await axios({
        method: 'get',
        url: "search/?q=" + author,
    }).then(response => {
        console.log(response);
        response = response.data.data;
        console.log(response);
        for (var i = 0; i < response.length; i++) {
            if (response[i].attributes.author == user) {
                $('.append').append(renderReview(response[i].id, response[i].attributes.body, response[i].attributes.author));
            }
        }
        // response.data.forEach(element => {
        //     $('#replace').append(renderReview(element.id, element.body));
        // });
    }).catch(error => {
        console.log(error.response);
    });
    return result;
}

export async function Interactions() {
    let root = $('#root');
    getCommentsByAuthor(user);
};
$(function() {
    Interactions();
});