const container = document.querySelector(".container");

const myLibrary = [
    {
        title: "The Good Enough Job",
        author: "Simone Stolzoff",
        pages: 272,
        status: "read",
    },

    {
        title: "Feel Good Productivity",
        author: "Ali Abdaal",
        pages: 200,
        status: "currently reading",
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
        //const div can be replaced with function makeCard after further adjustments
        const div = document.createElement("div");
        div.textContent = myBook.title + myBook.author + myBook.pages + myBook.status;
        container.appendChild(div);
    }
};

displayMyLibrary();

//myBook is going to pass an object - needs an intermediate step
function makeCard(myBook) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = myBook;
    return card;
}