const express = require("express");
const bodyparser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const  connectDB  = require("./config/db");
const cookieParser=require("cookie-parser")
const cors=require('cors')
const graphqlSchema=require("./schemas/index")
const graphqlResolver=require("./resolvers/user")
const app = express();

app.use(bodyparser.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
)

connectDB()
  .then(() => app.listen(3000, () => console.log("Server Started.....")))
  .catch((err) => {
    console.error("Error connecting to Database");
    process.exit(1);
  });
