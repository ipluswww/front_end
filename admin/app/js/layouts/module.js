import angular from 'angular';

// Create the module where our functionality can attach to
let layoutModule = angular.module('closetboxAdmin.layout', []);


// Components
import AppHeader from './header.component';
layoutModule.component('appHeader', AppHeader);

import AppFooter from './footer.component';
layoutModule.component('appFooter', AppFooter);

import SideNav from './sidenav.component';
layoutModule.component('sideNav', SideNav);


export default layoutModule;
