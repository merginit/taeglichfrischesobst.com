<script lang="js" context="module" type="module">
	import { browser } from '$app/environment';
    import { allowFunctionality } from '$script/cookiestate';
  	import "vanilla-cookieconsent/dist/cookieconsent.css";

	if (browser) {
		CookieConsent.run({
			onChange: ({ cookie, changedCategories, changedPreferences }) => {
				if (changedCategories.includes('functionality')) {
					if (cookie.categories.includes('functionality')) {
						allowFunctionality.set(true);
					} else {
						allowFunctionality.set(false);
					}
				}
			},

			onModalReady: ({ modalName, modal }) => {
				// INFO: only works at hover of button sadly
				const preferences = CookieConsent.getUserPreferences();
				const af = preferences?.acceptedCategories?.includes('functionality') ?? false;
				allowFunctionality.set(af);
			},

			guiOptions: {
				consentModal: {
					layout: 'box',
					position: 'bottom right',
					equalWeightButtons: true,
					flipButtons: false
				},
				preferencesModal: {
					layout: 'bar',
					position: 'right',
					equalWeightButtons: true,
					flipButtons: false
				}
			},
			categories: {
				necessary: {
					readOnly: true
				},
				functionality: {}
			},
			language: {
				default: 'de',
				autoDetect: 'browser',
				translations: {
					de: {
						consentModal: {
							title: 'Wir verwenden Cookies!',
							description:
								'Hallo, diese Website verwendet notwendige Cookies, um ihren ordnungsgemäßen Betrieb sicherzustellen, und Funktionelle-Cookies, um externe Inhalte laden zu können. Letztere werden nur nach Zustimmung gesetzt.',
							acceptAllBtn: 'Alle akzeptieren',
							acceptNecessaryBtn: 'Alle ablehnen',
							showPreferencesBtn: 'Einstellungen anzeigen',
							footer:
								'<a href="/legal/privacy-policy">Privacy Policy</a>\n<a href="/legal/imprint">Imprint</a>'
						},
						preferencesModal: {
							title: 'Cookie-Einstellungen',
							acceptAllBtn: 'Alle akzeptieren',
							acceptNecessaryBtn: 'Alle nicht notwendigen ablehnen',
							savePreferencesBtn: 'Einstellungen speichern',
							closeIconLabel: 'Schließen',
							serviceCounterLabel: 'Service|Services',
							sections: [
								{
									title: 'Cookie-Verwendung',
									description:
										'Die Website verwendet Cookies, um die Geschwindigkeit des Ladens von Elementen zu verbessern, wie auch die Einbettung von externen Inhalten möglich zu machen. Sie können für jede Kategorie jederzeit Ihre Zustimmung geben oder verweigern. . Für weitere Details zu Cookies und anderen sensiblen Daten lesen Sie bitte die vollständigen <a href="/legal/privacy-policy" class="cc__link">Datenschutzrichtlinien</a>.'
								},
								{
									title:
										'Unbedingt notwendige Cookies <span class="pm__badge">Always Enabled</span>',
									description:
										'Diese Cookies sind notwendig, um grundlegende Funktionen der Website zu gewährleisten. Ohne diese Cookies würde die Website nicht ordnungsgemäß funktionieren.',
									linkedCategory: 'necessary',
									cookieTable: {
										headers: {
											name: 'Name',
											domain: 'Service',
											description: 'Beschreibung',
											expiration: 'Ablauf'
										},
										body: [
											{
												name: 'iconify*',
												domain: 'https://iconify.design',
												description:
													'Zur schnelleren Darstellung von Icons verwendet die Website die Iconify API.',
												expiration: 'Bis zur manuellen Löschung'
											}
										]
									}
								},
								{
									title: 'Funktionelle Cookies',
									description:
										'Zur Integration von Einbettungen von Drittanbietern verwendet die Website Cookies. Diese Cookies sind notwendig, um die Einbettungen zu laden.',
									linkedCategory: 'functionality',
									cookieTable: {
										headers: {
											name: 'Name',
											domain: 'Service',
											description: 'Beschreibung',
											expiration: 'Ablauf'
										},
										body: [
											{
												name: 'sp*',
												domain: 'https://open.spotify.com',
												description:
													'Zur Speicherung von Daten bezüglich der Spotify Player-Integration verwendet die Website Cookies. Diese Cookies sind notwendig, um die Spotify Player-Integration zu laden.',
												expiration: '1 Jahr'
											},
											{
												name: 'yt*',
												domain: 'https://youtube-no-cookie.com',
												description:
													'Zur Speicherung von Daten bezüglich der YouTube Player-Integration verwendet die Website Cookies. Diese Cookies sind notwendig, um die YouTube Player-Integration zu laden.',
												expiration: '1 Jahr'
											}
										]
									}
								},
								{
									title: 'Mehr Informationen',
									description:
										'Um mehr Informationen zu erhalten kannst du uns eine Email an "<a class="cc__link" href="mailto:business@taeglichfrischesobst.com">business@taeglichfrischesobst.com</a>" schreiben.'
								}
							]
						}
					},
					en: {
						consentModal: {
							title: 'We use Cookies!',
							description:
								'Hello, this website uses necessary cookies to ensure its proper operation, and functional cookies to load external resources. The latter are only set after your consent.',
							acceptAllBtn: 'Accept All',
							acceptNecessaryBtn: 'Decline All',
							showPreferencesBtn: 'Show Preferences',
							footer:
								'<a href="/legal/privacy-policy">Privacy Policy</a>\n<a href="/legal/imprint">Imprint</a>'
						},
						preferencesModal: {
							title: 'Cookie Settings',
							acceptAllBtn: 'Accept All',
							acceptNecessaryBtn: 'Decline All Non-Necessary',
							savePreferencesBtn: 'Save Settings',
							closeIconLabel: 'Close',
							serviceCounterLabel: 'Service|Services',
							sections: [
								{
									title: 'Cookie Usage',
									description:
										'The website uses cookies to improve the loading speed of elements and enable the embedding of external content. You can give or deny your consent for each category at any time. For more details on cookies and other sensitive data, please read the complete <a href="/legal/privacy-policy" class="cc__link">Privacy Policy</a>.'
								},
								{
									title: 'Essential Cookies <span class="pm__badge">Always Enabled</span>',
									description:
										'These cookies are necessary to ensure the basic functions of the website. Without these cookies, the website would not function properly.',
									linkedCategory: 'necessary',
									cookieTable: {
										headers: {
											name: 'Name',
											domain: 'Service',
											description: 'Description',
											expiration: 'Expiration'
										},
										body: [
											{
												name: 'iconify*',
												domain: 'https://iconify.design',
												description:
													'The website uses the Iconify API to display icons more quickly.',
												expiration: 'Until manually deleted'
											}
										]
									}
								},
								{
									title: 'Functional Cookies',
									description:
										'The website uses cookies to integrate embeds from third-party providers. These cookies are necessary to load the embeds.',
									linkedCategory: 'functionality',
									cookieTable: {
										headers: {
											name: 'Name',
											domain: 'Service',
											description: 'Description',
											expiration: 'Expiration'
										},
										body: [
											{
												name: 'sp*',
												domain: 'https://open.spotify.com',
												description:
													'The website uses cookies to store data related to the Spotify Player integration. These cookies are necessary to load the Spotify Player integration.',
												expiration: '1 year'
											},
											{
												name: 'yt*',
												domain: 'https://youtube-no-cookie.com',
												description:
													'The website uses cookies to store data related to the YouTube Player integration. These cookies are necessary to load the YouTube Player integration.',
												expiration: '1 year'
											}
										]
									}
								},
								{
									title: 'More Information',
									description:
										'To get more information, you can email us at "<a class="cc__link" href="mailto:business@taeglichfrischesobst.com">business@taeglichfrischesobst.com</a>".'
								}
							]
						}
					}
				}
			}
		});
	}
</script>

<script lang="js">
	// @ts-nocheck
	import * as CookieConsent from "vanilla-cookieconsent";
	import { onMount } from 'svelte';

	onMount(() => {
		initializeCookieConsentButtons();
	});

	function initializeCookieConsentButtons() {
		if (browser) {			
			// INFO: only works at first render using the library => loop data-cc="show-preferencesModal" again
			const buttons = document.querySelectorAll('[data-cc]');
			buttons.forEach((button) => {
				if (button && button.getAttribute('data-cc') === 'show-preferencesModal') {
					button.addEventListener('click', () => {
						CookieConsent.showPreferences();
					});
				}
			});
		}
	}
</script>
