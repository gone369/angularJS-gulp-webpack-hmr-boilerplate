import angular from 'angular'
import uiRouter from 'angular-ui-router'
import aboutComponent from './about.component'

const about = angular.module('about',[
  uiRouter
])
.config(($stateProvider)=>{
  $stateProvider.state('about', {
    url: '/about',
    template: '<about></about>'
  })
})
.component('about',aboutComponent);
export default about.name
