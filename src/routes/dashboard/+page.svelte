<script lang="ts">
	import { browser } from '$app/environment';
	import { toast } from 'svelte-french-toast';
    import { DataHandler, Datatable, Th } from '@vincjo/datatables';
	import { onMount } from 'svelte';
    import { setCookie, getCookie } from '$script/utility';
    import IconLoader from '$component/IconLoader.svelte';
 
    let loginState = false;
    let jwt = "";

    async function getAllGigSuggestions(): Promise<any[]> {
        const response = await fetch("/gig-location-suggestions", {
            method: 'POST',
            body: JSON.stringify({
                storedKey: jwt,
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

        return res.objres;
    }

    async function getAllGigLetterSubscribers(): Promise<any[]> {
        const response = await fetch("/gig-letter-subscribers", {
            method: 'POST',
            body: JSON.stringify({
                storedKey: jwt,
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

        return res.objres;
    }
    
	let gigLocationSuggestionsHandler = new DataHandler(new Array(), { rowsPerPage: 50 });
	$: gigLocationSuggestions = gigLocationSuggestionsHandler?.getRows();

    let gigLetterSubscribersHandler = new DataHandler(new Array(), { rowsPerPage: 50 });
	$: gigLetterSubscribers = gigLetterSubscribersHandler?.getRows();

    async function initializeTables(isPageLoad = false) {
        if ($gigLocationSuggestions?.length != 0 || !isPageLoad || await validateLogin(null, jwt)) {
            const allGigLocationSuggestionsData = await getAllGigSuggestions();
            gigLocationSuggestionsHandler?.setRows(allGigLocationSuggestionsData);
        }

        if ($gigLetterSubscribers?.length != 0 || !isPageLoad || await validateLogin(null, jwt)) {
            const allGigLetterSubscribersData = await getAllGigLetterSubscribers();
            gigLetterSubscribersHandler?.setRows(allGigLetterSubscribersData);
        }
    }

    onMount(async () => {
        jwt = getCookie("tfo-jwt") ?? "null";

        if (jwt !== "null" || jwt !== undefined || jwt !== null) {
            loginState = await validateLogin(null, jwt);
            initializeTables(true);
        }
    });

    const login = async function(event: Event) {
        const form = event.target as HTMLFormElement;
        const data = new FormData(form);

        const formDataObject: Record<string, any> = {};

        data.forEach((value, key) => {
            formDataObject[key] = value;
        });
                
        if (browser) {
            if (jwt !== "null" && jwt !== undefined && jwt !== null) {
                loginState = await validateLogin(formDataObject, jwt);
            } else {
                const key = await validateLogin(formDataObject);

                if (key) {
                    jwt = key;
                    setCookie("tfo-jwt", jwt, 1); // Cookie expires after 1 hour

                    loginState = true;

                    await initializeTables();
                }
            }
        }
    }

    async function validateLogin(formData: Record<string, any> | null, storedKey: string | null = "null") {
        const response = await fetch("", {
            method: 'POST',
            body: JSON.stringify({
                formData,
                storedKey
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

        return res.objres;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="absolute overflow-hidden cursor-pointer right-2 top-2" on:click={() => initializeTables()}>
    <IconLoader icon="mdi:reload" color="hsl(var(--a))" width={"50px"}>reload tables</IconLoader>
</div>

<main class="flex items-center justify-center h-screen bg-white">
    {#if loginState && gigLocationSuggestionsHandler && gigLetterSubscribersHandler}
        <div class="flex flex-col min-h-screen">
            <h2 class="mt-2 text-2xl font-extrabold text-accent">Gig-Location Vorschläge</h2>
            <Datatable handler={gigLocationSuggestionsHandler}>
                <table class="table">
                    <thead class="text-black">
                        <tr>
                            <Th handler={gigLocationSuggestionsHandler} orderBy="message">Nachricht</Th>
                            <Th handler={gigLocationSuggestionsHandler} orderBy="country">Land</Th>
                            <Th handler={gigLocationSuggestionsHandler} orderBy="city">Stadt/Ort</Th>
                            <Th handler={gigLocationSuggestionsHandler} orderBy="email">Email</Th>
                        </tr>
                    </thead>
                    <tbody class="text-black">
                        {#each $gigLocationSuggestions as suggestion}
                            <tr>
                                <td class="p-4">{suggestion?.message ?? ''}</td>
                                <td class="p-4">{suggestion?.country ?? ''}</td>
                                <td class="p-4">{suggestion?.city ?? ''}</td>
                                <td class="p-4"><a href="mailto:{suggestion?.email}">{suggestion?.email ?? ''}</a></td>
                            </tr>
                        {:else}
                            loading gig suggestions...
                        {/each}
                    </tbody>
                </table>
            </Datatable>
        </div>
        <div class="divider 2xl:divider-horizontal"></div>
        <div class="flex flex-col min-h-screen">
            <h2 class="mt-2 text-2xl font-extrabold text-accent">Gig-Letter Subscribers</h2>
            <Datatable handler={gigLetterSubscribersHandler}>
                <table class="table">
                    <thead class="text-black">
                        <tr>
                            <Th handler={gigLetterSubscribersHandler} orderBy="key">Email</Th>
                            <Th handler={gigLetterSubscribersHandler} orderBy="value">Abonniert</Th>
                        </tr>
                    </thead>
                    <tbody class="text-black">
                        {#each $gigLetterSubscribers as subscriber}
                            <tr>
                                <td class="p-4"><a href="mailto:{subscriber?.key ?? ''}">{subscriber?.key ?? ''}</a></td>
                                <td class="p-4">{subscriber?.value ?? ''}</td>
                            </tr>
                        {:else}
                            loading gig suggestions...
                        {/each}
                    </tbody>
                </table>
            </Datatable>
        </div>
    {:else}
        <div id="dashboard-login" class="p-2 border-2 bg-neutral border-primary rounded-2xl">
            <h3 class="mb-4 text-3xl font-bold text-secondary">Dashboard</h3>
            <div class="flex flex-col gap-2">
                <form
                    on:submit|preventDefault={login}
                    class="grid grid-rows-1 sm:grid-cols-[1fr_auto] gap-2"
                >
                    <input
                        type="password"
                        name="password"
                        class="input input-bordered"
                        title="password"
                        placeholder="*****"
                    />
                    <button type="submit" class="btn-secondary btn">login</button>
                </form>
            </div>
        </div>
    {/if}
</main>