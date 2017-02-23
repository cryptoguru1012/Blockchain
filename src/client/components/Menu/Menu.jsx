import React from 'react';
import AppBar from 'material-ui/AppBar';

const style_bar = {
  backgroundColor: {
    backgroundColor: "rgb(255, 109, 0)"
  }
}

const Menu = () => (
      <AppBar
        title="Shopshot"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        style={style_bar.backgroundColor}
      />
);

export default Menu;