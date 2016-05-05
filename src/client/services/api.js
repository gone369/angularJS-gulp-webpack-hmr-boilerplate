const Api = class Api {
  constructor(){
    this.data = {"msg": "hello world"};
  }
  getData(){
    return this.data
  }
  //get data(){
    //return this.data
  //}
  //set data(msg){
    //this.data = msg
  //}
}

export default Api
