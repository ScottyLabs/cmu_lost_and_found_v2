import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

export default class VerticalMenu extends Component {
  state = { activeItem: 'account' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary vertical>
        <img id="logo" src="/dog-logo.png" alt="CMU Lost and Found Logo" width="210"></img>
        <br></br>
        <br></br>
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
        <Menu.Item
          name='settings'
          active={activeItem === 'settings'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}