export default (arr, key, value) => {
    let result = '';
    arr.map((el) => {
      if(el[key] == value) {
        return result = el
      }
    })
    return result
  }