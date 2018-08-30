import './header.css';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from './menus';
import appConfig from 'app/config/constants';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  handleLocaleChange = event => {
    this.props.onLocaleChange(event.target.value);
  };

  renderDevRibbon = () =>
    this.props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${this.props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { currentLocale, isAuthenticated, isAdmin, isSwaggerEnabled, isInProduction } = this.props;

    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: 'static/images/logo.svg', width: 89, height: 35, alt: 'Shinow' + appConfig.VERSION }}
          minimized={{ src: 'static/images/logo-jhipster-react.svg', width: 40, height: 40, alt: 'Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        {this.renderDevRibbon()}
        <LoadingBar className="loading-bar" />
        {/*<Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <Brand />
          <Collapse isOpen={this.state.menuOpen} navbar>*/}
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Search</NavLink>
          </NavItem>
        </Nav>
        <Nav id="header-tabs" className="ml-auto" navbar>
          <Home />
          {isAuthenticated && <EntitiesMenu />}
          {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} showDatabase={!isInProduction} />}
          <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
          <AccountMenu isAuthenticated={isAuthenticated} />
        </Nav>
        {/*</Collapse>
        </Navbar>*/}
      </React.Fragment>
    );
  }
}
