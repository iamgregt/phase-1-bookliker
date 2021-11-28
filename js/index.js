const bookList = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')
let listOfBooks = document.querySelectorAll('li')

function loadBooks(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books => {
        books.forEach(book => {
            console.log(book.users[0,1].username)
            renderBook(book)
        })
    })
}

function renderBook(book){
    let bookLi = document.createElement('li')
    bookLi.innerHTML = book.title
    bookList.appendChild(bookLi)
    bookLi.addEventListener('click', e => {
        console.log(e)
        removeAllChildNodes(showPanel)
        renderInfo(book)
    })
}

function renderInfo(book){
    let bookId = book.id
    let bookInfoDiv = document.createElement('div')
    let bookTitle = document.createElement('h3')
    bookTitle.innerHTML = book.title
    let bookSubTitle = document.createElement('h3')
    bookSubTitle.innerHTML = book.subtitle
    let bookImg = document.createElement('img')
    bookImg.src = book.img_url
    let bookInfoPara = document.createElement('p')
    bookInfoPara.innerHTML = book.description
    let usernamesOfLikes = book.users
    let bookLikeButton = document.createElement('button')
    bookLikeButton.innerHTML = "LIKE"
    bookLikeButton.addEventListener('click', e => {
        // console.log(e)

        if(bookLikeButton.innerHTML === "LIKE"){
            bookLikeButton.innerHTML = "DISLIKE"
        }else{
            bookLikeButton.innerHTML = "LIKE"
        }

        let updatedLikes = {
            "users": [
              { "id": 2, "username": "Hey" },
              { "id": 8, "username": "maverick" },
              { "id": 1, "username": "pouros" }
            ]
          }

        
        console.log(book.id)
        fetch(`http://localhost:3000/books/${bookId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'accept':'application/json'
            },
            body: JSON.stringify(updatedLikes)
        })
        function patchAndRefresh(){
            fetch(`http://localhost:3000/books/${bookId}`)
                .then(resp => resp.json())
                .then(newBookInfo => {
                    removeAllChildNodes(showPanel)
                    setTimeout(renderInfo(newBookInfo), 3000)
                    console.log("hey")
                })
        }
        setTimeout(patchAndRefresh(), 2000)

    })
    usernamesOfLikes.forEach(user => {
        userLikes = user.username
        let bookLikes = document.createElement('li')
        bookLikes.innerHTML = userLikes
        bookInfoPara.appendChild(bookLikes)

    })
    let bookInfoArray = [bookImg, bookTitle, bookSubTitle, bookInfoPara, bookLikeButton]

    showPanel.appendChild(bookInfoDiv)
    bookInfoArray.forEach(elem => {
        bookInfoDiv.appendChild(elem)
    })


}

function removeAllChildNodes(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

loadBooks()

