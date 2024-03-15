const { buildSchema } = require("graphql");

module.exports = buildSchema(`

   

    type User{
        _id:ID,
        name:String!,
        email:String!
    }

    type logouted{
        done:Boolean
    }

    type locationData{
        location:String!,
        temp:Float!
    }

 

    type Authed{
        Auth:Boolean!
    }
    
    type AuthData{
        userId:ID!,
        token:String!,
        tokenExpiration:Int!
    }

    type data{
        _id:ID,
        location:String!,
        temp:Float!,
        userId:ID
    }

    type Locations{
        location:[data!]!,
        
    }
    

    input userInput{
        name:String!,
        email:String!,
        password:String!
    }
    
    input locationInput{
        city:String!,
        temp:Float!,
        token:String!
    }
   

    type RootQuery{
        users:[User!]!
        login(email:String!,password:String!):AuthData!
        isAuth(token:String!):Authed!
        Logout:logouted!
        getLocations(token:String!):Locations!
 
    }

     type RootMutation{
         createUser(input:userInput!):User!,
         location(input:locationInput!):locationData!
     }

      schema {
       query:RootQuery
        mutation:RootMutation
      }
`);
