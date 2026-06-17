# Star Wars Character Explorer

## Description

A React applicaiton to browse through Star Wars characters using [Star Wars API](https://swapi.info/) (SWAPI).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set Up

1. Clone the Star Wars Character Explorer Respository:

        git clone https://github.com/emily-weeks/star-wars-character-explorer.git

2. Install dependencies:

        npm install

3. Start the app:

        npm start

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Bugs & Rough Edges

Put any issues encountered:

- Films were being double listed

    - The application was executing independent async fetch requests inside a loop and updating the component state sequentially.

    - Added Promise.all() to fetch logic to wait until all calls are finished before assigning results in a single state update

- If even one film request failed, the entire film list would fail to render - need to implement partial rendering of films

    - Promise.all() breaks and reject if one of the promises in the array fails

    - Switch to [Promise.allSettled()]{https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled} and check if promise was successful or failed for partial rendering. Also added check for when every film call fails

## Production Readiness Concerns

Place to put any items I would want to change?
Can pull from items listed below
- Performance: If the API grew to be really large, how would my app handle that?


## Notes:

Created CharacterList and CharacterView Components and added Routing.

Still Need To:
1. Fix CharacterList load so it doesnt reload when navigating back from detail view
2. Update README
3. Possibly work on styling and improvements!
4. Fix character view url using id
5. Possible way to fix search - having it have more exact matches at the top; having it not disrupt the page you were at before searching