# Vending Machine #

## Vending machine using React/Redux ##

### Steps to run the project: ###

1) Git, NodeJs should be installed in your machine.
3) Install Yarn Package Manager => `npm install -g yarn`.
3) Clone the project with this command => `git clone https://github.com/kamleshkatpara/vendingmachine.git`
4) Goto project repository and install the dependencies => `cd vendingmachine` && `yarn`.
5) Start the application in development mode => `npm run dev`.
6) JSON-Server has been used for the dummy backend with filename db.json at the root folder.
7) To run the application in production mode, you need to first build the application using `npm run build` command.
8) To host the application we need one more package called Serve install it using this command `yarn global add serve`
9) Once the application is done generating the build folder the you can run or host the application using `npm run prod` command.


#### <ins>It is built using</ins>: ####
* react
* redux
* material-ui
* json-server for fake api
* axios to make api calls
* prop-types for component props validation
* concurrently to run multiple npm command together
* redux-logger for development logging & debugging
* redux-devtools and redux-devtools-extension incase we are using the chrome redux app
