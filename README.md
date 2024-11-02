# Project Overview
Refactor existing code by implementing abstractions, creating objects and functions.

## Changes made:
- Inside the **utils** folder, I created a file to add helper functions so that:<br>
   - The functions can be reused and be kept separate from the main app logic
   - The code in the main js file has improved readability<br>
  
- Inside the main file (scripts.js):<br> 
  - I broke down the larger functions into smaller parts so that each function would have a single role or responsibility.
  
**Challenges:** <br>
   - I struggled with figuring out which function to put in a separate file and which ones to keep in the main file as I had to consider which finction would be reusable/reused.
   - Tried breaking down the larger functions into smaller parts so that each function would serve a single purpose and making sure that they still work afterwards.
   - Struggled to make changes to the HTML file.
   - **Filtered results displaying as undefined on browser**
     - When filtering by genre/author, I noticed that the titles, authors, and images were rendering as `undefined`. Despite the console showing that the book objects contained valid data, it did not show up on the browser😭.
     - To troubleshoot, I logged the data to the console at various points in my code, focusing on the results returned after filtering books based on genre or author. The console confirmed that the books array contained valid objects, with the expected properties such as id, title, author, and image.
     - I found the cause of the issue in the `updateResultsList` function. Initially, I was using destructuring in the `forEach` method to extract properties directly from each book object. I then changed the `forEach` method to use a single parameter, `book`, allowing me to access the book's properties correctly.

## DJS03 Project Brief: Book Connect - Abstractions

Dive into the delightful world of "Book Connect," where literary adventures await at your fingertips! Browse, explore, and uncover your next great read from a vast, vibrant collection. Whether you're a fan of thrilling mysteries, epic fantasies, or heartwarming romances, "Book Connect" brings the magic of books directly to you. Happy reading! 

The "Book Connect" project provides an opportunity for students to refine a fully functional version of an application. The focus of this project is to enhance the code's maintainability, extendibility, and readability by applying concepts of objects and functions for abstraction. This will not only streamline future modifications but also consolidate students' understanding of higher-level programming concepts, including documentation, Styleguides, and abstraction principles.

![alt text](image.png)

#### Goals

- **Refactor Existing Code**: Analyse and refactor the given JavaScript and HTML code to improve its structure using objects and functions.
- **Implement Abstraction**: Use abstraction to hide the complex reality while exposing only the necessary parts. This involves creating more generic functions that can perform tasks in a more flexible way.
- **Documentation**: Write clear comments and documentation for the new code structure to explain the purpose and functionality of code blocks, functions, and objects.
- **Follow Styleguides**: Adhere to established coding conventions and Styleguides to ensure code readability and maintainability.

#### Tasks

1. **Code Analysis**: Start by understanding the current implementation of the "Book Connect" application, including its HTML structure and JavaScript functionality.
2. **Plan Refactoring**: Identify sections of the code that can be made more abstract and modular. Look for patterns and repetitive code that can be simplified.
3. **Implement Abstraction**:
   - **Objects**: Define objects to represent key elements of the application, such as books, authors, and genres. Utilise the provided data (e.g., `authors`, `genres`, `books`) to populate these objects.
   - **Functions**: Create functions that handle repetitive tasks, such as rendering the book list, handling user interactions, and applying filters.
4. **Enhance Functionality**: Ensure that the application remains fully functional after refactoring. Test all features to confirm that users can still search, filter, and view books as intended.
5. **Documentation and Comments**: Throughout the refactoring process, document your code. Provide comments that explain the purpose and functionality of objects and functions.
6. **Adherence to Styleguides**: Ensure your code follows JavaScript and HTML coding standards and best practices for readability and maintainability.

#### Discussion and Reflection

After completing the tasks, prepare a brief presentation for your coaching group on the following:
- The rationale behind the refactoring decisions made, including the choice of objects and functions.
- How abstraction has made the code more maintainable and extendable.
- Any challenges faced during the refactoring process and how they were overcome.
- Reflections on how this exercise has deepened your understanding of JavaScript programming concepts.

#### Submission Guidelines

Submit the refactored version of the "Book Connect" application, including all HTML, CSS, and JavaScript files. Ensure that your code is well-documented and adheres to the specified Styleguides. Include a written report covering the discussion and reflection points outlined above.

Make sure to submit your project to the LMS on the DJS03 Project Tab.
