window.cc = initCookieConsent();

cc.run({
	// languages
	auto_language: null, // null or 'browser' or 'document',
	current_lang: 'de',

	// modal
	mode: 'opt-in', // 'opt-in' or 'opt-out'
	force_consent: true,
	hide_from_bots: true,
	page_scripts: true,
	autorun: true,
	revision: 0,
	delay: 0,

	// cookies
	cookie_path: '/',
	cookie_name: 'cc_cookie',
	cookie_same_site: 'Lax',
	cookie_expiration: 182,
	cookie_necessary_only_expiration: 182,
	cookie_domain: location.hostname,
	use_rfc_cookie: false,
	remove_cookie_tables: false,
	autoclear_cookies: true,

	onChange: function () {
		window.location.reload();
	},

	languages: {
		de: {
			consent_modal: {
				title: 'Wir verwenden Cookies!',
				description:
					'Hallo, diese Website verwendet notwendige Cookies, um ihren ordnungsgemäßen Betrieb sicherzustellen, und Tracking-Cookies, um zu verstehen, wie Sie mit ihr interagieren. Letztere werden nur nach Zustimmung gesetzt. <button type="button" data-cc="c-settings" class="cc-link">Lass mich wählen</button>',
				primary_btn: {
					text: 'Alle akzeptieren',
					role: 'accept_all' // 'accept_selected' oder 'accept_all'
				},
				secondary_btn: {
					text: 'Einstellungen',
					role: 'settings' // 'settings' oder 'accept_necessary'
				}
			},
			settings_modal: {
				title: 'Cookie-Einstellungen',
				save_settings_btn: 'Einstellungen speichern',
				accept_all_btn: 'Alle akzeptieren',
				reject_all_btn: 'Alle nicht notwendigen ablehnen',
				close_btn_label: 'Schließen',
				cookie_table_headers: [
					{ col1: 'Name' },
					{ col2: 'Domain' },
					{ col3: 'Ablauf' },
					{ col4: 'Beschreibung' }
				],
				blocks: [
					{
						title: 'Cookie-Verwendung 📢',
						description:
							'Ich verwende Cookies, um die grundlegenden Funktionen der Website sicherzustellen und Ihr Online-Erlebnis zu verbessern. Sie können für jede Kategorie jederzeit Ihre Zustimmung geben oder verweigern. Für weitere Details zu Cookies und anderen sensiblen Daten lesen Sie bitte die vollständige <a href="/legal/privacy-policy" class="cc-link">Datenschutzrichtlinie</a>.'
					},
					{
						title: 'Unbedingt notwendige Cookies',
						description:
							'Diese Cookies sind für das ordnungsgemäße Funktionieren meiner Website unerlässlich. Ohne diese Cookies würde die Website nicht ordnungsgemäß funktionieren',
						toggle: {
							value: 'needed',
							enabled: true,
							readonly: true
						},
						cookie_table: [
							{
								col1: 'iconify*',
								col2: 'https://iconify.design/',
								col3: '*',
								col4: 'Zur schnelleren Darstellung von Icons verwendet die Website die Iconify API.',
								is_regex: true
							}
						]
					},
					{
						title: 'Integration von Einbettungen',
						description:
							'Zur Integration von Einbettungen von Drittanbietern verwendet die Website Cookies. Diese Cookies sind notwendig, um die Einbettungen zu laden.',
						toggle: {
							value: 'embedding', // Ihre Cookie-Kategorie
							enabled: false,
							readonly: false
						},
						cookie_table: [
							// Liste aller erwarteten Cookies
							{
								col1: 'sp*',
								col2: 'https://open.spotify.com',
								col3: '1 Jahr',
								col4: 'Zur Speicherung von Daten bezüglich der Spotify Player-Integration verwendet die Website Cookies. Diese Cookies sind notwendig, um die Spotify Player-Integration zu laden.',
								is_regex: true
							},
							{
								col1: 'yt*',
								col2: 'https://youtube-no-cookie.com',
								col3: '1 Jahr',
								col4: 'Zur Speicherung von Daten bezüglich der YouTube Player-Integration verwendet die Website Cookies. Diese Cookies sind notwendig, um die YouTube Player-Integration zu laden.',
								is_regex: true
							}
						]
					},
					{
						title: 'Weitere Informationen',
						description:
							'Bei Fragen zu unserer Cookie-Richtlinie und Ihren Auswahlmöglichkeiten kontaktieren Sie uns bitte unter <a class="cc-link" href="/home#contact">Kontakt</a>.'
					}
				]
			}
		}
	}
});
