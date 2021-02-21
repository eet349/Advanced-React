import Page from '../components/Page';
import NProgress from 'nprogress';
import Router from 'next/router';

// import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
	// this is how we set up a general template
	return (
		<Page>
			<Component {...pageProps} />
		</Page>
	);
}
