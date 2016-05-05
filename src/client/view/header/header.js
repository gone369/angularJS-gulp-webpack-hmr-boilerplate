import angular from 'angular'
import uiRouter from 'angular-ui-router'
import headerComponent from './header.component'

const header = angular.module('header',[
  uiRouter
]).component('header',headerComponent);
export default header.name
