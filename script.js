const openBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submit-form");
let deleteBtns;
let bookNumber = 0;
let myLibrary = [];

const bookOne = new Book("The Good Enough Job", "Simone Stolzoff", 272, "Read");
const bookTwo = new Book("Feel Good Productivity", "Ali Abdaal", 200, "Want to Read");
myLibrary.push(bookOne);
myLibrary.push(bookTwo);
displayMyLibrary()



function Book(title, author, pages, status) {
    bookNumber += 1; //Each newly created book gets a unique identifying #
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
    let selection;
    for(let i = 0; i < radios.length; i++) {
        if(radios[i].checked)
        selection = radios[i].value;
    }
    const status = getStatus(selection);
    const book = new Book(title, author, pages, status);
    myLibrary.push(book);
};


function displayMyLibrary() {
    const container = document.querySelector(".container");

    for(const myBook of myLibrary) {
        const bookCard = appendBookInfoToCard(myBook);
        container.appendChild(bookCard);
    }

    deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", deleteBooks);
    })

    toggleBtns = document.querySelectorAll(".toggle");
    toggleBtns.forEach((toggleBtn) => {
        toggleBtn.addEventListener("click", updateStatus); //toggle function
    })
};

function updateStatus() {
    const index = myLibrary.map((book) => book.number).indexOf(parseInt(this.id));
    myLibrary[index].toggleStatus()
    resetMyLibrary()
    displayMyLibrary()
}


function deleteBooks() {
    const index = myLibrary.map((book) => book.number).indexOf(parseInt(this.id));
    myLibrary.splice(index, 1);
    resetMyLibrary()
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

    //With identical ids the deletebtn can target the correct card for deletion.
    card.id = myBook.number;
    deleteBtn.id = myBook.number;
    toggleBtn.id = myBook.number;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(status);
    card.appendChild(toggleBtn);
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
    const form = document.querySelector(".form");
    form.reset();
}



submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // const title = document.getElementById("title").value;
    // const author = document.getElementById("author").value;
    // const pages = document.getElementById("pages").value;

    // const radios = document.getElementsByName("readStatus");
    // let selection;
    // for(let i = 0; i < radios.length; i++) {
    //     if(radios[i].checked)
    //     selection = radios[i].value;
    // }
    // const status = getStatus(selection);

    resetMyLibrary();
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
