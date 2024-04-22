const openBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submit-form");
let bookNumber = 0;
let myLibrary = [];

function Book(title, author, pages, status) {
    bookNumber += 1; //Unique book # can be used to set dataset values for the card, deleteBtn and toggle
    this.number = bookNumber;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
};

Book.prototype.toggleStatus = function() {
    if(this.status === "Read") {
        this.status = "Want to Read";
    } else if(this.status === "Want to Read") {
        this.status = "Read";
    }
}

function addBookToMyLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;

    const radios = document.getElementsByName("readStatus");
    let status;
    for(let i = 0; i < radios.length; i++) {
        if(radios[i].checked)
        status = getStatus(radios[i].value);
    }

    const book = new Book(title, author, pages, status);
    myLibrary.push(book);
};

function displayMyLibrary() {
    resetMyLibrary();
    const container = document.querySelector(".container");

    for(const myBook of myLibrary) {
        const bookCard = appendBookInfoToCard(myBook);
        container.appendChild(bookCard);
    }

    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", deleteBooks);
    })

    const toggleBtns = document.querySelectorAll(".toggle");
    toggleBtns.forEach((toggleBtn) => {
        toggleBtn.addEventListener("click", updateStatus); 
    })
};

function updateStatus() {
    const index = myLibrary.map((book) => book.number).indexOf(parseInt(this.dataset.number));
    myLibrary[index].toggleStatus()
    displayMyLibrary()
}

function deleteBooks() {
    const index = myLibrary.map((book) => book.number).indexOf(parseInt(this.dataset.number));
    myLibrary.splice(index, 1);
    displayMyLibrary()
}

function appendBookInfoToCard(myBook) {
    const card = makeCard();

    const title = createDiv("title", myBook.title);
    const author = createDiv("author", "by " + myBook.author);
    const pages = createDiv("pages", myBook.pages + " pages");
    const status = createDiv("status", myBook.status);
    const toggleBtn = createBtn("toggle", "Update");
    const deleteBtn = createBtn("delete-btn", "Delete");

    //So that when btns are clicked the book object with corresponding number can be targeted
    deleteBtn.dataset.number = myBook.number;
    toggleBtn.dataset.number = myBook.number;

    card.append(title, author, pages, status, toggleBtn, deleteBtn);

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
    const form = document.querySelector(".form");
    form.reset();
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToMyLibrary();
    displayMyLibrary();
    closeModal();
})

function resetMyLibrary() {
    const container = document.querySelector(".container");
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        container.removeChild(card);
    });
}

function getStatus(radioSelection) {
    if(radioSelection === "want") return "Want to Read";
    if(radioSelection === "read") return "Read";
}
