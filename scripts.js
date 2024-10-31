import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import { createBookPreviewElement,
        createGenreOptionElement,
        createAuthorOptionElement,
        appendOptions,
        handleThemeEvent,
        updateShowMoreButton,
        setUpEventListeners
 } from './utils/helper-functions.js'


const booksData = {
    books,
    authors,
    genres,
    booksPerPage: BOOKS_PER_PAGE 
}


let page = 1;
let matches = booksData.books;

// display initial book previews
function displayBookPreviews() {
    const starting = document.createDocumentFragment();

    for (const book of matches.slice(0, booksData.booksPerPage)) {
        starting.appendChild(createBookPreviewElement(book));
    }
    document.querySelector('[data-list-items]').appendChild(starting);
}

// display genre options in search
function displayGenreOptions() {
    const genreHtml = document.createDocumentFragment();
    const firstGenreElement = createGenreOptionElement('any', 'All Genres');
    genreHtml.appendChild(firstGenreElement);
   
    appendOptions(Object.entries(booksData.genres), genreHtml, createGenreOptionElement);
    document.querySelector('[data-search-genres]').appendChild(genreHtml);
}

// display author options in search
function displayAuthorOptions() {
    const authorsHtml = document.createDocumentFragment();
    const firstAuthorElement = createAuthorOptionElement('any', 'All Authors');
    authorsHtml.appendChild(firstAuthorElement);
    
    appendOptions(Object.entries(booksData.authors), authorsHtml, createAuthorOptionElement);
    document.querySelector('[data-search-authors]').appendChild(authorsHtml);
}


document.querySelector('[data-search-form]').addEventListener('submit', handleSearchSubmit);

function handleSearchSubmit(event) {
    event.preventDefault();

    const filters = getFilters(event.target);
    const result = filterBooks(books, filters);

    updateResultsList(result);
    updateShowMoreButton(result);
    scrollToTop();
    closeSearchOverlay();
}

function getFilters(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData);
}

function filterBooks(books, filters) {
    return books.filter(book => {
        const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;
        return genreMatch && titleMatch && authorMatch;
    });
}

function updateResultsList(result) {
    const listMessage = document.querySelector('[data-list-message]');
    const listItems = document.querySelector('[data-list-items]');
    const newItems = document.createDocumentFragment();

    listMessage.classList.toggle('list__message_show', result.length < 1);
    listItems.innerHTML = '';

    result.slice(0, booksData.booksPerPage).forEach(({ author, id, image, title }) => {
        const element = createBookPreviewElement(id, image, title, author);
        newItems.appendChild(element);
    });

    listItems.appendChild(newItems);
}


function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function closeSearchOverlay() {
    document.querySelector('[data-search-overlay]').open = false
}

document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const book of matches.slice(page * booksData.booksPerPage, (page + 1) * booksData.booksPerPage)) {
       fragment.appendChild(createBookPreviewElement(book))
    }

    document.querySelector('[data-list-items]').appendChild(fragment)
    page += 1
})

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        document.querySelector('[data-list-active]').open = true
        document.querySelector('[data-list-blur]').src = active.image
        document.querySelector('[data-list-image]').src = active.image
        document.querySelector('[data-list-title]').innerText = active.title
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})

function initializeApp() {
    displayBookPreviews();
    displayGenreOptions();
    displayAuthorOptions();
    setUpEventListeners();
    updateShowMoreButton(matches, page, booksData);
    document.querySelector('[data-settings-form]').addEventListener('submit', handleThemeEvent);
}

initializeApp();