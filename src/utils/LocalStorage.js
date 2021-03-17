const localStorage = window.localStorage

export default{
  getUser() {
    try{
      let json = localStorage.getItem('user')
      return JSON.parse(json)
    }
    catch(e){
      return null
    }
  },
  saveUser(obj) {
    let json = JSON.stringify(obj)
    localStorage.setItem('user', json)
  },
  clearUser() {
    try{
      localStorage.removeItem('user')
    }
    catch(e){
      return null
    }
  }
}
