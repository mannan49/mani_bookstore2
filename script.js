$(document).ready(function () {
    var booksData = [];
    var displayedBooks = []; 
    var featuredBooks = []; 
    var booksPerPage = 10;
    var currentPage = 1; 
  
    // Fetch books data from JSON file
    function fetchBooks() {
      $.ajax({
        url: 'books.json',
        dataType: 'json',
        success: function (data) {
          booksData = data; 
          loadMoreBooks();
          setFeaturedBooks();
        }
      });
    }
  
    function setFeaturedBooks() {
      featuredBooks = booksData.slice(0, 4); 
      displayFeaturedBooks(); // Display featured books
    }
  
    // Function to display featured books
    function displayFeaturedBooks() {
      var featuredBooksContainer = $('.featured-books');
      featuredBooksContainer.empty();
  
      featuredBooks.forEach(function (book) {
        var html = `
          <div class="book">
            <img src="${book.cover_image}" alt="${book.title}">
            <h3 class="bookh3">${book.title}</h3>
            <p>By ${book.author}</p>
            <div class="description">
            <span class="description-genre">${book.genre[0]}</span>
            <span class="description-price">Rs. ${book.price}</span>
            </div>
          </div>`;
        featuredBooksContainer.append(html);
      });
    }
  
    // Function to load more books
    function loadMoreBooks() {
      var startIndex = (currentPage - 1) * booksPerPage;
      var endIndex = startIndex + booksPerPage;
  
      displayedBooks = booksData.slice(0, endIndex); // Update displayed books
  
      displayBookList(displayedBooks); // Display the books in the table
      updateLoadMoreButton(); // Update load more button visibility
    }
  
    // Function to display books in table format
    function displayBookList(books) {
      var bookList = $('.book-lists');
      bookList.empty();
  
      books.forEach(function (book) {
        var html = `
          <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publication_year}</td>
            <td>${book.price}</td>
          </tr>`;
        bookList.append(html);
      });
    }
  
    // Function to update load more button visibility
    function updateLoadMoreButton() {
      var loadMoreButton = $('#loadMore');
      if (displayedBooks.length < booksData.length) {
        loadMoreButton.show();
      } else {
        loadMoreButton.hide(); // Hide the load more button if all books are displayed
      }
    }
  
    // Load more button click handler
    $('#loadMore').on('click', function () {
      currentPage++; // Increment the current page counter
      loadMoreBooks(); // Load more books
    });
  
    $('#searchInput').on('keyup', function () {
      var searchText = $(this).val().trim().toLowerCase();
      if (searchText === '') {
        displayedBooks = booksData.slice(0, currentPage * booksPerPage); // Reset displayed books if search is cleared
      } else {
        var filteredBooks = booksData.filter(function (book) {
          return book.title.toLowerCase().includes(searchText);
        });
        displayedBooks = filteredBooks.slice(0, currentPage * booksPerPage); // Update displayed books based on search results
      }
      displayBookList(displayedBooks);
      updateLoadMoreButton(); 
    });
  
    fetchBooks(); 
  });
  