import React, { Component } from 'react'
import { Menu, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ModalPost from './ModalPost'


class Header extends Component {
    state = {
        isModalOpened: false
    }
    render() {
        const { categories } = this.props;
        return (
            <div style={{marginBottom:'3rem'}}>
                <ModalPost open={this.state.isModalOpened} close={() => this.setState({ isModalOpened: false })} />
                <Menu inverted>
                    <Container>
                        <Menu.Item active={categories.reduce((noneActive,category) => {
                            if(category.active){
                                return false
                            }
                            return noneActive
                        },true)}>
                            <Link to='/' >All</Link>
                        </Menu.Item>
                        {categories.map((c, index) =>
                            <Menu.Item key={index} active={c.active}>
                                <Link to={`/${c.path}`}>{c.name}</Link>
                            </Menu.Item>
                        )}
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Button size='mini' primary onClick={(e) => this.setState({ isModalOpened: true })}> New Post</Button>
                            </Menu.Item>
                            <Menu.Item>
                            </Menu.Item>
                        </Menu.Menu>
                    </Container>
                </Menu>
            </div>
        )
    }
}
function mapStateToProps({ categories }) {
    return {
        categories
    }
}
export default connect(
    mapStateToProps    
)(Header)