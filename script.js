const myLibrary = [
    {
        title: "The Good Enough Job",
        author: "Simone Stolzoff",
        pages: 272,
        status: "read",
    }
];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function() {
        return title + ", by " + author + ", " + pages + " pages, " + status;
    }
};

function addBookToMyLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
};

function displayMyLibrary() {
    for(const myBook of myLibrary) {
        console.log(myBook);
    }
};

displayMyLibrary();