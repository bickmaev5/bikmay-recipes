const withPWA = require('next-pwa');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');

const isProd = process.env.NODE_ENV === 'production';
if (typeof require !== 'undefined') {
    require.extensions['.less'] = file => { }
  }
 
module.exports = withPWA(withLess(
    withSass({
        pwa: {
            dest: 'public',
            disable: !isProd
        },
        lessLoaderOptions: {
            javascriptEnabled: true
        }
    })
));
