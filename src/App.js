import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    }
  }

  handleClick () {
    function increment(state, props) {
      return {counter: state.counter + 1};
    }
    this.setState(increment);
    this.setState(increment);
    this.setState(increment);
  }
  render() {
    console.log('rendered');
    return (
      <div>
        <p>{this.state.counter}</p>
        <button onClick={this.handleClick.bind(this)}></button>
      </div>
    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));