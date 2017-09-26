# Chart the Stock Market

A Free Code Camp Dynamic Web Application Project. A Full Stack Javascript App using Node.js, Express.js, Socket.IO, MongoDB, Vue.js 2, and Semantic UI with Google Material theme.

This is the API server side of the Fullstack App. The client side can be found at https://github.com/minhkashyu/stock-market-frontend.

You can run the App at https://mks-stock-market-app.herokuapp.com/.

NOTE: This app on heroku has a web dyno, and if the web dyno receives no traffic in a 30 minute period, the web dyno will sleep. If you access the app when the web dyno is sleeping, you will experience a short delay. After that, the web dyno will become active and the app will run normally. Also the api of the app has another web dyno, and as a result, the first data loading will have a delay as well.

## User Stories

* I can view a graph displaying the recent trend lines for each added stock.

* I can add new stocks by their symbol name.

* I can remove stocks.

* I can see changes in real-time when any other user adds or removes a stock. For this you will need to use Web Sockets.