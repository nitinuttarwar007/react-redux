/*
  src/App.js
*/

import React, { Component } from 'react';
//connect React component to Store using 'connect' React binding from 'react-redux'.
import { connect } from 'react-redux'; 
import { GithubUsersData } from '../actions/githubAction'
import { Spin, List, Avatar, Icon, Button } from 'antd';

/*
Map Redux State to Component Props

The mapStateToProps parameter of connect allows the React 
component to subscribe to redux state updates.
*/

const mapStateToProps = (state) => {
  console.log(state);
  return {
      users: state.githubUsers,
      isLoading: state.usersAreLoading
  }
}

/*
The mapDispatchToProps parameter of connect can either be:

    1. an object of action creators wrapped into a dispatch.
    2. a function with a dispatch parameter. 
    The function should return an object that uses dispatch
    to bind action creators. Alternatively, you can use the 
    bindActionCreators() helper from redux
*/

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(GithubUsersData())
 })

class Main extends Component {
  
  getUsers = (event) => {
    this.props.fetchData();
  }

  render() {
    if (this.props.isLoading) {
      return <Spin />;
    }
    
    return (
      <div>
        <div style={{ margin:'50px' }}>
          <Button onClick={this.getUsers}>Cleck Here to get top JS library</Button>
          <br /><br />  
          <List
            itemLayout="vertical"
            bordered="true"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            header={<div style={{ textAlign:'center', fontSize:'24px'}}>Github Users</div>}
            dataSource={this.props.users}
            footer={<div style={{ textAlign:'left', verticalAlign:'center', fontSize:'24px'}}><b>ant design</b> footer</div>}
            renderItem={item => (
              <List.Item 
                key={item.node_id}
                extra={<img width={272} alt="logo" src={item.owner.avatar_url} />}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.owner.avatar_url} />}
                  title={<a href={item.owner.html_url}>{item.name}</a>}
                  description={item.description}
                />
                {item.stargazers_count}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

//connect takes in two parameters: mapStateToProps and mapDispatchToProps.

export default connect(mapStateToProps, mapDispatchToProps) (Main);
