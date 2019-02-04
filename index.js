const axios = require('axios');

async function populate(dataContainingUrls) {
  // Polyfill para Array.isArray
  if(!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === "[object Array]";
    }
  }

  function matchUrl (val) {
     const urlMatcher = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$"
     const regex = new RegExp(urlMatcher, "i")
     return regex.exec(val)
  }

  // Popular arrays
  if(Array.isArray(dataContainingUrls)) {
    const items = dataContainingUrls.slice()

    for(let index in items) {
      if(matchUrl(items[index])) {
        let data = await (await axios.get(items[index])).data
        items[index] = data
      }

      if(Array.isArray(items[index])) {
        items[index] = await populate(items[index])
      }
    }

    return items
  }

  // Popular strings
  if(typeof dataContainingUrls === "string") {
    if(matchUrl(dataContainingUrls)) {
      const data = await (await axios.get(dataContainingUrls)).data
      return data
    }
  }

  // Popular objetos
  if(typeof dataContainingUrls === "object" && dataContainingUrls !== null) {
    const obj = Object.assign({}, dataContainingUrls)

    for(let x in obj) {
      obj[x] = await populate(obj[x])
    }

    return obj
  }

  // Retorna objeto original
  return dataContainingUrls;
}

exports.populate = populate;
