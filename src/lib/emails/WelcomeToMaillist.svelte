<script lang="ts">
	import {
		Button,
		Container,
		Head,
		Hr,
		Html,
		Img,
		Preview,
		Section,
		Text,
		Heading,
		Link
	} from 'svelte-email';

	export let user: string;

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const main = {
		backgroundColor: '#164e63'
	};

	const container = {
		margin: '0 auto',
		padding: '20px 0 48px'
	};

	const logo = {
		margin: '0 auto'
	};

	const paragraph = {
		fontFamily,
		fontSize: '16px',
		lineHeight: '26px'
	};

	const button = {
		fontFamily,
		backgroundColor: '#ffd368',
		borderRadius: '3px',
		color: '#000',
		fontWeight: 'bold',
		fontSize: '16px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block',
		margin: '2px'
	};

	const hr = {
		borderColor: '#cccccc',
		margin: '20px auto',
		display: 'block',
		width: '380px'
	};

	const footer = {
		fontFamily,
		fontSize: '14px',
		color: '#ffd368',
		textDecoration: 'underline'
	};

	const heading = {
		fontFamily,
		fontSize: '1.5rem',
		lineHeight: '2rem',
		fontWeight: 'bold'
	};
</script>

<Html lang="de">
	<Head>
		<title>Mail List</title>
		<meta name="description" content="Willkommen auf der Mailliste!" />
		<style>
			* {
				text-align: center;
				background-color: #164e63;
				color: #fff;
			}
		</style>
	</Head>
	<Preview preview="Welcome to svelte-email" />
	<Section style={main}>
		<Container style={container}>
			<Img
				src="https://res.cloudinary.com/dimwisiea/image/upload/v1688305304/tfo-logo.png"
				alt="logo"
				style={logo}
				width="200"
				height="200"
			/>
			<Heading style={heading} as="h1">Täglich Frisches Obst - Mailliste</Heading>
			<Text style={paragraph}>
				Wilkommen auf der Mailliste, {user}! <br /> Wir schicken dir ab jetzt laufend updates bezüglich
				zukünftiger Gigs.
			</Text>
			<Button pX={12} pY={12} style={button} href="" target="_blank">
				Aus der Liste austragen
			</Button>
			<Button pX={12} pY={12} style={button} href="" target="_blank">Website besuchen</Button>
			<Hr style={hr} />
			<Link style={footer} href="mailto:taeglichfrischesobst.business@gmail.com" target="_blank">
				Täglich Frisches Obst
			</Link>
		</Container>
	</Section>
</Html>
