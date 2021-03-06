import Page from '../components/Page';
import NProgress from 'nprogress';
import Router from 'next/router';

// import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
	// this is how we set up a general template
	return (
    <ApolloProvider client={apollo} >

		<Page>
			<Component {...pageProps} />
		</Page>
    </ApolloProvider>

	);
}
// .getInitialProps is a nextjs thing. It is async
MyApp.getInitialProps = async function({Component, ctx}) {
  let pageProps = {};
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx)
  }
  pageProps.query = ctx.query
  return { pageProps }
}

export default withData(MyApp)