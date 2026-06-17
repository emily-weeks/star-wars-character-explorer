# Star Wars Character Explorer

## Description

A React applicaiton to browse through Star Wars characters using [Star Wars API](https://swapi.info/) (SWAPI).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Components:

- CharacterList

  - SearchBar
  - PageNav

- CharacterView

## Set Up

1.  Clone the Star Wars Character Explorer Respository:

        git clone https://github.com/emily-weeks/star-wars-character-explorer.git

2.  Install dependencies:

        npm install

3.  Start the app:

        npm start

4.  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Bugs & Rough Edges

1. Films were being double listed

   - The application was executing independent async fetch requests inside a loop and updating the component state sequentially.

   - Added Promise.all() to fetch logic to wait until all calls are finished before assigning results in a single state update

2. If even one film request failed, the entire film list would fail to render - need to implement partial rendering of films

   - Promise.all() breaks and reject if one of the promises in the array fails

   - Switch to [Promise.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) and check if promise was successful or failed for partial rendering. Also added check for when every film call fails

3. If user were to try to open the character-view/id url, the page crashes

   - The component was unable to find location.state in this scenario.

   - Added check for character information and when none available, display a fallback screen that includes an error message and a button to navigate the user back to character list page

4. Fix for CharacterList re-load everytime user navigated back from the character detail view

   - Broke out Search Bar and Page Nav Components and Created a Centralized Global State: `CharactersContext.js` with [createContext](https://react.dev/reference/react/createContext)
   - Now states and data can be managed in the CharactersProvider
   - When the user navigates from character list to the detailed view and then back again, the Character list would reload.
   - The character list will be fetched exactly once when the application boots up. When a user clicks "Back to Character List", the application displays the previous view instantly without re-triggering the fetch.

## Production Readiness Concerns

- Performance: If the API grew to be really large, it could cause a long intital load on the app.

- Concerns around the planet/films requests since that adds alot of additional requests.

- Would remove the timeOut in Production (It's being using for testing Loading states)
