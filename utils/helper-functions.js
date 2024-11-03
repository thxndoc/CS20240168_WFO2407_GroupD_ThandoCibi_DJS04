import { books, authors, genres, BOOKS_PER_PAGE } from '../data.js'

export const createBookPreviewElement = (book) => {
  const bookElement = document.createElement('book-preview');
  bookElement.setAttribute('data-preview', book.id);
  bookElement.setAttribute('image', book.image);
  bookElement.setAttribute('title', book.title);
  bookElement.setAttribute('author', authors[book.author]);
  return bookElement;
}

export const createGenreOptionElement = (genreId, genreName) => {
    const element = document.createElement('option');
    element.value = genreId;
    element.innerText = genreName;
    return element;
  };

  export const createAuthorOptionElement = (authorId, authorName) => {
    const element = document.createElement('option');
    element.value = authorId;
    element.innerText = authorName;
    return element;
  };

  export const appendOptions = (entries, fragment, createOptionElement) => {
    entries.forEach(([id, name]) => {
        fragment.appendChild(createOptionElement(id, name))
    });
  }

  export const updateTheme = (theme) => {
    if (theme === 'night') {
      document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
      document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
      document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
  };

  export const handleThemeEvent = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    updateTheme(theme);
    document.querySelector('[data-settings-overlay]').open = false
  }

  export const updateShowMoreButton = (matches, page, booksData) => {
    const remainingBooks = matches.length - (page * booksData.booksPerPage);
    const showMoreButton = document.querySelector('[data-list-button]');

    showMoreButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">(${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;

    showMoreButton.disabled = remainingBooks <= 0;
  }

  export const setUpEventListeners = () => {
      document.querySelector('[data-search-cancel]').addEventListener('click', () => {
        document.querySelector('[data-search-overlay]').open = false
    })
    
    document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
        document.querySelector('[data-settings-overlay]').open = false
    })
    
    document.querySelector('[data-header-search]').addEventListener('click', () => {
        document.querySelector('[data-search-overlay]').open = true 
        document.querySelector('[data-search-title]').focus()
    })
    
    document.querySelector('[data-header-settings]').addEventListener('click', () => {
        document.querySelector('[data-settings-overlay]').open = true 
    })
    
    document.querySelector('[data-list-close]').addEventListener('click', () => {
        document.querySelector('[data-list-active]').open = false
    })
  }
