export const categoryTypeDefs = `
type Query {
categories: [Category]
}

type Mutation{
createCategory(newCategory:categoryInput):Category
}

type Category{
_id:String
name:String
}

input categoryInput{
name:String
}
`