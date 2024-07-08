import { Component } from "react";
import "./App.css";
import VisibilityToolbar from "./components/VisibilityToolbar";

class App extends Component {
  state = {
    visibility: "all",
  };

  handleVisibilityChange = (visibility) => {
    this.setState({ visibility });
  };

  render() {
    return (
      <div className="App">
        <header className="header">Moji zadaci</header>
        <VisibilityToolbar></VisibilityToolbar>
      </div>
    );
  }
}

export default App;
