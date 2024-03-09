const { createServer } = require('node:http');
const { get } = require('node:https');

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);

const server = createServer(async (req, res) => {
  const end = (code) => {
    res.statusCode = code;
    res.end();
    res.destroy();
  }

  let ended = false;
  setTimeout(() => {
    if (!ended) err();
  }, 2000)

  go(req, res)
    .then(() => end(200))
    .catch(() => end(500))
    .finally(() => ended = true)
    req.url
});

async function go(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (url.searchParams.get('pass') !== 'SDOIhf984fnSDNfnr3SDfjaw') throw new Error();
  const data = url.searchParams.get('from');
  await new Promise(resolve => {
    get(data.toString(), res => {
      res.pipe(response);
      res.on('end', resolve);
    });
  });
  await new Promise(res => hah.on(''))
}

server.listen(6732);