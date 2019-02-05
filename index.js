const axios = require('axios');

async function populate(urls, requestType = "GET", config = null) {
  requestType = requestType.toLowerCase();

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

  if(Array.isArray(urls)) {
    const items = urls.slice()

    for(let index in items) {
      if(matchUrl(items[index])) {
        // let data = await (await axios[requestType](items[index], config)).data
        let data = await (await axios({
          method: requestType,
          url: items[index],
          ...config
        })).data
        items[index] = data
      }

      if(Array.isArray(items[index])) {
        items[index] = await populate(items[index])
      }
    }

    return items
  }

  if(typeof urls === "string") {
    if(matchUrl(urls)) {
      const data = await (await axios({
        method: requestType,
        url: urls,
        ...config
      })).data
      return data
    }
  }

  if(typeof urls === "object" && urls !== null) {
    const obj = Object.assign({}, urls)

    for(let x in obj) {
      obj[x] = await populate(obj[x])
    }

    return obj
  }

  // Retorns the original object
  return urls;
}

exports.populate = populate;
