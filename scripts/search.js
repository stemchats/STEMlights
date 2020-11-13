// 'use strict';
//
// const e = React.createElement;
//
// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }
//
//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }
//
//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }
//
// const domContainer = document.querySelector('#searchBar');
//
// ReactDOM.render(e(LikeButton), domContainer);

  class SearchForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      alert(this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <input type="search" class="search-input" placeholder="Search..." value={this.state.value} onChange={this.handleChange} name="search" autocomplete="off">
        <input type="submit" class="search-submit" value="">
        <span class="search-icon"><i class="fas fa-search"></i></span>
        </form>
      );
    }
  }
