import Head from 'next/head';
import '../css/antd.less';

function App ({ Component, pageProps }) {

    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                <meta name='description' content='Description' />
                <meta name='keywords' content='Keywords' />
                <title>Recipes</title>
                <script src="https://telegram.org/js/telegram-web-app.js"></script>
                <link rel="manifest" href="/manifest.json" />
                <link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
                <link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
                <link rel="apple-touch-icon" href="/icons/apple-icon.png"></link>
                <meta name="theme-color" content="#001529"/>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default App;
