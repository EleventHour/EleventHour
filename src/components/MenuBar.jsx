// Import React Dependencies
import React, { Component } from 'react';

// Import Semantic-UI Dependencies
import { Menu, Image } from 'semantic-ui-react';

class MenuBar extends Component {
  state = {
    activeItem: '',
  }

  handleItemClick = (e, { name }) => {
    switch (name) {
      case 'profile':
      window.location = '/#/users';
        break;
      case 'home':
        window.location = '/';
        break;
      default:
        window.location = '/';
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu stackable>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          <Image src="http://i.imgur.com/MdYaRqm.png" size="mini" />
        </Menu.Item>

        <Menu.Item
          name='events'
          active={activeItem === 'features'}
          onClick={this.handleItemClick}
        >
          Events
        </Menu.Item>

        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          onClick={this.handleItemClick}
        >
          Profile
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuBar;