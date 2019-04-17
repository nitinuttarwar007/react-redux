/*
  src/App.js
*/

import React, { Component } from 'react';
//connect React component to Store using 'connect' React binding from 'react-redux'.
import { connect } from 'react-redux'; 
import { GithubUsersData, githubUsersRepos } from '../actions/githubAction'
import { List, Avatar,Skeleton, Layout, Input } from 'antd'
import './main.css'
import { Button } from 'antd/lib/radio';
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
      repos: state.UserRepos,
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
  fetchData: (value, pageNo) => dispatch(GithubUsersData(value, pageNo)),
  fetchRepos: (repos) => dispatch(githubUsersRepos(repos))
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

  loadRepos = (repos_url) => {
    this.props.fetchRepos(repos_url);
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div> 
            <Search
              className="gitSearch"
              placeholder="input search text"
              onSearch={(value) => this.getUsersInfo(value)}
              enterButton
            />
          </div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', margin: '16px 0', padding: 24, minHeight: 280 }}>
            {this.props.isLoading ? ( null ) : ( 
                  <div>
                    <p> Total Users : {this.props.total_count} </p>
                    <br /><br />
                  </div>
                )
                }
                <List
                  itemLayout="horizontal"
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
                      loading={this.props.isLoading}
                      key={item.node_id}
                      actions={[
                        <Button onClick={() => this.loadRepos(item.repos_url)}>
                          More Details
                        </Button>
                      ]}
                    >
                      <Skeleton avatar title={true} loading={this.props.isLoading} active>
                        <List.Item.Meta
                          avatar={<Avatar size={64} shape="circle" src={item.avatar_url} />}
                          title={<a style={{fontSize: 24}} href={item.html_url}>{item.login}</a>}
                          description={"Profile Url:- "+ item.html_url + "  Github Score: " + item.score}
                        />
                      </Skeleton>  
                    </List.Item>
                  )}
                />
              </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2019 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

//connect takes in two parameters: mapStateToProps and mapDispatchToProps.

export default connect(mapStateToProps, mapDispatchToProps) (Main);
