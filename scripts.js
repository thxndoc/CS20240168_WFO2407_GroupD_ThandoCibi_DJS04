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

const displayBookPreviews = () => {
    const starting = document.createDocumentFragment();

    for (const book of matches.slice(0, booksData.booksPerPage)) {
        starting.appendChild(createBookPreviewElement(book));
    }
    document.querySelector('[data-list-items]').appendChild(starting);
}


const displayGenreOptions = () => {
    const genreHtml = document.createDocumentFragment();
    const firstGenreElement = createGenreOptionElement('any', 'All Genres');
    genreHtml.appendChild(firstGenreElement);
   
    appendOptions(Object.entries(booksData.genres), genreHtml, createGenreOptionElement);
    document.querySelector('[data-search-genres]').appendChild(genreHtml);
}

const displayAuthorOptions = () => {
    const authorsHtml = document.createDocumentFragment();
    const firstAuthorElement = createAuthorOptionElement('any', 'All Authors');
    authorsHtml.appendChild(firstAuthorElement);
    
    appendOptions(Object.entries(booksData.authors), authorsHtml, createAuthorOptionElement);
    document.querySelector('[data-search-authors]').appendChild(authorsHtml);
}

const initializeApp = () => {
    displayBookPreviews();
    displayGenreOptions();
    displayAuthorOptions();
    setUpEventListeners();
    updateShowMoreButton();
    document.querySelector('[data-settings-form]').addEventListener('submit', handleThemeEvent);
   
}

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }

    document.querySelector('[data-list-items]').innerHTML = ''
    const newItems = document.createDocumentFragment()

    for (const { author, id, image, title } of result.slice(0, booksData.booksPerPage)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        newItems.appendChild(element)
    }

    document.querySelector('[data-list-items]').appendChild(newItems)
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * booksData.booksPerPage)) < 1

    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * booksData.booksPerPage)) > 0 ? (matches.length - (page * booksData.booksPerPage)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * booksData.booksPerPage, (page + 1) * booksData.booksPerPage)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        fragment.appendChild(element)
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

initializeApp();