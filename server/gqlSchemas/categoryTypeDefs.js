export const categoryTypeDefs = `
type Query {
categories: [Category]
}

type Mutation{
createCategory(newCategory:categoryInput):Category
editCategory(editedCategory:categoryInput):Category
deleteCategory(_id:String):String
}

type Category{
_id:String
name:String
}

input categoryInput{
_id:String
name:String
}
`