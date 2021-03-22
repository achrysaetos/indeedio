# FRONTEND

* Allow react to access your graphql server *(src/ApolloProvider.js)*
* Create the entry point to your app *(src/index.js)*
* Serve each component of your app *(src/App.js)* <br/><br/>

* Call the graphql queries and mutations, and display your components *(src/pages/)*
* Create react components for your pages *(src/components/)*
* Handle verification of users and the implementation their token *(src/context/)* <br/><br/>

* Create queries and mutations to update the database *(src/graphql/)*
* Write helper functions for the parts of your app *(src/util/)*
* Allow your app access to tailwind's styles *(src/index.css)*
* Write standard css for your app *(src/App.css)*


## Important files and folders:

**src/**\
&nbsp; **components/**\
&nbsp; &nbsp; **dashboard/** -- components for the main dashboard component\
&nbsp; &nbsp; **navbar/.js** -- components for the main navbar component\
&nbsp; **context/**\
&nbsp; &nbsp; **auth.js** -- verify that the user exists, and set/remove the user token on login/logout\
&nbsp; **graphql/**\
&nbsp; &nbsp; **...** -- create queries and mutations to update the database\
&nbsp; **pages/**\
&nbsp; &nbsp; **Home.js** -- display any component you want in the main page of your web app\
&nbsp; &nbsp; **Login.js** -- create the login form and decide what to do with user data\
&nbsp; &nbsp; **Register.js** -- create the register form and decide what to do with user data\
&nbsp; **util/**\
&nbsp; &nbsp; **AuthRoute.js** -- route to different pages if the user is logged in\
&nbsp; &nbsp; **hooks.js** -- handle onChange, onSubmit, and values when dealing with forms

&nbsp; **ApolloProvider.js** -- allow react to access your graphql server along with any cached data

&nbsp; **App.css** -- write standard css for your app

&nbsp; **App.js** -- serve each component of your app

&nbsp; **index.css** -- use tailwind's `base`, `components`, and `utilities` styles

&nbsp; **index.js** -- create the entry point to your app

&nbsp; **theme.js** -- handles the normalization of all ChakraUI styles

## Others (as necessary):

**.gitignore** -- commit only the files you write yourself

**craco.config.js** -- necessary for tailwind, b/c create react app doesn't let you override the PostCSS config natively

**tailwind.config.js** -- configure tailwind, generated from running `npx tailwindcss init`