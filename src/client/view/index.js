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
    template: '<index></index>',
    //resolve: {
    //d3: function(d3Service) {
    //return d3Service.fetch()
    //}
  })
})
.component('index',indexComponent);
export default index.name
