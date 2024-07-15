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

  handleRemoveCompleted = () => {
    const { todos } = this.state;
    /* let todos = [
    {id =1, text = "prvi zadatak", completed=false}
    {id =2, text = "drugi zadatak", completed=true}
     ];
    */

    // standardni dio javascript for petlja
    // iteriramo po svakom objektu unutar array-a
    // uzimamo samo one koji su completed = false
    /*let newTodos = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].completed === false) {
        newTodos.push(todos[i]);
      }
    }*/

    let newTodos = todos.filter((todo) => !todo.completed);

    // novu filtriranu listu vracamo u state
    this.setState({ todos: newTodos });
  };

  render() {
    const { todos } = this.state;
    const visibleTodos = this.getVisibleTodos();

    const hasCompleted = todos.filter((todo) => todo.completed).length > 0;

    /*let hasCompleted = false;

    todos.filter((todo) => todo.completed).length > 0
      ? (hasCompleted = true)
      : (hasCompleted = false);
    */
    /*
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].completed === true) {
        hasCompleted = true;
        break;
      }
    }
    */

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

        {hasCompleted && (
          <span className="btn-clear-all" onClick={this.handleRemoveCompleted}>
            Obriši dovršene
          </span>
        )}
      </div>
    );
  }
}

export default App;
