import 'babel-polyfill'
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import Index from './view/index'
import Services from './services/services'

import './assets/scss/main.scss'

angular.module('app', [
  uiRouter,
  Index,
  Services
]).config(($locationProvider,$urlRouterProvider,$stateProvider)=>{
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode({
    enabled: true
  });
  $locationProvider.hashPrefix('!');
})



