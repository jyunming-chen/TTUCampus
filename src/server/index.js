// @ts-check

const express = require('express');
const pug = require('pug');

const app = express();

app.get('/', (request, response) => {
  const id = '../constants';
  delete require.cache[require.resolve(id)];
  const constants = require(id); // eslint-disable-line
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

app.use('/resources', express.static(`${__dirname}/resources`));

const port = process.env.npm_package_config_port;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listen on http://localhost:${port}/`);
});
