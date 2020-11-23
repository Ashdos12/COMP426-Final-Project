google.books.load();
let baseUrl = window.location.href;
baseUrl = "search/";
console.log(baseUrl);
export const renderBook = function(author, desc, image, isbn, title) {
    return '<div class="book row"><div class="column"><img src="' +
        image + '" alt="book image" width="100" height="150"></div><div class="column right"><button class="bookTitle">' +
        title + '</button><p class="sects">ISBN-10: </p><p class="isbn stats">' +
        isbn + '</p><p class="sects">Author(s): </p><p class="author stats">' +
        author + '</p><p class="sects">Summary: </p><p class="description stats">' +
        desc + '</p></div></div>';
}
export const renderReview = function(id, text) {
    console.log(id);
    return '<div id=' + id + ' class="posted"><div><h2>Anonymous</h2><p id=' + id + 'text>' + text + '</p><br><button class="ed">edit</edit><button class="delete">delete</button></div><br><br><br></div>';
}
export const renderEditReview = function(isbn) {
    return '<div id=' + isbn + ' class="edit"><h2>Write your review</h2><textarea class="yourText" rows="5"cols="50"></textarea><br><button class="post">post</button></div>';
}
export const renderUpdateReview = function(id, text) {
    return '<div id=' + id + ' class="edit"><h2>Update your review</h2><textarea class="yourText" rows="5"cols="50">' + text + '</textarea><br><button class="update">update</button></div>';
}
export const renderBookPage = function(title, author, isbn, desc, image) {
    return '<div id="replace"><h1>' + title + '</h1><div id="bookPage"><div class="bookPage row"><div class="column"><img src="' +
        image + '" alt="book image" width="200" height="300"></div><div class="column right"><h2>Author(s): <h2 class="bookStats">' +
        author + '</h2><h2>ISBN-10: </h2><h2 class="isbn bookStats">' +
        isbn + '</h2><h2>Summary: </h2><h2 class="bookStats">' +
        desc + '</h2><button class="review">review</button></div></div></div></div>';
}
export const handleNewReviewButton = function(event) {
    let isbn = $(".isbn")[0].innerHTML;
    return $("#bookPage").append(renderEditReview(isbn));
}
export const handlePostReviewButton = function(event) {
    let text = $(".yourText")[0].value;
    let isbn = event.target.parentElement.id;
    postReview(isbn, text);
}
export const handleBookPage = function(event) {
    let obj = event.target.parentElement.parentElement;
    let title = $(obj).find(".bookTitle")[0].innerHTML;
    let isbn = $(obj).find(".isbn")[0].innerHTML;
    let author = $(obj).find(".author")[0].innerHTML;
    let desc = $(obj).find(".description")[0].innerHTML;
    let img = $(obj).find("img").attr("src");
    $(event.target.parentElement.parentElement.parentElement.parentElement).replaceWith(renderBookPage(title, author, isbn, desc, img));
    getCommentsByISBN(isbn);

}
export async function getCommentsByISBN(isbn) {
    const result = await axios({
        method: 'get',
        url: baseUrl + "?q=" + isbn,
    }).then(response => {
        console.log(response);
        response = response.data.data;
        console.log(response);
        for (var i = 0; i < response.lenght; i++) {
            if (response[i].attributes.isbn == isbn) {
                $('#replace').append(renderReview(response[i].attributes.id, response[i].attributes.body));
            }
        }
        // response.data.forEach(element => {
        //     $('#replace').append(renderReview(element.id, element.body));
        // });
    });
    return result;
}
export async function postReview(isbn, text) {
    console.log(baseUrl);
    const result = await axios({
        method: 'post',
        url: baseUrl + 'comment',
        data: {
            author: "Anonymous",
            body: text,
            isbn: isbn,
        }
    }).then(response => $(".edit").replaceWith(renderReview(response.data.id, text, isbn)));
    return result.data;
}
export async function updateReview(id, text) {
    const result = await axios({
        method: 'put',
        url: baseUrl + 'comment/' + id,
        data: {
            body: text,
        }
    }).then(response => $(".edit").replaceWith(renderReview(id, text)));
}
export async function deleteReview(id) {
    let url = baseUrl + 'comment/' + id;
    const result = await axios({
        method: 'delete',
        url: url,
    });
}
export const handleDeleteButton = function(event) {
    let id = event.target.parentElement.parentElement.id;
    deleteReview(id);
    $('#' + id).remove();
}
export const handleEditButton = function(event) {
    let id = event.target.parentElement.parentElement.id;
    let text = $('#' + id + 'text').text();
    console.log(text);
    $('#' + id).replaceWith(renderUpdateReview(id, text));
}
export const handleUpdateButton = function(event) {
    let text = $(".yourText")[0].value;
    let id = event.target.parentElement.id;
    console.log(id);
    updateReview(id, text);
}
export const handleSearchButton = function(event) {
    let str = $('#search')[0].value;
    searchByString(str);
}
export async function searchByString(string) {
    const result = await axios({
        method: 'get',
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + string,
    }).then(response => {
        $('.addTo').empty();
        response.data.items.forEach(element => {
            let author = element.volumeInfo.authors;
            let desc = element.volumeInfo.description;
            let image = element.volumeInfo.imageLinks.smallThumbnail;
            let isbn = element.volumeInfo.industryIdentifiers[0].identifier;
            let title = element.volumeInfo.title;
            $('.addTo').append(renderBook(author, desc, image, isbn, title));
        });
    });
    return result.data;
}
export async function Interactions() {
    let root = $('#root');
    $(root).on("click", ".btn", handleSearchButton);
    $(root).on("click", ".review", handleNewReviewButton);
    $(root).on("click", ".post", handlePostReviewButton);
    $(root).on("click", ".bookTitle", handleBookPage);
    $(root).on("click", ".ed", handleEditButton);
    $(root).on("click", ".delete", handleDeleteButton);
    $(root).on("click", ".update", handleUpdateButton);
}
$(function() {
    Interactions();
});