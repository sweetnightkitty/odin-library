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
        const card = makeCard();

        const title = createDiv("title", myBook.title);
        const author = createDiv("author", "by " + myBook.author);
        const pages = createDiv("pages", myBook.pages + " pages");
        const status = createDiv("status", myBook.status);
        
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);

        container.appendChild(card);
    }
};

displayMyLibrary();


function makeCard() {
    const card = document.createElement("div");
    card.classList.add("card");
    return card;
}

function createDiv(className, textContent) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.textContent = textContent;
    return div;
}

