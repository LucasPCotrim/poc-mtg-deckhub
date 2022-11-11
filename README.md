# MTG Deckhub

MTG Deckhub is an API designed to create and view Magic the Gathering decks, users can sign up, login and store their personal decklists.
They can also edit existing decks (changing the name, format, or cards), delete them and view decks and overall collection value.

Currently there is no front-end for this application.


## API Documentation

### Fill-Database
```
  POST /cards/fill-database
```
Route deisgned to initially load the cards SQL table from cards.js file. The password is defined in the .env environment.
Due to the file size, a reduced version of cards.js was uploaded to Github as cardsReducedSize.js.
Users who want to use the complete database (over 27K cards) can download it here:
[Scryfall API - Oracle Cards Bulk Data File](https://scryfall.com/docs/api/bulk-data)

#### Headers
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | 'Admin <password>' |




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




### Get User Info
```
  GET /me/info
```
Returns complete user info: name, email, number of decks, collection value, array of deck objects.

#### Headers
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | 'Bearer token_string' |




### Documentation to be completed...



## Deploy

To be done...

  
## Author

- [@Lucas Cotrim](https://github.com/LucasPCotrim)


