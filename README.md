# Acme Search

## Prerequisites
Angular 8 or higher `npm install -g @angular/cli`

## Development server

In a terminal, in the project directory, run `npm install --save-dev @angular-devkit/build-angular`, then run `ng build` to build the project, then `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Additional Features

I implemented an additional feature where the result change dynamically based of 
the users input.

## My approach

I focused on functionality rather than visual appearance. When the user types and clicks the search button, the keyword entered is compared to the 
matching_terms list in each of the json documents and if there is a match, the whole result field is added to a result list for that document and 
displayed to the user in a table. I edited all dates to be more user-friendly and there are messages to prompt the user when no results were 
found or when the search input was invalid or empty. One of my design decision was to use bootstrap to make the search bar and button more appealing.
I could have, but I thought that would be unnecessary as we were not supposed to spend too much time on the project, but I would have separated the 
result table html for each json document to its own component and move most of my functions in the search-bar.component file to a service file and just 
call the functions to make the app cleaner in terms of architecture. 

## Author
Built by `Eniola Osineye`, email: `eniolaosineye.work@gmail.com`, phone `(234)-360-4905`
