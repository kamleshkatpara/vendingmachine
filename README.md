# Vending Machine #

## A vending machine using React/Redux ##

### Steps to run the project: ###

1) Git, Nodejs and MySQL database should be installed in your machine.
2) Clone the project with this command => `git clone https://github.com/kamleshkatpara/vendingmachine.git`
3) Switch the branch `git checkout with-express-mysql-backend`
4) Goto frontend folder => `cd vendingmachine/frontend` && `yarn` 
5) Then `cd ..` Goto backend folder `cd backend && npm install`.
6) Please create a database named as `vendingpchine`, there after create and import dummy data using the .sql files from `vendingmachine/backend/dbfiles`.
7) To start the backend you will need mysql8.0 database and start the application in development watch mode using command => `npm run watch:dev`
8) You can access the Swagger Document on the browser on this url : `http://localhost:3001/explorer`
9) Start the application the frontend in development mode => `npm run dev`.
10) To host the application we need one more package called Serve install it using this command `yarn global add serve`
11) To run the application in production mode, you need to first build the application using `npm run build` command.
12) Once the application is done generating the build folder the you can run or host the application using `npm run prod` command.

#### <ins>It is built using</ins>: ####
* react
* redux
* expressjs
* mysql8
* dotenv
* material-ui
* json-server for fake api
* axios to make api calls
* prop-types for component props validation
* concurrently to run multiple npm command together
* redux-logger for development logging & debugging
* redux-devtools and redux-devtools-extension incase we are using the chrome redux app
