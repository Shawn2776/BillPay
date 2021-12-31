const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b5b31ea3dcc3a8",
  password: "50ea7568",
  database: "heroku_20f73a938f1799c",
  multipleStatements: true
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connection Successful!")
  } else {
    console.log("Connection Failed");
  }
});

function handleDisconnect() {
  connection = mysql.createConnection({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b5b31ea3dcc3a8",
    password: "50ea7568",
    database: "heroku_20f73a938f1799c",
    multipleStatements: true
  }); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

module.exports = mysqlConnection;