import {gql} from '@apollo/client'

export const SIGNUP_USER = gql`
mutation createUser($newuser: UserInput!){
  user : createUser(newuser: $newuser) {
    _id,
    name,
  }
}
 `

 export const SIGNIN_USER = gql`
mutation signinUser($userSignIn: UserSigninInput!){
  user : usersignin(userSignIn: $userSignIn) {
    token
  }
}
 `

 export const CREATE_CATEGORY = gql`
mutation createCategory($newCategory: categoryInput) {
    createCategory(newCategory: $newCategory) {
      name
    }
  }
 `