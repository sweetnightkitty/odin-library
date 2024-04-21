const container = document.querySelector(".container");
const openBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submit-form");
const form = document.querySelector(".form");
const radios = document.getElementsByName("readStatus");
let deleteBtns;




let myLibrary = [
    {   
        number: 0,
        title: "The Good Enough Job",
        author: "Simone Stolzoff",
        pages: 272,
        status: "Read",
    },

    {   number: 1,
        title: "Feel Good Productivity",
        author: "Ali Abdaal",
        pages: 200,
        status: "Currently Reading",
    }
];


let bookNumber = 1;
function Book(title, author, pages, status) {
    bookNumber += 1; //Each newly created book gets a unique identifying #
    this.number = bookNumber;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
};

function addBookToMyLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
};


function displayMyLibrary() {
    for(const myBook of myLibrary) {
        const bookCard = appendBookInfoToCard(myBook);
        container.appendChild(bookCard);
    }

    deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", deleteBooks);
    })

    readStats = document.querySelectorAll(".status");
    readStats.forEach((readStat) => {
        readStat.addEventListener("click", toggleStatus);
    })

};

function toggleStatus() {
    if(this.textContent === "Want to Read") {
        this.textContent = "Currently Reading";
    } else if(this.textContent === "Currently Reading") {
        this.textContent = "Read";
    } else if(this.textContent === "Read") {
        this.textContent = "Want to Read";
    }
};

function deleteBooks() {
    const books = document.querySelectorAll(".card");
            for (const book of books ) {
                if (book.id === this.id) {
                    container.removeChild(book);
                    const updatedLibrary = myLibrary.filter((deletedBook) => deletedBook.number != book.id);
                    myLibrary = updatedLibrary;
                }
            }
}

function appendBookInfoToCard(myBook) {
    const card = makeCard();

    const title = createDiv("title", myBook.title);
    const author = createDiv("author", "by " + myBook.author);
    const pages = createDiv("pages", myBook.pages + " pages");
    const status = createDiv("status", myBook.status);
    const deleteBtn = createBtn("delete-btn", "Delete");

    //With identical ids the deletebtn can target the correct card for deletion.
    card.id = myBook.number;
    deleteBtn.id = myBook.number;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(status);
    card.appendChild(deleteBtn);

    return card;
}


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

function createBtn(className, btnText) {
    const btn = document.createElement("button");
    btn.classList.add(className);
    btn.textContent = btnText;
    return btn;
}


openBtn.addEventListener("click", () => {
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

function closeModal() {
    modal.style.display = "none";
    form.reset();
}

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

    const status = getStatus(selection);
    resetMyLibrary();
    addBookToMyLibrary(title, author, pages, status);
    displayMyLibrary();
    closeModal();
})



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

displayMyLibrary();


