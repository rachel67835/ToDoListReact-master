import axios from 'axios';

// const apiUrl = process.env.REACT_APP_API_URL
axios.defaults.apiUrl = process.env.REACT_APP_API_URL

export default {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/tasks`);    
    return result.data;
  },

  addTask: async (name) => {
   console.log(name);
   
    const newTask = { name, isComplete: false }; // הנח שהמודל שלך כולל את השדות האלה
   console.log(newTask);
    const result = await axios.post(`${apiUrl}/tasks`, newTask);
   console.log(result);
   
    return result.data;
  },
  setCompleted: async (id, isComplete) => {
    try {
      const result = await axios.put(`${apiUrl}/updateTask/${id}`, { isComplete });
      if (result.status !== 200) {
        console.log("Error updating data");
        return;
      }
      return result.data;
    } catch (error) {
      console.error("Error updating task:", error);
      return null;
    }
  },



  deleteTask: async (id) => {
    await axios.delete(`${apiUrl}/tasks/${id}`);
  }
};
