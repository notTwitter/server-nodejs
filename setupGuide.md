
## Database Setup ##<br>
- Donwload, install and set up MySQL.
- Create a database called 'notTwitter'.
- Change the **database** user inside src/backendend.config.ts. (ie set the username and the password of your database).
- In the *notTwitter* database, create a table with the columns: *userID* (primary column, varchar 45, not null, auto_increment), *userName* (varchar 45, not null), *passWord* (varchar 45, not null). Take note of the spellings of the column names. 
- Create a 'build' folder inside ./ (where this file is located).
- To run the programme, use the command *npm run all*. This will transpile the typescript files into javascript (inside *./build*) and will then run it. 

<br>

Note that you may change the names of the columns or the database, but do remember to copy those changes inside *backend.config.ts*.