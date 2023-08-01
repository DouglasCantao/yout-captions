require("dotenv").config({ path: "./.env" });
const http = require('http');
// const opn = require('open'); /// Não suporta CommonJS import mais https://www.npmjs.com/package/open
const url = require('url');
const destroyer = require('server-destroy');
const fetch = require("node-fetch-commonjs");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
)

google.options({ auth: oauth2Client })

const getAccessToken = async () => {
  const opn = await import('open');

  const scopes = [
    'https://www.googleapis.com/auth/youtube.force-ssl'
  ]

  return new Promise((resolve, reject) => {

    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true
    });

    const server = http.createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:3000')
              .searchParams;
            res.end('Authentication successful! Please return to the console.');
            server.destroy();
            const {tokens} = await oauth2Client.getToken(qs.get('code'));
            oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
            resolve(oauth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        opn.default(authorizeUrl, {wait: false}).then(cp => cp.unref());
      });
    destroyer(server);
  });

  // const { tokens } = await oauth2Client.getAccessToken(url)
  // console.log(333, tokens)
  
}

getAccessToken().then(client=> console.log('RESPOSTA DO SERVER', client)).catch(console.error);