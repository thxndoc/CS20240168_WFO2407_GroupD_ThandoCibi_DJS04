# Project Overview
Transform the Book Preview functionality into a web component and identify other functions that could benefit from being converted to web components.

## Changes made:
- Created a web component in a file called **book-preview** and put that file in a folder called **components.**<br>
  
**Challenges:** <br>
   - 1. **Calculating remaining books:**
      - I tried getting the 'show more' button to calculate the remaining books and render the results, but time was not on my side anymore, so I left it.
   2. **Attribute issue:**
      - I noticed that when I added `id` as an attribute, I was unable to click the preview button to see the book details, so I had to change the attribute from `id` to `data-preview` because the event listener (when clicked) is checking for elements that have a `data-preview` attribute within the event's path. If an element with a `data-preview` attribute is found, it searches through the `books` to find a matching book by ID and that's how the ID is found.
   3. **Filtered results displaying as undefined on browser**
      - When filtering by genre/author, I noticed that the titles, authors, and images were rendering as `undefined`. Despite the console showing that the book objects contained valid data, it did not show up on the browser😭.
      - To troubleshoot, I logged the data to the console at various points in my code, focusing on the results returned after filtering books based on genre or author. The console confirmed that the books array contained valid objects, with the expected properties such as id, title, author, and image.
      - I found the cause of the issue in the `updateResultsList` function. Initially, I was using destructuring in the `forEach` method to extract properties directly from each book object. I then changed the `forEach` method to use a single parameter, `book`, allowing me to access the book's properties correctly.

## DJS04 Project Brief: Book Connect - Web Components
Transform the book preview functionality of the "Book Connect" application into a fully operational Web Component. Additionally, evaluate and potentially convert other parts of the application into Web Components to enhance modularity and reusability.
#### Goals
- **Convert Book Preview to Web Component:** The main focus is to encapsulate the book preview feature into a Web Component, making it reusable and independent.
- **Assess Other Components:** Identify other elements within the "Book Connect" app that could benefit from being converted into Web Components.
- **Maintain Functionality:** Ensure that the application retains all its current functionalities after refactoring.
#### Tasks
1. **Understand the Existing Codebase:** Familiarise yourself with the current structure and functionality of the "Book Connect" project, focusing on the book preview feature.
2. **Create a Web Component for Book Preview:**
   - Encapsulate the book preview into a Web Component.
   - Ensure that the component is self-contained, with its own HTML, CSS, and JavaScript.
   - Test the component to ensure it works seamlessly within the app.
3. **Identify and Convert Other Components:**
   - Analyse the application to identify other potential components for conversion.
   - Prioritise components based on their reusability and importance to the app.
   - Convert the chosen elements into Web Components.
4. **Testing and Integration:**
   - Rigorously test the new components individually and within the context of the application.
   - Pay special attention to interactions between components and the overall user experience.
5. **Documentation:**
   - Document the process of creating the Web Components.
   - Include any challenges faced and how they were overcome.
   - Provide a clear guide on how the components should be used within the app.
#### Discussion and Reflection
Prepare to discuss your experience with your coach, focusing on:
- Challenges encountered while converting the book preview and other elements into Web Components.
- The rationale behind selecting certain elements for conversion into Web Components.
- Insights gained about the advantages and limitations of using Web Components in web development.
#### Submission Guidelines
Submit your updated "Book Connect" codebase, including all the newly created Web Components. Ensure your code is well-commented and adheres to best practices for Web Component development. Include a detailed report covering your process, challenges, and reflections on working with Web Components.
Make sure to submit your project to the LMS on the DJS04 Project Tab.
