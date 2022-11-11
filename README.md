# MTG Deckhub

MTG Deckhub is an API designed to create and view Magic the Gathering decks, users can sign up, login and store their personal decklists.
They can also edit existing decks (changing the name, format, or cards), delete them and view decks and overall collection value.

Currently there is no front-end for this application.


## API Documentation



### Fill database
```
  POST /cards/fill-database
```
Route deisgned to initially load the cards SQL table from cards.js file. The password is defined in the .env file.
Due to the file size, a reduced version of cards.js was uploaded to Github as cardsReducedSize.js.
Users who want to use the complete database (over 27K cards) can download it here:
[Scryfall API](https://scryfall.com/docs/api/bulk-data)

#### Headers
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | 'Admin password_string' |




### Sign-up
```
  POST /sign-up
```
Route used to sign up to the application.
#### Body
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Username |
| `email` | `string` | User email |
| `password` | `string` | Password |




### Log-in
```
  POST /login
```
Allows users to login to the API, returns an object {token: token_string} which can be used to access restricted routes.
#### Body
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | User email |
| `password` | `string` | Password |




### Get user info
```
  GET /me/info
```
Returns complete user info: name, email, number of decks, collection value, array of deck objects.

#### Headers
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | 'Bearer token_string' |



### Get user decks
```
  GET /my-decks
```
Returns array of user decks.

#### Headers
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | 'Bearer token_string' |



### Post user deck
```
  POST /my-decks
```
Create a deck.

#### Headers
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | 'Bearer token_string' |

#### Body
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `deckName` | `string` | Deck name |
| `formatName` | `string` | Format name ('standard', 'modern', 'pauper', 'commander', etc) |
| `cards` | `array` | Array of card objects of the type {cardName, amount} |




### Update user deck
```
  PUT /my-decks/:deckName
```
Updated user deck with specified name using the given parameters. Parameters which were not sent won't be updated.
#### Headers
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | 'Bearer token_string' |

#### Body
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `deckName` | `string` | Deck name |
| `formatName` | `string` | Format name ('standard', 'modern', 'pauper', 'commander', etc) |
| `cards` | `array` | Array of card objects of the type {cardName, amount} |




### Delete user deck
```
  DELETE /my-decks/:deckName
```
Deletes deck with given name from the database.
#### Headers
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | 'Bearer token_string' |



## How to use this application

* Clone this repository
* Download the necessary libraries with ```npm i```
* (Optional) Download the Bulk Data File from [Scryfall API - Oracle Cards Bulk Data File]([https://scryfall.com/docs/api/bulk-data](https://data.scryfall.io/oracle-cards/oracle-cards-20221110220303.json)) and add it to the database folder as a javascript file (cards.js), update the imported file in CardsController.js in order to use the complete database of cards (>27K) instead of the reduced one provided in this repository (~10K)
* Create a postgreSQL database named *mtgdeckhub* and run the table creation queries in database/createTables.sql
* Create and fill a .env file with the variables specified in .env.example
* Run the server with ```npm run dev```
* Send an http GET request to the route /cards/fill-database in order to initially fill the database with cards
* Sign-up, login and send the contents of the file examples/exampleDecklist.json to the route POST /my-decks in order to create your first deck




## Deploy

To be done...



  
## Author

- [@Lucas Cotrim](https://github.com/LucasPCotrim)


