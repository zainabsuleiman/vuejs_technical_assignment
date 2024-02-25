import axios from 'axios';
import { defineStore } from 'pinia'
import { alert } from "../utils/alertUtils";
export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    loadTodos() {
      axios.get(`https://dummyjson.com/todos`)
      .then((result) => {
        this.todos = result?.data?.data
        console.log(this.todos);      })
      .catch((error) => {
        alert.error(error.message)
      })
    },
    createTodo(todo) {
      console.log(todo);
      fetch('https://dummyjson.com/todos/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo:todo.todo,
    completed:todo.completed,
    userId:todo.userId,
  })
})
.then(res => {res.json()
  
})
.then(
 console.log
  
)
    },
    updateTodo(updatedTodo,id) {
      console.log(updatedTodo)
      fetch(`https://dummyjson.com/todos/${id}`, {
  method: 'PUT', /* or PATCH */
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    completed: updatedTodo,
  })
})
.then(res =>{ res.json()

  
})
.then(console.log);
            
    },
    deleteTodo(id) {
      fetch(`https://dummyjson.com/todos/${id}`, {
  method: 'DELETE',
})
.then(res => {res.json()
alert.success_center('task deleted successfuly')
})
.then(console.log);
    },
    getTodoById(id) {
      return fetch(`https://dummyjson.com/todos/${id}`)
      .then(res => res.json())
    .then(res => {
        return res;
        
    })
      .catch((error) => {
        alert(error.message)
      })
    },
  },
  getters: {
    getTodoList: (state) => state.todos,
    
    getTodoColumns: () => {
      return [
        {
          key: 'name',
          label: 'Task'
        },
        {
          key: 'description',
          label: 'Description'
        },
        {
          key: 'status',
          label: 'Status'
        },
        {
          key: 'createdDate',
          label: 'Created Date'
        },
        {
          key: 'lastModifiedDate',
          label: 'Last Modified Date'
        }
      ]
    }
  }
})
