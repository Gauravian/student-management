import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { mysqlpool } from './config/db.js'
import router from './routes/route.js'


const app = express()

let allowedOrigins = [
  "http://localhost:5173",
];

app.use(
  cors({
   
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)

      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(msg, false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.json());
app.use('/api' ,router)

dotenv.config();

const PORT = process.env.PORT || 5000

app.get('/', function (req, res) {
  res.send('Hello World')
})


mysqlpool
  .query("SELECT 1")
  .then(() => {
    console.log("mysql DB connected !!!");

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

