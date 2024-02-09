const addBookDialogeBtn = document.getElementById("addBookBtn");
const addBookDialoge=document.getElementById("adding-book");
const input=addBookDialoge.querySelectorAll("form > input");
const confirmBtn=addBookDialoge.querySelector("#confirmBtn");
const table=document.getElementById("booksDisplay");


console.log(addBookDialoge.open);
addBookDialogeBtn.addEventListener("click",()=>{
    console.log(addBookDialoge.open);
    addBookDialoge.showModal();
});

confirmBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    addBookDialoge.close(addBookToLibrary(input));
});

const myLibrary=[{ title: "The Lord of the Rings", author: "Tolkien",noPages:0,  read_status: true },
                {title: "Alice in Wonderland",author: "Lewis Caroll",noPages:0, read_status: false},
                { title: "Naruto", author: "Masashi Kishimoto",noPages:0,  read_status: true },];
showBooks();

class Book {
    constructor (author,title,noPages,read_status){
        this.author=author;
        this.title=title;
        this.noPages=noPages;
        this.read_status=read_status;
    }
}

function addBookToLibrary(nodeList){
    author=nodeList[0].value;
    title=nodeList[1].value;
    noPages=nodeList[2].value;
    // console.log(nodeList[3]);
    read_status=nodeList[3].checked;
    let book=new Book(author,title,noPages,read_status);
    myLibrary.push(book)
    showBooks();
}

function createRow(){
    Row=table.insertRow(-1);

    index=Row.insertCell(0);
    author=Row.insertCell(1);
    title=Row.insertCell(2);
    pages=Row.insertCell(3);
    read_status=Row.insertCell(4);
    removeBtn=Row.insertCell(5);

    return Row;
}

function removeBook(index){

    table.deleteRow(index-1);
    myLibrary.splice(index-1,1);
    showBooks()
}

function showBooks(){
    table.innerHTML="";
    myLibrary.forEach((book)=>{
        curentRow=createRow();
        const index=myLibrary.indexOf(book)+1
        curentRow.cells[0].innerText=index;
        curentRow.cells[1].innerText=book.author;
        curentRow.cells[2].innerText=book.title;
        curentRow.cells[3].innerText=book.noPages;
        curentRow.cells[4].innerHTML=`<input type="checkbox" ${book.read_status?"checked":''} id="${index}"></input>`;
        const checkbox=document.getElementById(`${index}`);
        checkbox.addEventListener('click',(e)=>{
            myLibrary[index-1].read_status=checkbox.checked
            console.log(myLibrary[index-1].read_status);
        })
        curentRow.cells[5].innerHTML=`<button onclick="removeBook(${curentRow.cells[0].innerText})" class="delBtn">Delete</button>`;
    })
}
