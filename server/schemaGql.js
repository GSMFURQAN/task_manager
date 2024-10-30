export const typeDefs = `
  type Query {
    users: [User]
    user(_id:ID):[User]
    cars:[Car]
    usercars(_id:ID):[Car]
  }

  type Mutation {
  createUser(newuser:UserInput!):User
  usersignin(userSignIn:UserSigninInput!):Token
  createCar(carname:String!):String
  }

    type User{
    _id:String
    name:String
    password: String
    cars: [Car]
    }
    
    type Car{
    carname:String
    _id:String}
    
    input UserInput {
  name:String
  password:String  }

  input UserSigninInput{
  name:String password:String}

  type Token{token:String}
`;
