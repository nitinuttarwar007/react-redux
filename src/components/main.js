/*
  src/App.js
*/

import React, { Component } from 'react';
//connect React component to Store using 'connect' React binding from 'react-redux'.
import { connect } from 'react-redux'; 
import { GithubUsersData } from '../actions/githubAction'
import { Spin, List, Avatar, Layout, Input } from 'antd';
import './main.css'
const { Header, Content, Footer } = Layout
const Search = Input.Search
/*
Map Redux State to Component Props

The mapStateToProps parameter of connect allows the React 
component to subscribe to redux state updates.
*/

const mapStateToProps = (state) => {
  return {
      total_count: state.githubUsers.total_count,
      users: state.githubUsers.items,
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
  fetchData: (value, pageNo) => dispatch(GithubUsersData(value, pageNo))
 })

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKey: null,
      pageNo: 1,
    };
  }

  getUsersInfo = (value) => {
    this.setState({
      searchKey: value,
      pageNo: 1
    });
    this.props.fetchData(value, this.state.pageNo);
  }

  handleSelectedPage = (page) => {
    this.setState({
      pageNo: page
    })
    this.props.fetchData(this.state.searchKey, page);
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
              (<div>
                <p> Total Users : {this.props.total_count} </p>
                <br /><br />
                <List
                  itemLayout="vertical"
                  bordered="true"
                  size="large"
                  pagination={{
                    onChange: (page) => {
                      this.handleSelectedPage(page)
                    },
                    pageSize: 30,
                    defaultCurrent: 1,
                    current: this.state.pageNo,
                    total: this.props.total_count ,
                  }
                  }
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
              </div>)
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
