//https://docs.angularjs.org/guide/component  <-- read this for more information about angular components

class <%= name %>Controller {
  constructor() {
    this.name = '<%= name %>';
    this.state = {
      init: false,
      link: false
    }
    this.$onInit = this.init;
    this.$postLink = this.link;
    this.$onChanges = this.update;
    this.$onDestroy = this.exit;
  }
  init(){
    /*
     *Called on each controller after all the controllers on an element 
     *have been constructed and had their bindings initialized 
     *(and before the pre & post linking functions for the directives on this element).
     *This is a good place to put initialization code for your controller.
     */

    this.state.init = true;
    console.log('init');
  }
  link(){
    /*
     *Called after this controller's element and its children have been linked.
     *Similar to the post-link function this hook can be used to set up DOM event 
     *handlers and do direct DOM manipulation. Note that child elements that contain
     *templateUrl directives will not have been compiled and linked since they are 
     *waiting for their template to load asynchronously and their own compilation and 
     *linking has been suspended until that occurs. This hook can be considered analogous 
     *to the ngAfterViewInit and ngAfterContentInit hooks in Angular 2. Since the compilation process 
     *is rather different in Angular 1 there is no direct mapping and care should be taken when upgrading.
     */

    this.state.link = true;
    console.log('link');
  }
  update(obj){
    /*
     *Called whenever one-way bindings are updated. The changesObj is a hash whose keys 
     *are the names of the bound properties that have changed, and the values are 
     *an object of the form { currentValue, previousValue, isFirstChange() }. Use 
     *this hook to trigger updates within a component such as cloning the bound 
     *value to prevent accidental mutation of the outer value.
     */
    console.log('update',obj);
  }
  exit(){
    /*
     *Called on a controller when its containing scope is destroyed. Use this hook 
     *for releasing external resources, watches and event handlers.
     */

    console.log('exit');
  }
}

export default <%= name %>Controller;

