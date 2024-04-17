const container = document.querySelector(".container");
const openModal = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submit-form");
const form = document.querySelector(".form");
const radios = document.getElementsByName("readStatus");
const booksToDelete = document.querySelectorAll(".delete-btn");



const myLibrary = [
    {
        title: "The Good Enough Job",
        author: "Simone Stolzoff",
        pages: 272,
        status: "Read",
    },

    {
        title: "Feel Good Productivity",
        author: "Ali Abdaal",
        pages: 200,
        status: "Currently Reading",
    }
];

let bookNumber = 0;
function Book(title, author, pages, status) {
    bookNumber += 1;
    this.number = bookNumber;
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
        const deleteBtn = createBtn("delete-btn", myBook.number, "Delete");
        
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);
        card.appendChild(deleteBtn);

        container.appendChild(card);
        console.log(booksToDelete);
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

function createBtn(className, idName, btnText) {
    const btn = document.createElement("button");
    btn.classList.add(className);
    btn.id = idName;
    btn.textContent = btnText;
    return btn;
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

    let selection;
    for(let i = 0; i < radios.length; i++) {
        if(radios[i].checked)
        selection = radios[i].value;
    }
    //need to add status radio option too
    const status = getStatus(selection);
    resetMyLibrary();
    addBookToMyLibrary(title, author, pages, status);
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

function getStatus(radioSelection) {
    if(radioSelection === "want") return "Want to Read";
    if(radioSelection === "current") return "Currently Reading";
    if(radioSelection === "read") return "Read";
}

booksToDelete.forEach((bookToDelete) => {
    bookToDelete.addEventListener("click", () => {
        console.log("hello");
    })
})
