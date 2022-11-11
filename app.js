require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');

require('./security')(app);

require('./routes')(app, express);
require('./middlewares')(app);

const port = process.env.PORT || 3000;

(async () => {
  try
  {
    await connectDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  }
  catch (error)
  {
    console.log(error);
  }
})();
