require("dotenv").config({ path: "./.env" });
const fetch = require("node-fetch-commonjs");

const getCaptionsFromVideo = require('./videoCaptionList'); // get captions from video

// ex.:
// run googleAuthToken.js to get the AUTHORIZATION_TOKEN
// Use the getCaptionsFromVideo fuction to get the captions ids from a video
// Use the getVideoCaption function to get the captions from a video

// video id: Gjn8s6vxESc
// const captionIds = getCaptionsFromVideo('Gjn8s6vxESc').then(captions => {
//   let captIds = captions.map(caption => caption.id)
//   return captIds
// })

// some video ids for test
const captionIds = ['AUieDaZNPuDXSmpEz8QyMVP5wrIrM6fUF0D62OzvCEK0K8SUh1k', 'AUieDaaljtEyaBNxrv92iIXU3XV-GtYUIzWiVpF5vEgLkT-Vxzg']

let = AUTHORIZATION_TOKEN = process.env.GOOGLE_API_KEY
const CAPTION_DOWNLOAD_URL = `https://youtube.googleapis.com/youtube/v3/captions/${captionIds[1]}?key=${process.env.GOOGLE_API_KEY}`


const getVideoCaption = async (url) => {
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: AUTHORIZATION_TOKEN,
    }

  })

  let data = await response.text()

  console.log(56, data)
}

getVideoCaption(CAPTION_DOWNLOAD_URL)
