import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { hydrate } from 'react-dom';

const App = () => {
  useEffect(() => {
    console.log('Hello world!');
  }, []);

  return (
    <div>
      <h1>
        Hello world!
    </h1>
    </div>
  )
};

if (typeof document !== 'undefined') {
  hydrate(<App />, document.getElementById('root'));
}

export default (locals) => {
  const assets = Object.keys(locals.webpackStats.compilation.assets);
  const js = assets.filter(value => value.match(/\.js$/));
  const root = renderToString(<App />);

  return `<html>
  <body>
    <div id="root">${root}</div>
    ${js.map(src => `<script src="${src}" async></script>`).join('\n')}
  </body>
</html>`;
};
