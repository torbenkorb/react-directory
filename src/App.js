import React, { Component } from 'react';
import EmployeeList from './components/EmployeeList';
import Dialog from './components/Dialog';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: '',
      dialogOpen: false,
      currentUser: {},
      isLoading: true
    }
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?nat=de&results=16')
    .then(res => res.json())
    .then(data => {

      data.results = data.results.map(person => {
        person['confirmed'] = false;
        return person;
      });

      console.log(data);
      this.setState({
        users: data.results,
        isLoading: false
      });
    });
  }

  handleInput = e => {
    this.setState({search: e.target.value});
  }

  openDialog = user => {

    const index = this.state.users.findIndex(item => item.email === user.email);
    console.log(index);

    this.setState({dialogOpen: true, currentUser: this.state.users[index]});
  }

  closeDialog = () => {
    this.setState({dialogOpen: false});
  }

  toggleConfirmation = data => {
    const newusers = this.state.users.map(user => {
      if(data.email === user.email) {
        var newuser = {...user, ['confirmed']: !user.confirmed}
        this.setState({currentUser: newuser});
        return newuser;
      }
      return user;
    });

    console.log(this.state.users, newusers);

    this.setState({
      users: newusers
    });
  }

  render() {

    let users = this.state.users;
    const searchterm = this.state.search.toLowerCase();

    if(this.state.search !== '') users = users.filter(user => user.name.first.indexOf(searchterm) !== -1
                                                              || user.name.last.indexOf(searchterm) !== -1
                                                              || (user.name.first + ' ' + user.name.last).indexOf(searchterm) !== -1);


    return (
      <div className="site">
        <header className="site__header">
          <h1 className="site__title">Awesome Agency Employee Directory</h1>
          <input onChange={this.handleInput} type="search" placeholder="Search..." />
        </header>

        <main className="site__content">



          {this.state.isLoading ?
            <div className="users-count">Loading...</div> : <div className="users-count">{users.length} Employees</div>
          }

          <EmployeeList users={users} openDialog={this.openDialog} />

        </main>

        {this.state.dialogOpen &&
          <Dialog user={this.state.currentUser} close={this.closeDialog} toggle={this.toggleConfirmation} />
        }

      </div>
    );
  }
}

export default App;


