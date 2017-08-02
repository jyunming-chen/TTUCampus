const express = require('express');
const pug = require('pug');

const app = express();

app.get('/', (request, response) => {
  response.send(
    pug.renderFile(`${__dirname}/templates/index.pug`, { env: process.env }),
  );
});

app.use('/dist', express.static(`${__dirname}/../../dist`));

app.use(
  '/jquery',
  express.static(`${__dirname}/../../node_modules/jquery/dist`),
);

app.use(
  '/three',
  express.static(`${__dirname}/../../node_modules/three/build`),
);

const port = process.env.npm_package_config_port;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listen on http://localhost:${port}/`);
});
