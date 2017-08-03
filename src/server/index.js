const express = require('express');
const pug = require('pug');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (request, response) => {
  const constants = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../constants.json'), 'utf8'),
  );
  response.send(
    pug.renderFile(
      `${__dirname}/templates/index.pug`,
      Object.assign(constants, {
        env: process.env,
      }),
    ),
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

app.use(
  '/bootstrap',
  express.static(`${__dirname}/../../node_modules/bootstrap/dist`),
);

const port = process.env.npm_package_config_port;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listen on http://localhost:${port}/`);
});
