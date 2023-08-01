require("dotenv").config({ path: "./.env" });
const fetch = require("node-fetch-commonjs");

// ex.:
// run googleAuthToken.js to get the AUTHORIZATION_TOKEN
// Use the getCaptionsFromVideo fuction to get the captions ids from a video

let = AUTHORIZATION_TOKEN = process.env.GOOGLE_API_KEY

const getCaptionsFromVideo = async (videoId) => {
  const API_URL = `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${ videoId }&key=${ process.env.GOOGLE_API_KEY }`
  
  let response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json; charset=utf8;',
      Authorization: AUTHORIZATION_TOKEN,
    }

  })

  let data = await response.json()
  let captions = data.items.map(item => {
    return {
      id: item.id,
      name: item.snippet.name,
      language: item.snippet.language,
    }
  })

  return captions
}

// ex.:
// {
//   id: 'AUieDaaljtEyaBNxrv92iIXU3XV-GtYUIzWiVpF5vEgLkT-Vxzg',
//   name: '',
//   language: 'pt'
// }


// Gjn8s6vxESc
// getCaptionsFromVideo('Gjn8s6vxESc')
module.exports = getCaptionsFromVideo