<script lang="ts">
    import { toast, Toaster } from 'svelte-french-toast';

	let country = 'Österreich';
	let city = 'Wien,Wien';
    let alt_city = "";
    $: city_not_in_list = city === "Nicht in der Liste";

    const setDefaultSelection = function() {
        switch (country) {
            case "Österreich":
                city = 'Wien,Wien';
            break;
            case "Schweiz":
                city = 'Zürich,Kanton Zürich';
            break;
            case "Deutschland":
                city = 'Berlin,Berlin';
            break;
        }
    }

    const submitGigLocationSuggestion = async function(event: Event) {
        const form = event.target as HTMLFormElement;
        const data = new FormData(form);
        const values = [];

        for (const [key, value] of data.entries()) {
            values.push(value);
        }

        if (Array.isArray(values) && values.length === 4) {
            const response = await fetch("", {
                method: 'POST',
                body: JSON.stringify({
                    values
                }),
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json'
                }
            });

            const res = await response.json();

            if (res.success) {
                toast.success(res.response);
            } else {
                toast.error(res?.response ?? res.message);
            }
        } else {
            toast.error('Invalider Vorschlag!');
        }
    }
</script>

<Toaster position="bottom-right" />

<main class="flex items-center justify-center h-screen">
	<div id="request-gig" class="p-2 border-2 bg-neutral border-primary rounded-2xl">
		<h3 class="mb-4 text-3xl font-bold text-secondary">Gig Location vorschlagen</h3>
		<p class="mb-2 text-secondary">
			Du willst uns live hören? <br />
			Schreibe uns:
		</p>
		<div class="flex flex-col gap-2">
			<form on:submit|preventDefault={submitGigLocationSuggestion} class="flex flex-col gap-2">
				<textarea
					placeholder="Deine Nachricht..."
					value="Hey Täglich Frisches Obst, "
					class="w-full p-2 pt-1 resize-none textarea textarea-bordered textarea-lg"
					title="Nachricht"
					name="message"
				/>
                Wo sollen wir spielen?
				<select name="country" class="w-full select" bind:value={country} on:change={setDefaultSelection}>
					<option disabled selected>Wähle ein Land</option>
					<option value="Österreich">Österreich</option>
                    <option value="Schweiz">Schweiz</option>
					<option value="Deutschland">Deutschland</option>
				</select>
				{#if country === "Österreich"}
					<select name="city" class="w-full select" bind:value={city}>
                        <!-- https://de.wikipedia.org/wiki/Liste_der_St%C3%A4dte_in_%C3%96sterreich -->
                        <option disabled selected>Wähle ein Stadt (100 größten Österreichs)</option>
                        <option selected value="Wien,Wien">Wien, Wien</option>
                        <option value="Graz,Steiermark">Graz, Steiermark</option>
                        <option value="Linz,Oberösterreich">Linz, Oberösterreich</option>
                        <option value="Salzburg,Salzburg">Salzburg, Salzburg</option>
                        <option value="Innsbruck,Tirol">Innsbruck, Tirol</option>
                        <option value="Klagenfurt am Wörthersee,Kärnten">Klagenfurt am Wörthersee, Kärnten</option>
                        <option value="Villach,Kärnten">Villach, Kärnten</option>
                        <option value="Wels,Oberösterreich">Wels, Oberösterreich</option>
                        <option value="St. Pölten,Niederösterreich">St. Pölten, Niederösterreich</option>
                        <option value="Dornbirn,Vorarlberg">Dornbirn, Vorarlberg</option>
                        <option value="Wiener Neustadt,Niederösterreich">Wiener Neustadt, Niederösterreich</option>
                        <option value="Steyr,Oberösterreich">Steyr, Oberösterreich</option>
                        <option value="Feldkirch,Vorarlberg">Feldkirch, Vorarlberg</option>
                        <option value="Bregenz,Vorarlberg">Bregenz, Vorarlberg</option>
                        <option value="Leonding,Oberösterreich">Leonding, Oberösterreich</option>
                        <option value="Klosterneuburg,Niederösterreich">Klosterneuburg, Niederösterreich</option>
                        <option value="Baden,Niederösterreich">Baden, Niederösterreich</option>
                        <option value="Krems an der Donau,Niederösterreich">Krems an der Donau, Niederösterreich</option>
                        <option value="Leoben,Steiermark">Leoben, Steiermark</option>
                        <option value="Wolfsberg,Kärnten">Wolfsberg, Kärnten</option>
                        <option value="Traun,Oberösterreich">Traun, Oberösterreich</option>
                        <option value="Amstetten,Niederösterreich">Amstetten, Niederösterreich</option>
                        <option value="Kapfenberg,Steiermark">Kapfenberg, Steiermark</option>
                        <option value="Hallein,Salzburg">Hallein, Salzburg</option>
                        <option value="Schwechat,Niederösterreich">Schwechat, Niederösterreich</option>
                        <option value="Mödling,Niederösterreich">Mödling, Niederösterreich</option>
                        <option value="Kufstein,Tirol">Kufstein, Tirol</option>
                        <option value="Traiskirchen,Niederösterreich">Traiskirchen, Niederösterreich</option>
                        <option value="Ansfelden,Oberösterreich">Ansfelden, Oberösterreich</option>
                        <option value="Braunau am Inn,Oberösterreich">Braunau am Inn, Oberösterreich</option>
                        <option value="Hohenems,Vorarlberg">Hohenems, Vorarlberg</option>
                        <option value="Saalfelden am Steinernen Meer,Salzburg">Saalfelden am Steinernen Meer, Salzburg</option>
                        <option value="Stockerau,Niederösterreich">Stockerau, Niederösterreich</option>
                        <option value="Tulln an der Donau,Niederösterreich">Tulln an der Donau, Niederösterreich</option>
                        <option value="Bruck an der Mur,Steiermark">Bruck an der Mur, Steiermark</option>
                        <option value="Eisenstadt,Burgenland">Eisenstadt, Burgenland</option>
                        <option value="Spittal an der Drau,Kärnten">Spittal an der Drau, Kärnten</option>
                        <option value="Bludenz,Vorarlberg">Bludenz, Vorarlberg</option>
                        <option value="Ternitz,Niederösterreich">Ternitz, Niederösterreich</option>
                        <option value="Marchtrenk,Oberösterreich">Marchtrenk, Oberösterreich</option>
                        <option value="Feldkirchen in Kärnten,Kärnten">Feldkirchen in Kärnten, Kärnten</option>
                        <option value="Hall in Tirol,Tirol">Hall in Tirol, Tirol</option>
                        <option value="Wörgl,Tirol">Wörgl, Tirol</option>
                        <option value="Bad Ischl,Oberösterreich">Bad Ischl, Oberösterreich</option>
                        <option value="Schwaz,Tirol">Schwaz, Tirol</option>
                        <option value="Korneuburg,Niederösterreich">Korneuburg, Niederösterreich</option>
                        <option value="Feldbach,Steiermark">Feldbach, Steiermark</option>
                        <option value="Gmunden,Oberösterreich">Gmunden, Oberösterreich</option>
                        <option value="Leibnitz,Steiermark">Leibnitz, Steiermark</option>
                        <option value="Neunkirchen,Niederösterreich">Neunkirchen, Niederösterreich</option>
                        <option value="Knittelfeld,Steiermark">Knittelfeld, Steiermark</option>
                        <option value="Vöcklabruck,Oberösterreich">Vöcklabruck, Oberösterreich</option>
                        <option value="Ried im Innkreis,Oberösterreich">Ried im Innkreis, Oberösterreich</option>
                        <option value="Bad Vöslau,Niederösterreich">Bad Vöslau, Niederösterreich</option>
                        <option value="Hollabrunn,Niederösterreich">Hollabrunn, Niederösterreich</option>
                        <option value="Sankt Veit an der Glan,Kärnten">Sankt Veit an der Glan, Kärnten</option>
                        <option value="Enns,Oberösterreich">Enns, Oberösterreich</option>
                        <option value="Groß-Enzersdorf,Niederösterreich">Groß-Enzersdorf, Niederösterreich</option>
                        <option value="Mistelbach,Niederösterreich">Mistelbach, Niederösterreich</option>
                        <option value="Gänserndorf,Niederösterreich">Gänserndorf, Niederösterreich</option>
                        <option value="Lienz,Tirol">Lienz, Tirol</option>
                        <option value="Weiz,Steiermark">Weiz, Steiermark</option>
                        <option value="Gerasdorf bei Wien,Niederösterreich">Gerasdorf bei Wien, Niederösterreich</option>
                        <option value="Ebreichsdorf,Niederösterreich">Ebreichsdorf, Niederösterreich</option>
                        <option value="Deutschlandsberg,Steiermark">Deutschlandsberg, Steiermark</option>
                        <option value="St. Johann im Pongau,Salzburg">St. Johann im Pongau, Salzburg</option>
                        <option value="Gleisdorf,Steiermark">Gleisdorf, Steiermark</option>
                        <option value="Seekirchen am Wallersee,Salzburg">Seekirchen am Wallersee, Salzburg</option>
                        <option value="Imst,Tirol">Imst, Tirol</option>
                        <option value="Waidhofen an der Ybbs,Niederösterreich">Waidhofen an der Ybbs, Niederösterreich</option>
                        <option value="Trofaiach,Steiermark">Trofaiach, Steiermark</option>
                        <option value="Völkermarkt,Kärnten">Völkermarkt, Kärnten</option>
                        <option value="Zwettl-Niederösterreich,Niederösterreich">Zwettl-Niederösterreich, Niederösterreich</option>
                        <option value="Bischofshofen,Salzburg">Bischofshofen, Salzburg</option>
                        <option value="Zell am See,Salzburg">Zell am See, Salzburg</option>
                        <option value="Purkersdorf,Niederösterreich">Purkersdorf, Niederösterreich</option>
                        <option value="Sankt Andrä,Kärnten">Sankt Andrä, Kärnten</option>
                        <option value="Laakirchen,Oberösterreich">Laakirchen, Oberösterreich</option>
                        <option value="Köflach,Steiermark">Köflach, Steiermark</option>
                        <option value="Judenburg,Steiermark">Judenburg, Steiermark</option>
                        <option value="Voitsberg,Steiermark">Voitsberg, Steiermark</option>
                        <option value="St. Valentin,Niederösterreich">St. Valentin, Niederösterreich</option>
                        <option value="Perg,Oberösterreich">Perg, Oberösterreich</option>
                        <option value="Attnang-Puchheim,Oberösterreich">Attnang-Puchheim, Oberösterreich</option>
                        <option value="Deutsch-Wagram,Niederösterreich">Deutsch-Wagram, Niederösterreich</option>
                        <option value="Berndorf,Niederösterreich">Berndorf, Niederösterreich</option>
                        <option value="Neusiedl am See,Burgenland">Neusiedl am See, Burgenland</option>
                        <option value="Fürstenfeld,Steiermark">Fürstenfeld, Steiermark</option>
                        <option value="Neulengbach,Niederösterreich">Neulengbach, Niederösterreich</option>
                        <option value="Bruck an der Leitha,Niederösterreich">Bruck an der Leitha, Niederösterreich</option>
                        <option value="Kitzbühel,Tirol">Kitzbühel, Tirol</option>
                        <option value="Liezen,Steiermark">Liezen, Steiermark</option>
                        <option value="Kindberg,Steiermark">Kindberg, Steiermark</option>
                        <option value="Freistadt,Oberösterreich">Freistadt, Oberösterreich</option>
                        <option value="Mürzzuschlag,Steiermark">Mürzzuschlag, Steiermark</option>
                        <option value="Oberwart,Burgenland">Oberwart, Burgenland</option>
                        <option value="Herzogenburg,Niederösterreich">Herzogenburg, Niederösterreich</option>
                        <option value="Pressbaum,Niederösterreich">Pressbaum, Niederösterreich</option>
                        <option value="Langenlois,Niederösterreich">Langenlois, Niederösterreich</option>
                        <option value="Landeck,Tirol">Landeck, Tirol</option>
                        <option value="Mattersburg,Burgenland">Mattersburg, Burgenland</option>
                        <option value="Nicht in der Liste">Nicht in der Liste</option>
					</select>
				{:else if country === "Schweiz"}
                <select name="city" class="w-full select" bind:value={city}>
                        <!-- https://de.wikipedia.org/wiki/Liste_der_St%C3%A4dte_in_der_Schweiz -->
                        <option disabled selected>Wähle ein Stadt (100 größten der Schweiz)</option>
                        <option selected value="Zürich,Kanton Zürich">Zürich, Kanton Zürich</option>
                        <option value="Genf,Kanton Genf">Genf, Kanton Genf</option>
                        <option value="Basel,Kanton Basel-Stadt">Basel, Kanton Basel-Stadt</option>
                        <option value="Lausanne,Kanton Waadt">Lausanne, Kanton Waadt</option>
                        <option value="Bern,Kanton Bern">Bern, Kanton Bern</option>
                        <option value="Winterthur,Kanton Zürich">Winterthur, Kanton Zürich</option>
                        <option value="Luzern,Kanton Luzern">Luzern, Kanton Luzern</option>
                        <option value="St. Gallen,Kanton St. Gallen">St. Gallen, Kanton St. Gallen</option>
                        <option value="Lugano,Kanton Tessin">Lugano, Kanton Tessin</option>
                        <option value="Biel/Bienne,Kanton Bern">Biel/Bienne, Kanton Bern</option>
                        <option value="Thun,Kanton Bern">Thun, Kanton Bern</option>
                        <option value="Bellinzona,Kanton Tessin">Bellinzona, Kanton Tessin</option>
                        <option value="Köniz,Kanton Bern">Köniz, Kanton Bern</option>
                        <option value="Freiburg,Kanton Freiburg">Freiburg, Kanton Freiburg</option>
                        <option value="Schaffhausen,Kanton Schaffhausen">Schaffhausen, Kanton Schaffhausen</option>
                        <option value="La Chaux-de-Fonds,Kanton Neuenburg">La Chaux-de-Fonds, Kanton Neuenburg</option>
                        <option value="Chur,Kanton Graubünden">Chur, Kanton Graubünden</option>
                        <option value="Uster,Kanton Zürich">Uster, Kanton Zürich</option>
                        <option value="Sitten,Kanton Wallis">Sitten, Kanton Wallis</option>
                        <option value="Vernier,Kanton Genf">Vernier, Kanton Genf</option>
                        <option value="Lancy,Kanton Genf">Lancy, Kanton Genf</option>
                        <option value="Neuenburg,Kanton Neuenburg">Neuenburg, Kanton Neuenburg</option>
                        <option value="Emmen,Kanton Luzern">Emmen, Kanton Luzern</option>
                        <option value="Zug,Kanton Zug">Zug, Kanton Zug</option>
                        <option value="Yverdon-les-Bains,Kanton Waadt">Yverdon-les-Bains, Kanton Waadt</option>
                        <option value="Dübendorf,Kanton Zürich">Dübendorf, Kanton Zürich</option>
                        <option value="Kriens,Kanton Luzern">Kriens, Kanton Luzern</option>
                        <option value="Dietikon,Kanton Zürich">Dietikon, Kanton Zürich</option>
                        <option value="Rapperswil-Jona,Kanton St. Gallen">Rapperswil-Jona, Kanton St. Gallen</option>
                        <option value="Meyrin,Kanton Genf">Meyrin, Kanton Genf</option>
                        <option value="Montreux,Kanton Waadt">Montreux, Kanton Waadt</option>
                        <option value="Frauenfeld,Kanton Thurgau">Frauenfeld, Kanton Thurgau</option>
                        <option value="Wetzikon,Kanton Zürich">Wetzikon, Kanton Zürich</option>
                        <option value="Wädenswil,Kanton Zürich">Wädenswil, Kanton Zürich</option>
                        <option value="Baar,Kanton Zug">Baar, Kanton Zug</option>
                        <option value="Bulle,Kanton Freiburg">Bulle, Kanton Freiburg</option>
                        <option value="Wil,Kanton St. Gallen">Wil, Kanton St. Gallen</option>
                        <option value="Horgen,Kanton Zürich">Horgen, Kanton Zürich</option>
                        <option value="Carouge,Kanton Genf">Carouge, Kanton Genf</option>
                        <option value="Kreuzlingen,Kanton Thurgau">Kreuzlingen, Kanton Thurgau</option>
                        <option value="Bülach,Kanton Zürich">Bülach, Kanton Zürich</option>
                        <option value="Aarau,Kanton Aargau">Aarau, Kanton Aargau</option>
                        <option value="Nyon,Kanton Waadt">Nyon, Kanton Waadt</option>
                        <option value="Riehen,Kanton Basel-Stadt">Riehen, Kanton Basel-Stadt</option>
                        <option value="Allschwil,Kanton Basel-Landschaft">Allschwil, Kanton Basel-Landschaft</option>
                        <option value="Wettingen,Kanton Aargau">Wettingen, Kanton Aargau</option>
                        <option value="Opfikon,Kanton Zürich">Opfikon, Kanton Zürich</option>
                        <option value="Renens,Kanton Waadt">Renens, Kanton Waadt</option>
                        <option value="Kloten,Kanton Zürich">Kloten, Kanton Zürich</option>
                        <option value="Schlieren,Kanton Zürich">Schlieren, Kanton Zürich</option>
                        <option value="Vevey,Kanton Waadt">Vevey, Kanton Waadt</option>
                        <option value="Baden,Kanton Aargau">Baden, Kanton Aargau</option>
                        <option value="Reinach,Kanton Basel-Landschaft">Reinach, Kanton Basel-Landschaft</option>
                        <option value="Adliswil,Kanton Zürich">Adliswil, Kanton Zürich</option>
                        <option value="Onex,Kanton Genf">Onex, Kanton Genf</option>
                        <option value="Volketswil,Kanton Zürich">Volketswil, Kanton Zürich</option>
                        <option value="Glarus Nord,Kanton Glarus">Glarus Nord, Kanton Glarus</option>
                        <option value="Pully,Kanton Waadt">Pully, Kanton Waadt</option>
                        <option value="Regensdorf,Kanton Zürich">Regensdorf, Kanton Zürich</option>
                        <option value="Olten,Kanton Solothurn">Olten, Kanton Solothurn</option>
                        <option value="Martigny,Kanton Wallis">Martigny, Kanton Wallis</option>
                        <option value="Thalwil,Kanton Zürich">Thalwil, Kanton Zürich</option>
                        <option value="Gossau,Kanton St. Gallen">Gossau, Kanton St. Gallen</option>
                        <option value="Muttenz,Kanton Basel-Landschaft">Muttenz, Kanton Basel-Landschaft</option>
                        <option value="Monthey,Kanton Wallis">Monthey, Kanton Wallis</option>
                        <option value="Ostermundigen,Kanton Bern">Ostermundigen, Kanton Bern</option>
                        <option value="Grenchen,Kanton Solothurn">Grenchen, Kanton Solothurn</option>
                        <option value="Illnau-Effretikon,Kanton Zürich">Illnau-Effretikon, Kanton Zürich</option>
                        <option value="Wallisellen,Kanton Zürich">Wallisellen, Kanton Zürich</option>
                        <option value="Val-de-Ruz,Kanton Neuenburg">Val-de-Ruz, Kanton Neuenburg</option>
                        <option value="Cham,Kanton Zug">Cham, Kanton Zug</option>
                        <option value="Wohlen,Kanton Aargau">Wohlen, Kanton Aargau</option>
                        <option value="Siders,Kanton Wallis">Siders, Kanton Wallis</option>
                        <option value="Solothurn,Kanton Solothurn">Solothurn, Kanton Solothurn</option>
                        <option value="Pratteln,Kanton Basel-Landschaft">Pratteln, Kanton Basel-Landschaft</option>
                        <option value="Burgdorf,Kanton Bern">Burgdorf, Kanton Bern</option>
                        <option value="Freienbach,Kanton Schwyz">Freienbach, Kanton Schwyz</option>
                        <option value="Einsiedeln,Kanton Schwyz">Einsiedeln, Kanton Schwyz</option>
                        <option value="Morges,Kanton Waadt">Morges, Kanton Waadt</option>
                        <option value="Steffisburg,Kanton Bern">Steffisburg, Kanton Bern</option>
                        <option value="Binningen,Kanton Basel-Landschaft">Binningen, Kanton Basel-Landschaft</option>
                        <option value="Lyss,Kanton Bern">Lyss, Kanton Bern</option>
                        <option value="Locarno,Kanton Tessin">Locarno, Kanton Tessin</option>
                        <option value="Herisau,Kanton Appenzell Ausserrhoden">Herisau, Kanton Appenzell Ausserrhoden</option>
                        <option value="Langenthal M,Kanton Bern">Langenthal M, Kanton Bern</option>
                        <option value="Schwyz M,Kanton Schwyz">Schwyz M, Kanton Schwyz</option>
                        <option value="Arbon,Kanton Thurgau">Arbon, Kanton Thurgau</option>
                        <option value="Mendrisio,Kanton Tessin">Mendrisio, Kanton Tessin</option>
                        <option value="Küsnacht,Kanton Zürich">Küsnacht, Kanton Zürich</option>
                        <option value="Stäfa,Kanton Zürich">Stäfa, Kanton Zürich</option>
                        <option value="Liestal,Kanton Basel-Landschaft">Liestal, Kanton Basel-Landschaft</option>
                        <option value="Thônex,Kanton Genf">Thônex, Kanton Genf</option>
                        <option value="Meilen,Kanton Zürich">Meilen, Kanton Zürich</option>
                        <option value="Oftringen,Kanton Aargau">Oftringen, Kanton Aargau</option>
                        <option value="Horw,Kanton Luzern">Horw, Kanton Luzern</option>
                        <option value="Amriswil,Kanton Thurgau">Amriswil, Kanton Thurgau</option>
                        <option value="Ebikon,Kanton Luzern">Ebikon, Kanton Luzern</option>
                        <option value="Richterswil,Kanton Zürich">Richterswil, Kanton Zürich</option>
                        <option value="Rheinfelden,Kanton Aargau">Rheinfelden, Kanton Aargau</option>
                        <option value="Küssnacht SZ,Kanton Schwyz">Küssnacht SZ, Kanton Schwyz</option>
                        <option value="Zollikon,Kanton Zürich">Zollikon, Kanton Zürich</option>                    
                        <option value="Nicht in der Liste">Nicht in der Liste</option>
                    </select>
                {:else if country === "Deutschland"}
                    <select name="city" class="w-full select" bind:value={city}>
                        <!-- https://de.wikipedia.org/wiki/Liste_der_Gro%C3%9F-_und_Mittelst%C3%A4dte_in_Deutschland -->     
                        <option disabled selected>Wähle ein Stadt (100 größten Deutschlands)</option>
                        <option selected value="Berlin,Berlin">Berlin, Berlin</option>
                        <option value="Hamburg,Hamburg">Hamburg, Hamburg</option>
                        <option value="München,Bayern">München, Bayern</option>
                        <option value="Köln,Nordrhein-Westfalen">Köln, Nordrhein-Westfalen</option>
                        <option value="Frankfurt am Main,Hessen">Frankfurt am Main, Hessen</option>
                        <option value="Stuttgart,Baden-Württemberg">Stuttgart, Baden-Württemberg</option>
                        <option value="Düsseldorf,Nordrhein-Westfalen">Düsseldorf, Nordrhein-Westfalen</option>
                        <option value="Leipzig,Sachsen">Leipzig, Sachsen</option>
                        <option value="Dortmund,Nordrhein-Westfalen">Dortmund, Nordrhein-Westfalen</option>
                        <option value="Essen,Nordrhein-Westfalen">Essen, Nordrhein-Westfalen</option>
                        <option value="Bremen,Bremen">Bremen, Bremen</option>
                        <option value="Dresden,Sachsen">Dresden, Sachsen</option>
                        <option value="Hannover,Niedersachsen">Hannover, Niedersachsen</option>
                        <option value="Nürnberg,Bayern">Nürnberg, Bayern</option>
                        <option value="Duisburg,Nordrhein-Westfalen">Duisburg, Nordrhein-Westfalen</option>
                        <option value="Bochum,Nordrhein-Westfalen">Bochum, Nordrhein-Westfalen</option>
                        <option value="Wuppertal,Nordrhein-Westfalen">Wuppertal, Nordrhein-Westfalen</option>
                        <option value="Bielefeld,Nordrhein-Westfalen">Bielefeld, Nordrhein-Westfalen</option>
                        <option value="Bonn,Nordrhein-Westfalen">Bonn, Nordrhein-Westfalen</option>
                        <option value="Münster,Nordrhein-Westfalen">Münster, Nordrhein-Westfalen</option>
                        <option value="Mannheim,Baden-Württemberg">Mannheim, Baden-Württemberg</option>
                        <option value="Karlsruhe,Baden-Württemberg">Karlsruhe, Baden-Württemberg</option>
                        <option value="Augsburg,Bayern">Augsburg, Bayern</option>
                        <option value="Wiesbaden,Hessen">Wiesbaden, Hessen</option>
                        <option value="Mönchengladbach,Nordrhein-Westfalen">Mönchengladbach, Nordrhein-Westfalen</option>
                        <option value="Gelsenkirchen,Nordrhein-Westfalen">Gelsenkirchen, Nordrhein-Westfalen</option>
                        <option value="Aachen,Nordrhein-Westfalen">Aachen, Nordrhein-Westfalen</option>
                        <option value="Braunschweig,Niedersachsen">Braunschweig, Niedersachsen</option>
                        <option value="Chemnitz,Sachsen">Chemnitz, Sachsen</option>
                        <option value="Kiel,Schleswig-Holstein">Kiel, Schleswig-Holstein</option>
                        <option value="Halle (Saale),Sachsen-Anhalt">Halle (Saale), Sachsen-Anhalt</option>
                        <option value="Magdeburg,Sachsen-Anhalt">Magdeburg, Sachsen-Anhalt</option>
                        <option value="Freiburg im Breisgau,Baden-Württemberg">Freiburg im Breisgau, Baden-Württemberg</option>
                        <option value="Krefeld,Nordrhein-Westfalen">Krefeld, Nordrhein-Westfalen</option>
                        <option value="Mainz,Rheinland-Pfalz">Mainz, Rheinland-Pfalz</option>
                        <option value="Lübeck,Schleswig-Holstein">Lübeck, Schleswig-Holstein</option>
                        <option value="Erfurt,Thüringen">Erfurt, Thüringen</option>
                        <option value="Oberhausen,Nordrhein-Westfalen">Oberhausen, Nordrhein-Westfalen</option>
                        <option value="Rostock,Mecklenburg-Vorpommern">Rostock, Mecklenburg-Vorpommern</option>
                        <option value="Kassel,Hessen">Kassel, Hessen</option>
                        <option value="Hagen,Nordrhein-Westfalen">Hagen, Nordrhein-Westfalen</option>
                        <option value="Potsdam,Brandenburg">Potsdam, Brandenburg</option>
                        <option value="Saarbrücken,Saarland">Saarbrücken, Saarland</option>
                        <option value="Hamm,Nordrhein-Westfalen">Hamm, Nordrhein-Westfalen</option>
                        <option value="Ludwigshafen am Rhein,Rheinland-Pfalz">Ludwigshafen am Rhein, Rheinland-Pfalz</option>
                        <option value="Oldenburg,Niedersachsen">Oldenburg, Niedersachsen</option>
                        <option value="Mülheim an der Ruhr,Nordrhein-Westfalen">Mülheim an der Ruhr, Nordrhein-Westfalen</option>
                        <option value="Osnabrück,Niedersachsen">Osnabrück, Niedersachsen</option>
                        <option value="Leverkusen,Nordrhein-Westfalen">Leverkusen, Nordrhein-Westfalen</option>
                        <option value="Heidelberg,Baden-Württemberg">Heidelberg, Baden-Württemberg</option>
                        <option value="Darmstadt,Hessen">Darmstadt, Hessen</option>
                        <option value="Solingen,Nordrhein-Westfalen">Solingen, Nordrhein-Westfalen</option>
                        <option value="Regensburg,Bayern">Regensburg, Bayern</option>
                        <option value="Herne,Nordrhein-Westfalen">Herne, Nordrhein-Westfalen</option>
                        <option value="Paderborn,Nordrhein-Westfalen">Paderborn, Nordrhein-Westfalen</option>
                        <option value="Neuss,Nordrhein-Westfalen">Neuss, Nordrhein-Westfalen</option>
                        <option value="Ingolstadt,Bayern">Ingolstadt, Bayern</option>
                        <option value="Offenbach am Main,Hessen">Offenbach am Main, Hessen</option>
                        <option value="Fürth,Bayern">Fürth, Bayern</option>
                        <option value="Ulm,Baden-Württemberg">Ulm, Baden-Württemberg</option>
                        <option value="Heilbronn,Baden-Württemberg">Heilbronn, Baden-Württemberg</option>
                        <option value="Pforzheim,Baden-Württemberg">Pforzheim, Baden-Württemberg</option>
                        <option value="Würzburg,Bayern">Würzburg, Bayern</option>
                        <option value="Wolfsburg,Niedersachsen">Wolfsburg, Niedersachsen</option>
                        <option value="Göttingen,Niedersachsen">Göttingen, Niedersachsen</option>
                        <option value="Bottrop,Nordrhein-Westfalen">Bottrop, Nordrhein-Westfalen</option>
                        <option value="Reutlingen,Baden-Württemberg">Reutlingen, Baden-Württemberg</option>
                        <option value="Erlangen,Bayern">Erlangen, Bayern</option>
                        <option value="Bremerhaven,Bremen">Bremerhaven, Bremen</option>
                        <option value="Koblenz,Rheinland-Pfalz">Koblenz, Rheinland-Pfalz</option>
                        <option value="Bergisch Gladbach,Nordrhein-Westfalen">Bergisch Gladbach, Nordrhein-Westfalen</option>
                        <option value="Remscheid,Nordrhein-Westfalen">Remscheid, Nordrhein-Westfalen</option>
                        <option value="Trier,Rheinland-Pfalz">Trier, Rheinland-Pfalz</option>
                        <option value="Recklinghausen,Nordrhein-Westfalen">Recklinghausen, Nordrhein-Westfalen</option>
                        <option value="Jena,Thüringen">Jena, Thüringen</option>
                        <option value="Moers,Nordrhein-Westfalen">Moers, Nordrhein-Westfalen</option>
                        <option value="Salzgitter,Niedersachsen">Salzgitter, Niedersachsen</option>
                        <option value="Siegen,Nordrhein-Westfalen">Siegen, Nordrhein-Westfalen</option>
                        <option value="Gütersloh,Nordrhein-Westfalen">Gütersloh, Nordrhein-Westfalen</option>
                        <option value="Hildesheim,Niedersachsen">Hildesheim, Niedersachsen</option>
                        <option value="Hanau,Hessen">Hanau, Hessen</option>
                        <option value="Kaiserslautern,Rheinland-Pfalz">Kaiserslautern, Rheinland-Pfalz</option>
                        <option value="Cottbus,Brandenburg">Cottbus, Brandenburg</option>
                        <option value="Schwerin,Mecklenburg-Vorpommern">Schwerin, Mecklenburg-Vorpommern</option>
                        <option value="Witten,Nordrhein-Westfalen">Witten, Nordrhein-Westfalen</option>
                        <option value="Esslingen am Neckar,Baden-Württemberg">Esslingen am Neckar, Baden-Württemberg</option>
                        <option value="Ludwigsburg,Baden-Württemberg">Ludwigsburg, Baden-Württemberg</option>
                        <option value="Gießen,Hessen">Gießen, Hessen</option>
                        <option value="Gera,Thüringen">Gera, Thüringen</option>
                        <option value="Düren,Nordrhein-Westfalen">Düren, Nordrhein-Westfalen</option>
                        <option value="Tübingen,Baden-Württemberg">Tübingen, Baden-Württemberg</option>
                        <option value="Flensburg,Schleswig-Holstein">Flensburg, Schleswig-Holstein</option>
                        <option value="Iserlohn,Nordrhein-Westfalen">Iserlohn, Nordrhein-Westfalen</option>
                        <option value="Villingen-Schwenningen,Baden-Württemberg">Villingen-Schwenningen, Baden-Württemberg</option>
                        <option value="Ratingen,Nordrhein-Westfalen">Ratingen, Nordrhein-Westfalen</option>
                        <option value="Zwickau,Sachsen">Zwickau, Sachsen</option>
                        <option value="Lünen,Nordrhein-Westfalen">Lünen, Nordrhein-Westfalen</option>
                        <option value="Konstanz,Baden-Württemberg">Konstanz, Baden-Württemberg</option>
                        <option value="Worms,Rheinland-Pfalz">Worms, Rheinland-Pfalz</option>
                        <option value="Marl,Nordrhein-Westfalen">Marl, Nordrhein-Westfalen</option>
                        <option value="Minden,Nordrhein-Westfalen">Minden, Nordrhein-Westfalen</option>
                        <option value="Nicht in der Liste">Nicht in der Liste</option>
                    </select>
				{/if}
                {#if city_not_in_list === true}
                    <input
                        type="text"
                        name="city"
                        class="input input-bordered"
                        title="Stadt"
                        placeholder="Stadt"
                        bind:value={alt_city}
                    />
                {/if}
                Wie können wir uns bei dir melden?
				<div class="grid grid-rows-1 sm:grid-cols-[1fr_auto] gap-2">
					<input
						type="email"
						name="email"
						class="input input-bordered"
						title="Email"
						placeholder="deine@email.tld"
					/>
					<button type="submit" class="btn btn-secondary">Absenden</button>
				</div>
			</form>
		</div>
	</div>
</main>
