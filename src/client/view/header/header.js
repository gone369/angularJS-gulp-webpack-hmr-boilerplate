import angular from 'angular'
import uiRouter from 'angular-ui-router'
import headerComponent from './header.component'

const Header = angular.module('app.index.header',[
]).component('header',headerComponent);
export default Header.name
