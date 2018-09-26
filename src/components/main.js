/*
  src/App.js
*/

import React, { Component } from 'react';
//connect React component to Store using 'connect' React binding from 'react-redux'.
import { connect } from 'react-redux'; 
import { GithubUsersData } from '../actions/githubAction'
import { Spin, List, Avatar, Button, Layout, Input } from 'antd';
import './main.css'
const { Header, Content, Footer } = Layout
const Search = Input.Search
/*
Map Redux State to Component Props

The mapStateToProps parameter of connect allows the React 
component to subscribe to redux state updates.
*/

const mapStateToProps = (state) => {
  //console.log(state);
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
  fetchData: (value) => dispatch(GithubUsersData(value))
 })

class Main extends Component {

  getUsersInfo = (value) => {
    this.props.fetchData(value);
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div> 
            <Search
              placeholder="input search text"
              onSearch={(value) => this.getUsersInfo(value)}
              enterButton
            />
          </div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', margin: '16px 0', padding: 24, minHeight: 280 }}>
            {this.props.isLoading ? (
              <div className='spinStyle'>
                <Spin 
                  size="large"
                  tip="Loading..."
                />
              </div>) : 
              <List
                itemLayout="vertical"
                bordered="true"
                size="large"
                pagination={{
                  onChange: (page) => {
                    //console.log(page);
                  },
                  pageSize: 3,
                }}
                header={<div style={{ textAlign:'center', fontSize:'24px'}}>Github Users</div>}
                dataSource={this.props.users}
                renderItem={item => (
                  <List.Item 
                    key={item.node_id}
                    extra={<img width={150} height={150} alt="logo" src={item.avatar_url} />}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar_url} />}
                      title={<a href={item.html_url}>{item.login}</a>}
                      description={"Profile Url:- "+ item.html_url}
                    />
                    {item.stargazers_count}
                  </List.Item>
                )}
            />
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

//connect takes in two parameters: mapStateToProps and mapDispatchToProps.

export default connect(mapStateToProps, mapDispatchToProps) (Main);
