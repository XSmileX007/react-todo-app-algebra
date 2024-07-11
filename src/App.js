import { Component } from "react";
import "./App.css";
import VisibilityToolbar from "./components/VisibilityToolbar";
import AddTodoForm from "./components/AddTodoForm";

import { UniqueString } from "unique-string-generator";
import TodoList from "./components/TodoList";

class App extends Component {
  state = {
    visibility: "all",
    todos: JSON.parse(localStorage.getItem("todos")) || [],
  };

  handleVisibilityChange = (visibility) => {
    console.log("visibility: " + visibility);
    this.setState({ visibility });
  };

  handleAddTodo = (vrijednost) => {
    console.log("proslijedjena vrijednost : " + vrijednost);
    const { todos } = this.state;
    const newTodo = {
      id: UniqueString(),
      text: vrijednost,
      completed: false,
    };

    this.setState({ todos: [...todos, newTodo] });
  };

  // override componente i metoda se uvijek okida kad se komponenta osvježi (update)
  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  handleToggleTodo = (id) => {
    const { todos } = this.state;
    const todo = todos.find((item) => item.id === id);

    todo.completed = !todo.completed;
    this.setState(todos);
  };

  handleRemoveTodo = (id) => {
    console.log("handleRemoveTodo + " + id);
    const { todos } = this.state;
    //console.log("count before: " + todos.length);
    const newTodos = todos.filter((todo) => todo.id !== id);
    //console.log("count after: " + newTodos.length);

    this.setState({ todos: newTodos });
  };

  getVisibleTodos = () => {
    const { todos, visibility } = this.state;
    if (visibility === "all") {
      return todos;
    }

    if (visibility === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (visibility === "completed") {
      return todos.filter((todo) => todo.completed);
    }
  };

  render() {
    //const { todos } = this.state;

    const visibleTodos = this.getVisibleTodos();

    return (
      <div className="App">
        <header className="header">Moji zadaci</header>
        <VisibilityToolbar
          onVisibilityChange={this.handleVisibilityChange}
        ></VisibilityToolbar>
        <div className="todoContainer">
          <AddTodoForm addTodo={this.handleAddTodo}></AddTodoForm>
          <TodoList
            todos={visibleTodos}
            toggleTodo={this.handleToggleTodo}
            removeTodo={this.handleRemoveTodo}
          ></TodoList>
        </div>
      </div>
    );
  }
}

export default App;
