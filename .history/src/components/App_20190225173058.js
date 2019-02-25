import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import PostDetail from './PostDetail'
import NotFound from './NotFound'
import { fetchCategories, selectCategory } from '../actions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'
import Category from './Category'

class App extends Component {
  state = {
    isModalOpened: false
  }
  sortBy = (e, { value }) => {
    this.setState({ sortBy: value })
  }

  componentDidMount() {
    const { receiveCategories } = this.props;
    receiveCategories();
  }
  render() {
    const { showLoading } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          {showLoading &&
            <Dimmer active inverted>
              <Loader size='large' > Loading</Loader>
            </Dimmer>
          }
          <Route exact path="/404" component={NotFound} />
          <Route path='/:activeCategory/:postId'>
            <PostDetail />
          </Route>
          <Route path="/:activeCategory?" component={Category}>
          </Route>
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    );
  }
}
function mapStateToProps({ categories, posts, activeCategory, pendingActions }) {
  return {
    categories,
    showLoading: pendingActions > 0
  }
}
function mapDispatchToProps(dispatch) {
  return {
    receiveCategories: () => dispatch(fetchCategories()),
    changeCategory: (c) => dispatch(selectCategory(c)),
  }
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
