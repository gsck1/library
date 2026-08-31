// Load books from localStorage on startup
let books = JSON.parse(localStorage.getItem('books')) || [];

function displayBooks(booksArray = books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (booksArray.length === 0) {
        bookList.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #777;">No books found</td></tr>`;
        return;
    }

    booksArray.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><button class="delete-btn" onclick="deleteBook(${index})">Delete</button></td>
        `;
        bookList.appendChild(row);
    });
}

function addBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const isbn = document.getElementById('bookIsbn').value.trim();

    if (title === '' || author === '' || isbn === '') {
        alert('कृपया सर्व माहिती भरा (Please fill all fields)!');
        return;
    }

    const newBook = { title, author, isbn };
    books.push(newBook);
    
    // Save to LocalStorage
    localStorage.setItem('books', JSON.stringify(books));

    // Clear inputs
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookIsbn').value = '';

    displayBooks();
}

function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

function searchBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
}

// Initial render
displayBooks();
