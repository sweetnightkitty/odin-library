const container = document.querySelector(".container");
const openModal = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submit-form");
const form = document.querySelector(".form");



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


openModal.addEventListener("click", () => {
    modal.style.display = "block";
})

closeBtn.addEventListener("click", () => {
    closeModal();
})

window.addEventListener("click",(e) => {
    if (e.target == modal) {
    closeModal();
    }
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    //need to add status radio option too
    addBookToMyLibrary(title, author, pages, "test");
    resetMyLibrary();
    displayMyLibrary();
    closeModal();
})


function closeModal() {
    modal.style.display = "none";
    form.reset();
}


displayMyLibrary();

function resetMyLibrary() {
    let totalCards = 0;

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        container.removeChild(card);
    });
}