import mongoose from "mongoose";

const Category = mongoose.model('Category');
export const categoryResolver = {
Query:{
// category:async(_,{_id})=>await Category.find({userId:_id})
categories:async(_,{_id})=>await Category.find({userId:_id})

},

Mutation:{
    createCategory: async(_,{newCategory}, {userId})=> {
      console.log('fext', newCategory, userId);
        if (!userId) {
        throw new Error("You're not logged in!");
      }
      const category = new Category({
        ...newCategory,
        userId
      });
      await category.save();
      return "Category created successfully";
    }
}
}