const bookList = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')
let listOfBooks = document.querySelectorAll('li')
console.log(listOfBooks)

function loadBooks(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books => {
        books.forEach(book => {
            renderBook(book)
        })
    })
}

function renderBook(book){
    let bookLi = document.createElement('li')
    bookLi.innerHTML = book.title
    bookList.appendChild(bookLi)
}

function renderInfo(book){
    let bookInfoDiv = document.createElement('div')
    let bookImg = document.createElement('img')
    bookImg.src = book.img_url
    let bookInfoPara = ('p')
    bookInfoPara.innerHTML = book.description
    let usernamesOfLikes = book.users.username
    let bookLikes = document.createElement('li')
    usernamesOfLikes.forEach(user => {
        bookLikes.innerHTML = user
    })
    let bookInfoArray = [bookImg, bookInfoPara, bookLikes]

    showPanel.appendChild(bookInfoDiv)
    bookInfoArray.forEach(elem => {
        bookInfoDiv.appendChild(elem)
    })


}

loadBooks()