import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import PermIdentity from "material-ui-icons/PermIdentity";
import ModeEdit from "material-ui-icons/ModeEdit";
import Subheader from 'material-ui/Subheader';
import ActionSearch from 'material-ui/svg-icons/action/search';

import { search, setVisibilityFilter } from '../../redux/actions/browser';
import { doCategoryReq } from '../../redux/actions/store/category';
import { sortOffers, getFilterOption } from '../../redux/actions/sortActions';
import SearchBrowser from '../Browser/SearchBrowser';
import SSIcon from './icon';

require('./styles/menu.scss');

/**
 * class MenuBrowser
 */
class MenuBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeSearch: false,
      regexp: '',
      safesearch: 'No',
      category: null,
      //from: parseInt("226a4f45f3393f22"),
    };

    this.props.getCategories();
    this.handleCategory = this.handleCategory.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleHomeTap = this.handleHomeTap.bind(this);
    this.handleToggleSerch = this.handleToggleSerch.bind(this);
    this.handleChangeData = this.handleChangeData.bind(this);
    this.renderCatagoryPrimary = this.renderCatagoryPrimary.bind(this);
  }
  renderCatagoryPrimary(min) {
    let serchParam = {},
      serchString;
    this.props.categories.categories.map((cat, i) => {
      if (i === min) {
        serchString = cat.cat;
        if (serchString.indexOf('>') == -1) {
          serchString = cat.cat;
        } else if (serchString.indexOf('>') != -1) {
          serchString = serchString.substring(0, serchString.indexOf('>'));
        }
        serchParam = {
          category: serchString.trim(),
        };
        this.props.onSearch(serchParam);
        this.handleToggle();
      }
    });
  }
  componentDidMount() {
    const data = {
      regexp: this.props.searchData,
      from: '',
      safesearch: 'No',
      category: null,
    };
    this.props.onSearch(data);
  }

  submitSort(value) {
    this.props.sortOffers(value).then(() => {
      this.props.filter(this.props.filterOption);
    });
  }

  handleToggle() {
    this.setState({
      regexp: null,
      category: null,
      activeSearch: false,
      open: !this.state.open,
    });
  }
  handleHomeTap() {
    this.setState({
      regexp: null,
      category: null,
      activeSearch: false,
      open: !this.state.open,
    });
    this.props.onSearch({ regexp: null });
  }

  handleToggleSerch() {
    const browser = this.props.browser;
    if (this.state.activeSearch) {
      const data = {};
      data.regexp = this.state.regexp;
      if (this.state.category) {
        data.category = this.state.category;
      }
      this.props.onSearch(data);
      if (this.props.stateUrl !== '/' && this.state.regexp) {
        browserHistory.push('/');
      }
    } else {
      /* acz --> this ELSE is for do something when search input will appear */
    }
    this.setState({ activeSearch: !this.state.activeSearch });
    if (browser.filter !== 'SHOW_MAP') {
      this.props.filter('SHOW_ALL');
    }
  }

  handleCategory(value) {
    if (this.props.stateUrl !== '/') {
      if (typeof Storage !== 'undefined') {
        // Code for localStorage/sessionStorage.
        sessionStorage.setItem('catagory', value);
      } else {
        // Sorry! No Web Storage support..
        alert(
          'you are running older version of browser We are going to redirect you on home page please refine catagory there ',
        );
      }
      browserHistory.push('/');
    }

    const data = {
      category: value.trim(),
    };

    this.setState({ category: value.trim() });

    this.props.onSearch(data);
    this.handleToggle();
  }

  handleChangeData(data) {
    if (data.type === 'text') this.setState({ regexp: data.value });
    if (data.type === 'category') this.setState({ category: data.value });
    if (data.enter) {
      this.handleToggleSerch();
    };
  }
  // a function for capetalizing first letter of sub categories
  firstToUpperCase(category) {
    // adding space before and after /
    let Category = category.replace(/\//g, ' / ');
    // adding space before and after +
    Category = Category.replace(/\+/g, ' + ');
    // capetalizing first character of every word of the string
    Category = category.toLowerCase().replace(/(\?:^|\s)\S/g, letter => letter.toUpperCase());

    return Category;
  }
  /* a function for split category
	 * for example instead of 'some-word > another-word' it will be 'another-word'
	 */
  splitCategory(category) {
    const OldCatItem = category;
    const NewCatItem = OldCatItem.split('>').pop();

    return NewCatItem;
  }
  renderCategories(start, stop) {
    if (this.props.categories.categories.length > 0) {
      return this.props.categories.categories.map((category, i) => {
        if (i >= start && i < stop) {
          // passing category.cat, it will return only the name of sub category
          let NewCatItem = this.splitCategory(category.cat);
          // capetalizing first letter of sub categories
          NewCatItem = this.firstToUpperCase(NewCatItem);
          if (i == 0) {
            return (
              <MenuItem
                required
                key={i}
                value={NewCatItem}
                onTouchTap={() => {
                  this.handleCategory(category.cat);
                }}
                primaryText={NewCatItem}
              />
            );
          }
          return (
            <MenuItem
              key={i}
              value={NewCatItem}
              onTouchTap={() => {
                this.handleCategory(category.cat);
              }}
              primaryText={NewCatItem}
            />
          );
        }
      });
    }
  }

  render() {
    if (this.props.categories.error) {
      alert(`Error:\nCould not fetch categories\n${this.props.categories.message}`);
    }
    const props = Object.assign({}, this.props);
    delete props.categories;
    delete props.getCategories;
    const categories = this.renderCategories();

    return (
      <AppBar
        title={
          !this.state.activeSearch
            ? <p style={{ fontWeight: 'bold', fontSize: '36px', letterSpacing: '-1.7px' }}>moovr</p>
            : <SearchBrowser
              style={{ float: 'right' }}
              onChangeData={this.handleChangeData}
              regexp={this.state.regexp}
            />
        }
        className="appbar-color"
        onLeftIconButtonTouchTap={this.handleToggle}
        onRightIconButtonTouchTap={this.handleToggleSerch}
        iconElementLeft={
          <IconButton className="btnStyle">
            <SSIcon/>
          </IconButton>
        }
        iconElementRight={
          <div className="menu-icons-right">
            <div className="menu-icon-container">
              <Link to="/profile/wallets">
                <IconButton>
                  <PermIdentity />
                </IconButton>
                <span className="menu-icon-text">Login</span>
              </Link>
            </div>
            <div className="menu-icon-container">
              <IconButton>
                <ModeEdit />
              </IconButton>
              <span className="menu-icon-text">Register</span>
            </div>
          </div>
        }
      >
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar showMenuIconButton={false} title="Menu" />
          <Link to="/">
            <MenuItem onTouchTap={this.handleHomeTap} primaryText="Home" />
          </Link>
          <Link to="/store/newItem">
            <MenuItem onTouchTap={this.handleToggle} primaryText="Sell" />
          </Link>
          <ListItem
            primaryText="Categories"
            nestedItems={[
              <MenuItem
                key={0}
                onTouchTap={this.handleToggle}
                primaryText="All"
                containerElement={<Link to="" />}
              />,
              <ListItem
                key={1}
                primaryText="For Sale"
                onTouchTap={() => this.submitSort({ category: 'for sale' })}
                nestedItems={this.renderCategories(0, 27)}
              />,
              <ListItem
                key={2}
                primaryText="Services"
                onTouchTap={() => this.submitSort({ category: 'services' })}
                nestedItems={this.renderCategories(27, 36)}
              />,
              <ListItem
                key={3}
                primaryText="Wanted"
                onTouchTap={() => this.submitSort({ category: 'wanted' })}
                nestedItems={this.renderCategories(36, 37)}
              />,
              <ListItem
                key={4}
                primaryText="Certificates"
                onTouchTap={() => this.submitSort({ category: 'certificates' })}
                nestedItems={this.renderCategories(37, 42)}
              />,
            ]}
          />
          <Link to="">
            <MenuItem disabled onTouchTap={this.handleToggle} primaryText="About" />
          </Link>
          <Link to="">
            <MenuItem disabled onTouchTap={this.handleToggle} primaryText="Register" />
          </Link>
          <Link to="">
            <MenuItem disabled onTouchTap={this.handleToggle} primaryText="Profile" />
          </Link>
        </Drawer>
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  const browser = state.browser;
  const categories = state.categories;
  const filterOption = state.sorter.option;

  return { categories, browser, filterOption };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (data) => {
      dispatch(search(data));
    },
    sortOffers: params => dispatch(sortOffers(params)),
    filter: options => dispatch(setVisibilityFilter(options)),
    getCategories: () => {
      dispatch(doCategoryReq());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBrowser);
