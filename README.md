# Query Builder

## Tech stacks & structure
 ### Node.js
    builds GraphQL server and uses mock data for data sources.

- Structure

    All sources files are located in 'src' folder.<br/>
    index.js - start file <br/>
    schema.js - stores schema information <br/>
    resolver.js - resolver file <br/>
    models - directory to mimic the database with two js files. So edit two files <br/>
    in this directory to manipulate the data (users and organizations).

 ### React.js
    client app to consume GraphQL queries using query builder

    App has been created using create-react-app.
- utils directory<br/>
    has two files - ApolloClient.js and func.js<br/>

    AplloClient.js file enables the app to communicate with apollo server. Imported into App.js<br/>

    func.js file contains the main query builder function. 


 ### GraphQL
 GraphQL server and client have been built using Apollo-graphQL.<br/>
 Check the details here[https://www.apollographql.com/docs/]

 ## Run the application

### Install packages

 in 'server' directory, run 
 ```
 yarn
 ```

 in 'client' directory, run
 ```
yarn
 ```

### Run server and react app

in 'server' directory, run
```
yarn start
```
Then server will run on localhost:4000.

in 'client' directory, run
```
yarn start
```

App will run on localhost:3000