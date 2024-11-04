export const userTypeDefs = `
  type Query {
    users: [User]
    user(_id:ID):[User]
  }

  type Mutation {
  createUser(newuser:UserInput!):User
  usersignin(userSignIn:UserSigninInput!):Token
  }

    type User{
    _id:String
    name:String
    email:String
    password: String
    }
    
    input UserInput {
  name:String
  email:String
  password:String 
  originalPassword:String }

  input UserSigninInput{
  email:String
 password:String}

  type Token{token:String}
`;
