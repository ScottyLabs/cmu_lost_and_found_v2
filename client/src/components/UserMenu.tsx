import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class UserMenu extends Component {
    state = { activeItem: 'available items' }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        <Menu secondary fluid vertical>
          <Menu.Item
            name='available items'
            active={activeItem === 'available items'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='archived items'
            active={activeItem === 'archived items'}
            onClick={this.handleItemClick}
          />
        </Menu>
      )
    }
  }