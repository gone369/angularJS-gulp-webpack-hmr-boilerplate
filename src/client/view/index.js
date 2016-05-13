import angular from 'angular'
import uiRouter from 'angular-ui-router'
import indexComponent from './index.component'
import Header from './header/header'
import About from './about/about'

const index = angular.module('index',[
  Header,
  About
])
.config(($stateProvider)=>{
  $stateProvider.state('index', {
    url: '/',
    template: '<index></index>'
  })
})
.component('index',indexComponent);
export default index.name
