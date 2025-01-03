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
 
 export const EDIT_CATEGORY = gql`
mutation edit_category($editedCategory: categoryInput){
  editCategory(editedCategory: $editedCategory) {
    _id, name
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

 export const CREATE_TASK = gql`
mutation createTask($newTask: taskInput!) {
  createTask(newTask: $newTask) {
    task
  }
}`

export const COMPLETE_TASK = gql`
mutation complete_task($taskvalues: completeTaskInput){
  completeTask(taskvalues: $taskvalues) {
    _id,
    task
  }
}`

export const EDIT_TASK = gql`
mutation editTask($task: editTaskInput){
  editTask(task: $task) {
    _id,task
  }
}`

export const DELETE_TASK = gql`
mutation delete_task($id: String){
  deleteTask(_id: $id)
}`

export const DELETE_CATEGORY = gql`
mutation delete_category($id: String){
  deleteCategory(_id: $id)
}`