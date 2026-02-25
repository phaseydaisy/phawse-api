const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
};

const CATEGORY_FAMILIES = {
	disgust: ['disgust', 'disgusted', 'gross', 'ew', 'eww'],
	cringe: ['cringe', 'cringy', 'cringey'],
	facepalm: ['facepalm'],
	pout: ['pout', 'pouting'],
	nope: ['nope'],
	shrug: ['shrug', 'shrugging'],
	bored: ['bored'],
	smug: ['smug'],
	poke: ['poke', 'poking'],
	boop: ['boop', 'touch'],
	lurk: ['lurk', 'lurking'],
	shoot: ['shoot', 'shooting'],
	lick: ['lick', 'licking'],
	stare: ['stare', 'staring'],
	yeet: ['yeet'],
	lewd: ['lewd', 'nsfw'],
	hentai: ['hentai', 'ecchi'],
	blowjob: ['blowjob', 'bj', 'fellatio', 'suck', 'sucking', 'sex'],
	trap: ['trap'],
	neko: ['neko'],
	waifu: ['waifu'],
	hug: ['hug', 'hugging'],
	kiss: ['kiss', 'kissing'],
	pat: ['pat', 'patting', 'headpat', 'pats'],
	slap: ['slap', 'slapping'],
	smile: ['smile', 'smiling'],
	cry: ['cry', 'crying'],
	laugh: ['laugh', 'laughing'],
	wave: ['wave', 'waving'],
	wink: ['wink', 'winking'],
	dance: ['dance', 'dancing'],
	blush: ['blush', 'blushing'],
	punch: ['punch', 'punching'],
	kick: ['kick', 'kicking'],
	bite: ['bite', 'biting'],
	cuddle: ['cuddle', 'cuddling'],
	tickle: ['tickle', 'tickling'],
	handhold: ['handhold', 'handholding'],
	highfive: ['highfive'],
	happy: ['happy', 'joy', 'joyful'],
	sad: ['sad', 'sorrow'],
	angry: ['angry', 'mad']
};

const SFW_PROVIDER_MAP = {
	waifupics: {
		supportsAliasTags: false,
		supportedTags: ['cringe', 'hug', 'kiss', 'pat', 'poke', 'slap', 'smile', 'cry', 'wave', 'wink', 'dance', 'blush', 'kick', 'bite', 'lick', 'cuddle', 'highfive', 'handhold'],
		canonicalToSource: {
			cringe: 'cringe',
			hug: 'hug',
			kiss: 'kiss',
			pat: 'pat',
			boop: 'poke',
			poke: 'poke',
			slap: 'slap',
			smile: 'smile',
			cry: 'cry',
			wave: 'wave',
			wink: 'wink',
			dance: 'dance',
			blush: 'blush',
			kick: 'kick',
			bite: 'bite',
			lick: 'lick',
			cuddle: 'cuddle',
			highfive: 'highfive',
			handhold: 'handhold'
		}
	},
	nekosbest: {
		supportsAliasTags: true,
		supportedTags: ['hug', 'kiss', 'slap', 'pat', 'poke', 'wave', 'smile', 'highfive', 'handshake', 'bite', 'blush', 'bored', 'cry', 'dance', 'facepalm', 'feed', 'happy', 'laugh', 'nod', 'nom', 'nope', 'pout', 'shrug', 'sleep', 'smug', 'stare', 'think', 'thumbsup', 'tickle', 'wink', 'yawn', 'yeet', 'lurk', 'shoot'],
		canonicalToSource: {
			disgust: 'facepalm',
			facepalm: 'facepalm',
			pout: 'pout',
			nope: 'nope',
			shrug: 'shrug',
			bored: 'bored',
			smug: 'smug',
			boop: 'poke',
			lurk: 'lurk',
			shoot: 'shoot',
			poke: 'poke',
			stare: 'stare',
			yeet: 'yeet',
			hug: 'hug',
			kiss: 'kiss',
			pat: 'pat',
			slap: 'slap',
			smile: 'smile',
			cry: 'cry',
			laugh: 'laugh',
			wave: 'wave',
			wink: 'wink',
			dance: 'dance',
			blush: 'blush',
			punch: 'punch',
			bite: 'bite',
			cuddle: 'cuddle',
			tickle: 'tickle',
			highfive: 'highfive',
			happy: 'happy'
		}
	},
	nekosapiweb: {
		supportsAliasTags: true,
		supportedTags: ['baka', 'bite', 'blush', 'bored', 'cry', 'cuddle', 'dance', 'facepalm', 'feed', 'handhold', 'happy', 'highfive', 'hug', 'kick', 'kiss', 'laugh', 'lick', 'nom', 'pat', 'poke', 'pout', 'punch', 'shoot', 'shrug', 'slap', 'sleep', 'smile', 'smug', 'stare', 'tickle', 'wave', 'wink', 'yeet'],
		canonicalToSource: {
			disgust: 'facepalm',
			facepalm: 'facepalm',
			pout: 'pout',
			shrug: 'shrug',
			bored: 'bored',
			smug: 'smug',
			boop: 'poke',
			lurk: 'stare',
			shoot: 'shoot',
			poke: 'poke',
			stare: 'stare',
			yeet: 'yeet',
			hug: 'hug',
			kiss: 'kiss',
			pat: 'pat',
			slap: 'slap',
			smile: 'smile',
			cry: 'cry',
			laugh: 'laugh',
			wave: 'wave',
			wink: 'wink',
			dance: 'dance',
			blush: 'blush',
			punch: 'punch',
			bite: 'bite',
			lick: 'lick',
			cuddle: 'cuddle',
			tickle: 'tickle',
			happy: 'happy',
			handhold: 'handhold'
		}
	},
	animeapi: {
		supportsAliasTags: true,
		supportedTags: ['hug', 'kiss', 'slap', 'pat', 'wave', 'smile', 'cry', 'dance', 'sleep'],
		canonicalToSource: {
			hug: 'hug',
			kiss: 'kiss',
			slap: 'slap',
			pat: 'pat',
			wave: 'wave',
			smile: 'smile',
			cry: 'cry',
			dance: 'dance'
		}
	},
	nekoslife: {
		supportsAliasTags: true,
		supportedTags: ['neko', 'hug', 'pat', 'kiss', 'slap', 'poke', 'tickle', 'feed', 'cuddle', 'fox_girl', 'waifu', 'smug'],
		canonicalToSource: {
			hug: 'hug',
			kiss: 'kiss',
			pat: 'pat',
			boop: 'poke',
			poke: 'poke',
			slap: 'slap',
			tickle: 'tickle',
			cuddle: 'cuddle'
		}
	},
	kawaiired: {
		supportsAliasTags: true,
		supportedTags: ['hug', 'kiss', 'slap', 'pat', 'poke', 'cuddle', 'neko', 'waifu', 'smile', 'wave'],
		canonicalToSource: {
			hug: 'hug',
			kiss: 'kiss',
			slap: 'slap',
			pat: 'pat',
			cuddle: 'cuddle',
			smile: 'smile',
			wave: 'wave'
		}
	},
	otakugif: {
		supportsAliasTags: true,
		supportedTags: ['hug', 'kiss', 'pat', 'slap', 'poke', 'lick', 'cuddle', 'cry', 'wave', 'wink', 'dance', 'smile', 'blush', 'pout', 'facepalm', 'shrug', 'handhold', 'tickle', 'bite', 'laugh'],
		canonicalToSource: {
			disgust: 'facepalm',
			facepalm: 'facepalm',
			pout: 'pout',
			shrug: 'shrug',
			boop: 'poke',
			poke: 'poke',
			lick: 'lick',
			hug: 'hug',
			kiss: 'kiss',
			pat: 'pat',
			slap: 'slap',
			smile: 'smile',
			cry: 'cry',
			laugh: 'laugh',
			wave: 'wave',
			wink: 'wink',
			dance: 'dance',
			blush: 'blush',
			bite: 'bite',
			cuddle: 'cuddle',
			tickle: 'tickle',
			handhold: 'handhold'
		}
	},
	tenor: {
		supportsAliasTags: true,
		canonicalToSource: {}
	}
};

const NSFW_PROVIDER_MAP = {
	waifupics: {
		supportsAliasTags: true,
		supportedTags: ['waifu', 'neko', 'trap', 'blowjob'],
		canonicalToSource: {
			sex: 'blowjob',
			suck: 'blowjob',
			waifu: 'waifu',
			neko: 'neko',
			trap: 'trap',
			blowjob: 'blowjob'
		}
	},
	nekoslife: {
		supportsAliasTags: true,
		supportedTags: ['lewd'],
		canonicalToSource: {
			lewd: 'lewd'
		}
	}
};

function normalizeCategory(value) {
	return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

function jsonResponse(data, status = 200, headers = CORS_HEADERS) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json',
			...headers
		}
	});
}

function resolveCategory(category) {
	const normalized = normalizeCategory(category);
	if (!normalized) return null;

	for (const [canonical, aliases] of Object.entries(CATEGORY_FAMILIES)) {
		if (aliases.includes(normalized)) {
			return {
				canonical,
				requested: normalized,
				aliases
			};
		}
	}

	return {
		canonical: normalized,
		requested: normalized,
		aliases: [normalized]
	};
}

function categoryFamilyIncludes(categoryInfo, text) {
	const normalizedText = normalizeCategory(text || '');
	if (!normalizedText) return false;
	return categoryInfo.aliases.some(alias => normalizedText.includes(alias));
}

function isLikelyImageOrGifUrl(url) {
	if (!url || typeof url !== 'string') return false;
	if (!url.startsWith('http')) return false;
	const lower = url.toLowerCase();
	return /\.(gif|jpg|jpeg|png|webp)(\?|$)/.test(lower);
}

function isLikelyGifUrl(url) {
	if (!url || typeof url !== 'string') return false;
	return /\.gif(\?|$)/i.test(url);
}

function isLikelyAnimeText(text) {
	const normalized = normalizeCategory(text || '');
	if (!normalized) return false;
	const hints = ['anime', 'manga', 'waifu', 'neko', 'otaku', 'chibi', 'kawaii', 'cosplay'];
	return hints.some(hint => normalized.includes(hint));
}

async function fetchJsonWithTimeout(resource, timeoutMs = 1800) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);
	try {
		const response = await fetch(resource, {
			signal: controller.signal,
			headers: {
				'User-Agent': 'PhawseAPI/3.0'
			}
		});

		if (!response.ok) return null;
		return await response.json();
	} catch {
		return null;
	} finally {
		clearTimeout(timeout);
	}
}

function toResult({ categoryInfo, sourceTag, sourceName, url, nsfw }) {
	if (!url || typeof url !== 'string') return null;
	if (!url.startsWith('http')) return null;

	return {
		category: categoryInfo.requested,
		canonical_category: categoryInfo.canonical,
		family_aliases: categoryInfo.aliases,
		nsfw,
		url: `https://api.phawse.lol/proxy/${encodeURIComponent(url)}`,
		original_url: url,
		source: sourceName,
		source_tag: sourceTag
	};
}

async function fromWaifuPics(sourceTag, categoryInfo, nsfw) {
	const type = nsfw ? 'nsfw' : 'sfw';
	const data = await fetchJsonWithTimeout(`https://api.waifu.pics/${type}/${sourceTag}`);
	if (!data?.url) return null;
	if (nsfw) {
		if (!isLikelyImageOrGifUrl(data.url)) return null;
	} else {
		if (!isLikelyGifUrl(data.url)) return null;
	}
	return toResult({ categoryInfo, sourceTag, sourceName: 'waifu.pics', url: data.url, nsfw });
}

async function fromNekosBest(sourceTag, categoryInfo, nsfw) {
	if (nsfw) return null;
	const data = await fetchJsonWithTimeout(`https://nekos.best/api/v2/${sourceTag}`);
	const url = data?.results?.[0]?.url;
	if (!url || !String(url).toLowerCase().endsWith('.gif')) return null;
	return toResult({ categoryInfo, sourceTag, sourceName: 'nekos.best', url, nsfw: false });
}

async function fromNekosApiWeb(sourceTag, categoryInfo, nsfw) {
	if (nsfw) return null;
	const data = await fetchJsonWithTimeout(`https://api.nekosapi.com/v4/images/random?rating=safe&tags=${encodeURIComponent(sourceTag)}`);
	const item = data?.items?.[0] || data?.data?.[0] || data?.image || data;
	const url = item?.url || item?.image_url || item?.src || data?.url;
	if (!url || !String(url).toLowerCase().endsWith('.gif')) return null;

	const tagText = Array.isArray(item?.tags)
		? item.tags.map(tag => (typeof tag === 'string' ? tag : (tag?.name || tag?.tag || ''))).join(' ')
		: String(sourceTag);

	if (!categoryFamilyIncludes(categoryInfo, `${tagText} ${sourceTag}`) && categoryInfo.canonical !== sourceTag) {
		return null;
	}

	return toResult({ categoryInfo, sourceTag, sourceName: 'nekosapi.com', url, nsfw: false });
}

async function fromAnimeApi(sourceTag, categoryInfo, nsfw) {
	if (nsfw) return null;
	const data = await fetchJsonWithTimeout(`https://api.anime-api.com/anime-gif/${encodeURIComponent(sourceTag)}`);
	const url = data?.url || data?.gif || data?.image;
	if (!url || !String(url).toLowerCase().endsWith('.gif')) return null;
	return toResult({ categoryInfo, sourceTag, sourceName: 'anime-api.com', url, nsfw: false });
}

async function fromNekosLife(sourceTag, categoryInfo, nsfw) {
	const data = await fetchJsonWithTimeout(`https://nekos.life/api/v2/img/${encodeURIComponent(sourceTag)}`);
	const url = data?.url;
	if (!url) return null;
	if (nsfw) {
		if (!isLikelyImageOrGifUrl(url)) return null;
	} else {
		if (!isLikelyGifUrl(url)) return null;
	}
	return toResult({ categoryInfo, sourceTag, sourceName: 'nekos.life', url, nsfw });
}

async function fromKawaiiRed(sourceTag, categoryInfo, nsfw) {
	if (nsfw) return null;
	const data = await fetchJsonWithTimeout(`https://kawaii.red/api/gif/${encodeURIComponent(sourceTag)}`);
	const url = data?.response || data?.url;
	if (!url || !String(url).toLowerCase().endsWith('.gif')) return null;
	return toResult({ categoryInfo, sourceTag, sourceName: 'kawaii.red', url, nsfw: false });
}

async function fromOtakuGif(sourceTag, categoryInfo, nsfw) {
	if (nsfw) return null;
	const data = await fetchJsonWithTimeout(`https://api.otakugifs.xyz/gif?reaction=${encodeURIComponent(sourceTag)}`);
	const url = data?.url || data?.gif || data?.image;
	if (!url || !isLikelyGifUrl(url)) return null;
	return toResult({ categoryInfo, sourceTag, sourceName: 'otakugifs.xyz', url, nsfw: false });
}

async function fromTenorAnime(sourceTag, categoryInfo, nsfw, env) {
	if (nsfw) return null;
	const key = env.TENOR_API_KEY || 'LIVDSRZULELA';
	const query = encodeURIComponent(`anime ${sourceTag} reaction`);
	const data = await fetchJsonWithTimeout(`https://tenor.googleapis.com/v2/search?q=${query}&key=${key}&limit=20&media_filter=gif`);
	const items = shuffleArray(Array.isArray(data?.results) ? data.results : []);

	for (const item of items) {
		const url = item?.media_formats?.gif?.url || item?.media?.[0]?.gif?.url;
		const text = `${item?.title || ''} ${item?.content_description || ''} ${item?.itemurl || ''}`;
		if (!url || !String(url).toLowerCase().includes('http')) continue;
		if (!isLikelyGifUrl(url)) continue;
		if (!isLikelyAnimeText(text)) continue;
		if (!categoryFamilyIncludes(categoryInfo, `${text} ${sourceTag}`)) continue;
		return toResult({ categoryInfo, sourceTag, sourceName: 'tenor', url, nsfw: false });
	}

	return null;
}

function uniqueTags(values) {
	return [...new Set(values.filter(Boolean).map(value => normalizeCategory(value)))];
}

function shuffleArray(values) {
	const copy = [...values];
	for (let index = copy.length - 1; index > 0; index--) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		const temp = copy[index];
		copy[index] = copy[randomIndex];
		copy[randomIndex] = temp;
	}
	return copy;
}

function buildProviderPlan(categoryInfo, nsfw) {
	const map = nsfw ? NSFW_PROVIDER_MAP : SFW_PROVIDER_MAP;
	const plans = [];

	for (const [provider, cfg] of Object.entries(map)) {
		const sourceTags = [];
		const canonicalTag = cfg.canonicalToSource[categoryInfo.canonical];
		if (canonicalTag) sourceTags.push(canonicalTag);

		if (cfg.supportsAliasTags) {
			for (const alias of categoryInfo.aliases) {
				if (!cfg.supportedTags || cfg.supportedTags.includes(alias)) {
					sourceTags.push(alias);
				}
			}
		}

		for (const sourceTag of uniqueTags(sourceTags)) {
			plans.push({ provider, sourceTag });
		}
	}

	return plans;
}

async function runProvider(provider, sourceTag, categoryInfo, nsfw, env) {
	switch (provider) {
	case 'waifupics':
		return fromWaifuPics(sourceTag, categoryInfo, nsfw);
	case 'nekosbest':
		return fromNekosBest(sourceTag, categoryInfo, nsfw);
	case 'nekosapiweb':
		return fromNekosApiWeb(sourceTag, categoryInfo, nsfw);
	case 'animeapi':
		return fromAnimeApi(sourceTag, categoryInfo, nsfw);
	case 'nekoslife':
		return fromNekosLife(sourceTag, categoryInfo, nsfw);
	case 'kawaiired':
		return fromKawaiiRed(sourceTag, categoryInfo, nsfw);
	case 'otakugif':
		return fromOtakuGif(sourceTag, categoryInfo, nsfw);
	case 'tenor':
		return fromTenorAnime(sourceTag, categoryInfo, nsfw, env);
	default:
		return null;
	}
}

async function resolveGif(categoryInfo, nsfw, env) {
	const plan = shuffleArray(buildProviderPlan(categoryInfo, nsfw));
	for (const item of plan) {
		const result = await runProvider(item.provider, item.sourceTag, categoryInfo, nsfw, env);
		if (result) return result;
	}

	return null;
}

async function handleProxy(encodedUrl) {
	try {
		const targetUrl = decodeURIComponent(encodedUrl);
		const response = await fetch(targetUrl, {
			headers: {
				'User-Agent': 'PhawseAPI/3.0',
				Referer: new URL(targetUrl).origin
			}
		});

		if (!response.ok) {
			return new Response('Failed to fetch image', {
				status: 502,
				headers: CORS_HEADERS
			});
		}

		const contentType = response.headers.get('content-type') || 'image/gif';
		const bytes = await response.arrayBuffer();

		return new Response(bytes, {
			headers: {
				...CORS_HEADERS,
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=31536000'
			}
		});
	} catch (error) {
		return new Response(`Proxy error: ${error.message}`, {
			status: 500,
			headers: CORS_HEADERS
		});
	}
}

async function handleGifRequest(rawCategory, nsfw, env) {
	const categoryInfo = resolveCategory(rawCategory);
	if (!categoryInfo) {
		return jsonResponse({ error: 'Invalid category' }, 400);
	}

	const result = await resolveGif(categoryInfo, nsfw, env);
	if (!result) {
		return jsonResponse({
			error: 'No gif found for this exact category family',
			category: categoryInfo.requested,
			canonical_category: categoryInfo.canonical,
			strict: true
		}, 404);
	}

	return jsonResponse(result);
}

async function handleSearch(url, env) {
	const query = url.searchParams.get('q') || '';
	const nsfw = url.searchParams.get('nsfw') === 'true';
	const categoryInfo = resolveCategory(query);

	if (!categoryInfo) {
		return jsonResponse({ error: 'Missing query parameter q' }, 400);
	}

	const result = await resolveGif(categoryInfo, nsfw, env);
	const results = result ? [result] : [];

	return jsonResponse({
		query,
		canonical_category: categoryInfo.canonical,
		strict: true,
		count: results.length,
		results
	});
}

function handleSchema() {
	return jsonResponse({
		name: 'Phawse GIF API Revamp',
		version: '3.0.0',
		strict_category_families: true,
		routes: {
			'/gif/{category}': 'Strict family-matched SFW gif',
			'/nsfw/{category}': 'Strict family-matched NSFW gif',
			'/search?q={category}': 'Strict family search',
			'/resolve?category={value}': 'See category normalization + family',
			'/batch?categories=a,b,c': 'Fetch many strict category gifs',
			'/sources': 'List provider capabilities',
			'/schema': 'API schema'
		},
		families: CATEGORY_FAMILIES
	});
}

function handleSources() {
	return jsonResponse({
		sfw: SFW_PROVIDER_MAP,
		nsfw: NSFW_PROVIDER_MAP
	});
}

function handleResolve(url) {
	const raw = url.searchParams.get('category') || '';
	const info = resolveCategory(raw);
	if (!info) return jsonResponse({ error: 'Missing category param' }, 400);
	return jsonResponse({
		input: raw,
		normalized: info.requested,
		canonical: info.canonical,
		aliases: info.aliases,
		strict: true
	});
}

async function handleBatch(url, env) {
	const raw = url.searchParams.get('categories') || '';
	const nsfw = url.searchParams.get('nsfw') === 'true';
	const categories = raw.split(',').map(value => value.trim()).filter(Boolean).slice(0, 10);

	if (categories.length === 0) {
		return jsonResponse({ error: 'Missing categories query param' }, 400);
	}

	const results = [];
	for (const category of categories) {
		const info = resolveCategory(category);
		const result = info ? await resolveGif(info, nsfw, env) : null;
		results.push({
			category,
			canonical_category: info?.canonical || null,
			result
		});
	}

	return jsonResponse({
		count: results.length,
		strict: true,
		results
	});
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: CORS_HEADERS });
		}

		const pathParts = url.pathname.split('/').filter(Boolean);
		const route = pathParts[0] || '';

		if (route === 'proxy' && pathParts[1]) {
			return handleProxy(pathParts.slice(1).join('/'));
		}

		if (route === 'gif' && pathParts[1]) {
			return handleGifRequest(pathParts[1], false, env);
		}

		if (route === 'nsfw' && pathParts[1]) {
			return handleGifRequest(pathParts[1], true, env);
		}

		if (route === 'search') {
			return handleSearch(url, env);
		}

		if (route === 'resolve') {
			return handleResolve(url);
		}

		if (route === 'batch') {
			return handleBatch(url, env);
		}

		if (route === 'sources') {
			return handleSources();
		}

		if (route === 'schema' || route === '') {
			return handleSchema();
		}

		return jsonResponse({ error: 'Not found' }, 404);
	}
};
