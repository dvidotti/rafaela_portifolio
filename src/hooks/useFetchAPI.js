
export const useFetchAPI = () => {

  const fetchAPI = async (url, options) => {
    let parsedOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      credentials: 'include',
    };
    if (!!options) {
      for (let key in options) {
          parsedOptions[key] = options[key]
      }
      if(!!parsedOptions.body) {
        parsedOptions.body = JSON.stringify(parsedOptions.body)
      }
    }
   
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, parsedOptions)
      let response = await res.json()
      return response;
  
    } catch(error) {
      throw new Error(error)
    }
  }
  return {
    fetchAPI
  };
}

