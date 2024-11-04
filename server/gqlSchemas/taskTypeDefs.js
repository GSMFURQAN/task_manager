export const taskTypeDefs = `
  type Query {
    tasks(_id:ID):[Task]
  }

  type Mutation {
    createTask(newTask:taskInput!):Task
  }

    type Task{
    _id:ID!
    task:String
    note:String
    dueDate: String
    done:Boolean
    category:String
    }
   
    input taskInput{
    task:String
    note:String
    dueDate: String
    done:Boolean
    category:String
    }
        
    
`;
