export const taskTypeDefs = `
  type Query {
    tasks(_id:ID):[Task]
    filteredTasks(category:String, fromDate:String, toDate:String):[Task]
  }

  type Mutation {
    createTask(newTask:taskInput!):Task
    completeTask(taskvalues:completeTaskInput):Task
    editTask(task:editTaskInput):Task
    deleteTask(_id:String):String
  }

    type Task{
    _id:ID!
    task:String
    note:String
    dueDate: String
    done:Boolean
    category:String
    }
   
    input TaskDetailsInput {
  task: String
  note: String
  dueDate: String
  done: Boolean
  category: String
}
    input taskInput{
   taskDetails: TaskDetailsInput
    }

    input completeTaskInput{
    _id:String
    done:Boolean
    }
    
    input editTaskInput{
    _id:String
    taskDetails: TaskDetailsInput
    }
        
    
`;
