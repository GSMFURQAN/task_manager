export const taskTypeDefs = `
  type Query {
    tasks(_id:ID):[Task]
    filteredTasks(category:String, fromDate:String, toDate:String):[Task]
  }

  type Mutation {
    createTask(newTask:taskInput!):Task
    completeTask(taskvalues:completeTaskInput):Task
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

    input completeTaskInput{
    _id:String
    done:Boolean
    }
        
    
`;
