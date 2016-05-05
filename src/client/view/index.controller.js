class indexController{
  constructor(Api) { //Api service is passed here in the constructor
    this.name = 'index';
    this.data = Api.getData();
    console.log(this.data);
  }
}

export default indexController;
