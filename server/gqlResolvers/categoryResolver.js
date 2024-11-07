import mongoose from "mongoose";

const Category = mongoose.model("Category");
const Task = mongoose.model("Task");
export const categoryResolver = {
  Query: {
    // category:async(_,{_id})=>await Category.find({userId:_id})
    categories: async (_, { _id },{userId}) => {
      const categories = await Category.find({ userId })
    console.log('ccc', categories, userId)
    return categories
  }
  },

  Mutation: {
    createCategory: async (_, { newCategory }, userId) => {
      console.log("fext", newCategory, userId);
      if (!userId) {
        throw new Error("You're not logged in!");
      }
      const category = new Category({
        ...newCategory,
        userId,
      });
      await category.save();
      return "Category created successfully";
    },

    editCategory: async (_, { editedCategory }, userId) => {
      if (!userId) {
        throw new Error("You're not logged in!");
      }
      const oldCategory = await Category.find({ _id: editedCategory._id });
      await Task.updateMany(
        { category: oldCategory[0]?.name }, // Filter criteria
        { $set: { category: editedCategory.name } } // Update operation
      );
      const newTask = await Category.updateOne(
        { _id: editedCategory._id },
        { $set: { name: editedCategory.name } }
      );
      return "Category updated successfully";
    },

    deleteCategory: async(_,{_id},userId)=>{
      const categoryName = await Category.find({ _id });
      await Category.findByIdAndDelete(_id)
      await Task.deleteMany({category: categoryName[0]?.name})
    }
  },
};
