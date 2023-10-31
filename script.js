const addBookDialogeBtn = document.getElementById("addBook-Dialog");
const addBookDialoge=document.getElementById("adding-book");
const input=addBookDialoge.querySelectorAll("form > input");
const confirmBtn=addBookDialoge.querySelector("#confirmBtn");
const table=document.getElementById("booksDisplay");

addBookDialogeBtn.addEventListener("click",()=>{
    addBookDialoge.showModal();
});

confirmBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    addBookDialoge.close(addBookToLibrary(input));
});

const myLibrary=[];

function Book(author,title,noPages,read){
    this.author=author;
    this.title=title;
    this.noPages=noPages;
    this.read=read;
}

function addBookToLibrary(nodeList){
    author=nodeList[0].value;
    title=nodeList[1].value;
    noPages=nodeList[2].value;
    read=nodeList[3].value;
    let book=new Book(author,title,noPages,read);
    myLibrary.push(book)
    showBooks();
}

function createRow(){
    Row=table.insertRow(-1);

    index=Row.insertCell(0);
    author=Row.insertCell(1);
    title=Row.insertCell(2);
    pages=Row.insertCell(3);
    read=Row.insertCell(4);
    removeBtn=Row.insertCell(5);

    return Row;
}

function removeBook(index){
    console.log(index);
    table.deleteRow(index-1);
    myLibrary.splice(index-1,1);
    showBooks()
}

function showBooks(){
    table.innerHTML="";
    myLibrary.forEach((book)=>{
        curentRow=createRow();
        curentRow.cells[0].innerText=myLibrary.indexOf(book)+1;
        curentRow.cells[1].innerText=book.author;
        curentRow.cells[2].innerText=book.title;
        curentRow.cells[3].innerText=book.noPages;
        console.log(book.read);
        curentRow.cells[4].innerText=book.read==="checked"?"yes":"Not Yet";
        curentRow.cells[5].innerHTML=`<button onclick="removeBook(${curentRow.cells[0].innerText})">Delete</button>`;
    })
}

// check box not working