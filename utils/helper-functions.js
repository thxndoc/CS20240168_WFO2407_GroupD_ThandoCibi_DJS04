import { books, authors, genres, BOOKS_PER_PAGE } from '../data.js'

export const createBookPreviewElement = (book) => {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', book.id);
    element.innerHTML = `
        <img
            class="preview__image"
            src="${book.image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${book.title}</h3>
            <div class="preview__author">${authors[book.author]}</div>
        </div>
    `;
    return element;
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

  export const updateTheme = (theme) => {
    if (theme === 'night') {
      document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
      document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
      document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
  };
