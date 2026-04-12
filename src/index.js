// @ts-nocheck
const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Cache-Control': 'no-cache, no-store, must-revalidate',
	'Pragma': 'no-cache',
	'Expires': '0'
};

function normalizeCategory(value) {
	return String(value || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
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
	pinch: ['pinch', 'pinching'],
	boop: ['boop', 'touch'],
	lurk: ['lurk', 'lurking'],
	shoot: ['shoot', 'shooting'],
	lick: ['lick', 'licking'],
	fluff: ['fluff'],
	comfy: ['comfy'],
	lay: ['lay', 'lying'],
	tail: ['tail', 'wag'],
	holo: ['holo'],
	kitsune: ['kitsune'],
	senko: ['senko'],
	shiro: ['shiro'],
	spank: ['spank', 'spanking'],
	stare: ['stare', 'staring'],
	yeet: ['yeet'],
	nosebleed: ['nosebleed'],
	baka: ['baka'],
	nom: ['nom'],
	feed: ['feed'],
	sleep: ['sleep'],
	think: ['think'],
	thumbsup: ['thumbsup'],
	yawn: ['yawn'],
	nod: ['nod'],
	handshake: ['handshake'],
	lewd: ['lewd', 'nsfw'],
	hentai: ['hentai', 'ecchi'],
	blowjob: ['blowjob', 'blow_job', 'bj', 'fellatio', 'suck', 'sucking'],
	anal: ['anal'],
	cum: ['cum'],
	fuck: ['fuck', 'fucking'],
	pussylick: ['pussylick', 'kuni'],
	solo: ['solo', 'solo_female'],
	solomale: ['solomale', 'solo_male'],
	threesomefff: ['threesomefff', 'threesome_fff'],
	threesomeffm: ['threesomeffm', 'threesome_ffm'],
	threesomemmf: ['threesomemmf', 'threesome_mmf'],
	yaoi: ['yaoi'],
	yuri: ['yuri'],
	trap: ['trap'],
	neko: ['neko', 'nekomimi', 'cat_girl'],
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
	angry: ['angry', 'mad'],
	thighs: ['thighs'],
	zettairyouiki: ['zettairyouiki', 'zettai_ryouiki'],
	underboob: ['underboob'],
	gag: ['gag', 'gagging'],
	feet: ['feet', 'foot']
};

const DONMAI_NSFW_TAGS = [
	'1girl', '1boy', '2girls', '3girls', 'ahegao', 'anal', 'ass', 'ass_grab', 'boobs', 'breasts', 'butt', 'cum',
	'cum_on_face', 'cunnilingus', 'dick', 'facial', 'fingering', 'footjob', 'gag', 'handjob', 'hentai', 'lewd',
	'naked', 'nipples', 'oral', 'pussy', 'pussylick', 'strapon', 'uncensored', 'vaginal', 'yaoi', 'yuri', 'trap',
	'blowjob', 'fuck', 'solo_female', 'solo_male', 'threesome_fff', 'threesome_ffm', 'threesome_mmf', 'thighs', 'underboob', 'zettairyouiki'
];

const SFW_PROVIDER_MAP = {
	waifupics: {
		supportsAliasTags: false,
		supportedTags: ['waifu', 'neko', 'cringe', 'hug', 'kiss', 'pat', 'poke', 'slap', 'smile', 'cry', 'wave', 'wink', 'dance', 'blush', 'kick', 'bite', 'lick', 'cuddle', 'highfive', 'handhold'],
		canonicalToSource: {
			waifu: 'waifu',
			neko: 'neko',
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
		supportedTags: ['neko', 'waifu', 'angry', 'hug', 'kiss', 'slap', 'pat', 'poke', 'wave', 'smile', 'highfive', 'handshake', 'bite', 'blush', 'bored', 'cry', 'dance', 'facepalm', 'feed', 'happy', 'laugh', 'nod', 'nom', 'nope', 'nosebleed', 'pout', 'shrug', 'sleep', 'smug', 'stare', 'think', 'thumbsup', 'tickle', 'wink', 'yawn', 'yeet', 'lurk', 'shoot'],
		canonicalToSource: {
			neko: 'neko',
			waifu: 'waifu',
			angry: 'angry',
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
			happy: 'happy',
			nosebleed: 'nosebleed'
		}
	},
	nekosapiweb: {
		supportsAliasTags: true,
		supportedTags: ['baka', 'bite', 'blush', 'bored', 'cry', 'cuddle', 'dance', 'facepalm', 'feed', 'gag', 'handhold', 'happy', 'highfive', 'hug', 'kick', 'kiss', 'laugh', 'lick', 'nom', 'pat', 'poke', 'pout', 'punch', 'shoot', 'shrug', 'slap', 'sleep', 'smile', 'smug', 'stare', 'tickle', 'wave', 'wink', 'yeet'],
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
			neko: 'neko',
			waifu: 'waifu',
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
			neko: 'neko',
			waifu: 'waifu',
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
		supportedTags: ['hug', 'kiss', 'pat', 'slap', 'poke', 'gag', 'pinch', 'lick', 'cuddle', 'cry', 'wave', 'wink', 'dance', 'smile', 'blush', 'pout', 'facepalm', 'shrug', 'handhold', 'tickle', 'bite', 'laugh'],
		canonicalToSource: {
			disgust: 'facepalm',
			facepalm: 'facepalm',
			pout: 'pout',
			shrug: 'shrug',
			boop: 'poke',
			poke: 'poke',
			pinch: 'pinch',
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
	purrbot: {
		supportsAliasTags: true,
		supportedTags: ['angry', 'bite', 'blush', 'comfy', 'cry', 'cuddle', 'dance', 'fluff', 'holo', 'hug', 'kiss', 'kitsune', 'lay', 'lick', 'neko', 'pat', 'poke', 'pout', 'senko', 'shiro', 'slap', 'smile', 'tail', 'tickle'],
		canonicalToSource: {
			angry: 'angry',
			bite: 'bite',
			blush: 'blush',
			boop: 'poke',
			comfy: 'comfy',
			cry: 'cry',
			cuddle: 'cuddle',
			dance: 'dance',
			fluff: 'fluff',
			holo: 'holo',
			hug: 'hug',
			kiss: 'kiss',
			kitsune: 'kitsune',
			lay: 'lay',
			lick: 'lick',
			neko: 'neko',
			pat: 'pat',
			poke: 'poke',
			pout: 'pout',
			senko: 'senko',
			shiro: 'shiro',
			slap: 'slap',
			smile: 'smile',
			tail: 'tail',
			tickle: 'tickle'
		}
	},
	tenor: {
		supportsAliasTags: true,
		canonicalToSource: {}
	},
	konachan: {
		supportsAliasTags: false,
		supportedTags: ['waifu', 'neko', 'hug', 'kiss', 'pat', 'slap', 'smile', 'cry', 'laugh', 'wave', 'wink', 'dance', 'blush', 'punch', 'kick', 'bite', 'lick', 'cuddle', 'tickle', 'highfive', 'handhold', 'happy', 'sad', 'angry', 'bored', 'pout', 'stare', 'cringe', 'facepalm', 'shrug', 'nope'],
		canonicalToSource: {
			waifu: 'waifu',
			neko: 'neko',
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
			kick: 'kick',
			bite: 'bite',
			lick: 'lick',
			cuddle: 'cuddle',
			tickle: 'tickle',
			highfive: 'highfive',
			handhold: 'handhold',
			happy: 'happy',
			sad: 'sad',
			angry: 'angry',
			bored: 'bored',
			pout: 'pout',
			stare: 'stare',
			cringe: 'cringe',
			facepalm: 'facepalm',
			shrug: 'shrug',
			nope: 'nope'
		}
	}
};

const NSFW_PROVIDER_MAP = {
	waifupics: {
		supportsAliasTags: true,
		supportedTags: ['waifu', 'neko', 'trap', 'blowjob'],
		canonicalToSource: {
			waifu: 'waifu',
			neko: 'neko',
			trap: 'trap',
			blowjob: 'blowjob'
		}
	},
	nekoslife: {
		supportsAliasTags: true,
		supportedTags: ['lewd', 'hentai'],
		canonicalToSource: {
			lewd: 'lewd',
			hentai: 'hentai'
		}
	},
	purrbot: {
		supportsAliasTags: true,
		supportedTags: ['anal', 'blowjob', 'cum', 'fuck', 'neko', 'pussylick', 'solo', 'solo_male', 'threesome_fff', 'threesome_ffm', 'threesome_mmf', 'yaoi', 'yuri'],
		canonicalToSource: {
			anal: 'anal',
			blowjob: 'blowjob',
			cum: 'cum',
			fuck: 'fuck',
			neko: 'neko',
			pussylick: 'pussylick',
			solo: 'solo',
			solomale: 'solo_male',
			threesomefff: 'threesome_fff',
			threesomeffm: 'threesome_ffm',
			threesomemmf: 'threesome_mmf',
			yaoi: 'yaoi',
			yuri: 'yuri'
		}
	},
	nekobot: {
		supportsAliasTags: true,
		supportedTags: ['neko', 'waifu', 'hentai', 'anal', 'cum', 'fuck', 'pussylick', 'solo', 'yaoi', 'yuri', 'blowjob', 'lewd', 'baka', 'holo', 'kitsune', 'thighs', 'gag', 'feet'],
		canonicalToSource: {
			neko: 'neko',
			waifu: 'waifu',
			hentai: 'hentai',
			anal: 'anal',
			cum: 'cum',
			fuck: 'fuck',
			pussylick: 'pussylick',
			solo: 'solo',
			yuri: 'yuri',
			yaoi: 'yaoi',
			blowjob: 'blowjob',
			lewd: 'lewd',
			baka: 'baka',
			holo: 'holo',
			kitsune: 'kitsune',
			thighs: 'thighs',
			gag: 'gag',
			feet: 'feet'
		}
	},
	yandere: {
		supportsAliasTags: true,
		supportedTags: DONMAI_NSFW_TAGS, // Yandere supports most anime tags like Danbooru
		canonicalToSource: {}
	},
	donmai: {
		supportsAliasTags: true,
		supportedTags: DONMAI_NSFW_TAGS,
		canonicalToSource: {}
	},
	konachan: {
		supportsAliasTags: false,
		supportedTags: ['thighs', 'zettairyouiki', 'underboob', 'gag', 'hentai', 'blowjob', 'lewd', 'anal', 'cum', 'fuck', 'pussylick', 'solo', 'solomale', 'yaoi', 'yuri', 'trap', 'neko', 'waifu'],
		canonicalToSource: {
			thighs: 'thighs',
			zettairyouiki: 'zettairyouiki',
			underboob: 'underboob',
			gag: 'gag',
			hentai: 'hentai',
			blowjob: 'blowjob',
			lewd: 'lewd',
			anal: 'anal',
			cum: 'cum',
			fuck: 'fuck',
			pussylick: 'pussylick',
			solo: 'solo',
			solomale: 'solo_male',
			yaoi: 'yaoi',
			yuri: 'yuri',
			trap: 'trap',
			neko: 'neko',
			waifu: 'waifu'
		}
	},
	rule34: {
		supportsAliasTags: false,
		supportedTags: ['thighs', 'zettairyouiki', 'underboob', 'gag', 'hentai', 'blowjob', 'lewd', 'anal', 'cum', 'fuck', 'pussylick', 'solo', 'solomale', 'yaoi', 'yuri', 'trap', 'neko', 'waifu', 'threesomefff', 'threesomeffm', 'threesomemmf'],
		canonicalToSource: {
			thighs: 'thighs',
			zettairyouiki: 'zettairyouiki',
			underboob: 'underboob',
			gag: 'gag',
			hentai: 'hentai',
			blowjob: 'blowjob',
			lewd: 'lewd',
			anal: 'anal',
			cum: 'cum',
			fuck: 'fuck',
			pussylick: 'pussylick',
			solo: 'solo',
			solomale: 'solo_male',
			yaoi: 'yaoi',
			yuri: 'yuri',
			trap: 'trap',
			neko: 'neko',
			waifu: 'waifu',
			threesomefff: 'threesome_fff',
			threesomeffm: 'threesome_ffm',
			threesomemmf: 'threesome_mmf'
		}
	},
	gelbooru: {
		supportsAliasTags: false,
		supportedTags: ['thighs', 'zettairyouiki', 'underboob', 'gag', 'hentai', 'blowjob', 'lewd', 'anal', 'cum', 'fuck', 'pussylick', 'solo', 'solomale', 'yaoi', 'yuri', 'trap', 'neko', 'waifu', 'threesomefff', 'threesomeffm', 'threesomemmf'],
		canonicalToSource: {
			thighs: 'thighs',
			zettairyouiki: 'zettairyouiki',
			underboob: 'underboob',
			gag: 'gag',
			hentai: 'hentai',
			blowjob: 'blowjob',
			lewd: 'lewd',
			anal: 'anal',
			cum: 'cum',
			fuck: 'fuck',
			pussylick: 'pussylick',
			solo: 'solo',
			solomale: 'solo_male',
			yaoi: 'yaoi',
			yuri: 'yuri',
			trap: 'trap',
			neko: 'neko',
			waifu: 'waifu',
			threesomefff: 'threesome_fff',
			threesomeffm: 'threesome_ffm',
			threesomemmf: 'threesome_mmf'
		}
	}
};
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

function allowsImageForSfwCategory(categoryInfo, sourceTag) {
	const canonical = normalizeCategory(categoryInfo?.canonical || '');
	const tag = normalizeCategory(sourceTag || '');
	const imageTags = new Set(['neko', 'waifu', 'holo', 'kitsune', 'senko', 'shiro']);
	return imageTags.has(canonical) || imageTags.has(tag);
}

function isImageHeavyTag(canonical) {
	return ['thighs', 'zettairyouiki', 'underboob'].includes(canonical);
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
		if (allowsImageForSfwCategory(categoryInfo, sourceTag)) {
			if (!isLikelyImageOrGifUrl(data.url)) return null;
		} else if (!isLikelyGifUrl(data.url)) {
			return null;
		}
	}
	return toResult({ categoryInfo, sourceTag, sourceName: 'waifu.pics', url: data.url, nsfw });
}

async function fromNekosBest(sourceTag, categoryInfo, nsfw) {
	if (nsfw) return null;
	const data = await fetchJsonWithTimeout(`https://nekos.best/api/v2/${sourceTag}`);
	const url = data?.results?.[0]?.url;
	if (!url) return null;
	if (allowsImageForSfwCategory(categoryInfo, sourceTag)) {
		if (!isLikelyImageOrGifUrl(url)) return null;
	} else if (!isLikelyGifUrl(url)) {
		return null;
	}
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
		if (allowsImageForSfwCategory(categoryInfo, sourceTag)) {
			if (!isLikelyImageOrGifUrl(url)) return null;
		} else if (!isLikelyGifUrl(url)) {
			return null;
		}
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

async function fromPurrbot(sourceTag, categoryInfo, nsfw) {
	const mode = nsfw ? 'nsfw' : 'sfw';
	const imageFirstTags = new Set(['holo', 'kitsune', 'senko', 'shiro']);
	const mediaType = !nsfw && imageFirstTags.has(sourceTag) ? 'img' : 'gif';
	let data = await fetchJsonWithTimeout(`https://purrbot.site/api/img/${mode}/${encodeURIComponent(sourceTag)}/${mediaType}`);

	if (!data && !nsfw && mediaType === 'gif') {
		data = await fetchJsonWithTimeout(`https://purrbot.site/api/img/${mode}/${encodeURIComponent(sourceTag)}/img`);
	}

	const url = data?.link || data?.url || data?.message;
	if (!url) return null;

	if (nsfw) {
		if (!isLikelyImageOrGifUrl(url)) return null;
	} else {
		if (allowsImageForSfwCategory(categoryInfo, sourceTag)) {
			if (!isLikelyImageOrGifUrl(url)) return null;
		} else if (!isLikelyGifUrl(url)) {
			return null;
		}
	}

	return toResult({ categoryInfo, sourceTag, sourceName: 'purrbot.site', url, nsfw });
}

async function fromTenorAnime(sourceTag, categoryInfo, nsfw, env) {
	if (nsfw) return null;
	const key = env.TENOR_API_KEY || 'LIVDSRZULELA';
	const query = encodeURIComponent(`anime ${sourceTag} reaction`);
	const data = await fetchJsonWithTimeout(`https://tenor.googleapis.com/v2/search?q=${query}&key=${key}&limit=50&media_filter=gif`);
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
	const seen = new Set();
	const unique = [];

	for (const value of values) {
		const sourceTag = String(value || '').trim().toLowerCase();
		if (!sourceTag) continue;

		const key = normalizeCategory(sourceTag);
		if (!key || seen.has(key)) continue;

		seen.add(key);
		unique.push(sourceTag);
	}

	return unique;
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
		} else if (cfg.supportedTags && cfg.supportedTags.includes(categoryInfo.canonical)) {
			sourceTags.push(categoryInfo.canonical);
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
	case 'purrbot':
		return fromPurrbot(sourceTag, categoryInfo, nsfw);
	case 'tenor':
		return fromTenorAnime(sourceTag, categoryInfo, nsfw, env);
	case 'donmai':
		return fromDonmai(sourceTag, categoryInfo, nsfw);
	case 'nekobot':
		return fromNekobot(sourceTag, categoryInfo, nsfw, env);
	case 'yandere':
		return fromYandere(sourceTag, categoryInfo, nsfw, env);
	case 'konachan':
		return fromKonachan(sourceTag, categoryInfo, nsfw);
	case 'rule34':
		return fromRule34(sourceTag, categoryInfo, nsfw, env);
	case 'gelbooru':
		return fromGelbooru(sourceTag, categoryInfo, nsfw);
	default:
		return null;
	}
}

async function fromDonmai(sourceTag, categoryInfo, nsfw) {
	const rawTag = String(sourceTag || '').trim();
	if (!rawTag) return null;

	let queryTags = rawTag;
	if (nsfw) {
		queryTags += ' -rating:safe filetype:gif';
	} else {
		queryTags += ' rating:safe';
	}

	const endpoint = `https://danbooru.donmai.us/posts.json?tags=${encodeURIComponent(queryTags)}&limit=20`;
	const data = await fetchJsonWithTimeout(endpoint, 3000);
	const posts = Array.isArray(data) ? data : [];
	if (!posts.length) return null;

	const candidates = shuffleArray(posts);
	for (const post of candidates) {
		const fileUrl = post?.file_url || post?.large_file_url || post?.preview_file_url || post?.source || null;
		if (!fileUrl || typeof fileUrl !== 'string' || !fileUrl.startsWith('http')) continue;

		if (nsfw) {
			// For image-heavy tags, allow static images too
			if (isImageHeavyTag(categoryInfo.canonical)) {
				if (!isLikelyImageOrGifUrl(fileUrl)) continue;
			} else {
				if (!isLikelyGifUrl(fileUrl)) continue;
			}
		} else {
			if (allowsImageForSfwCategory(categoryInfo, sourceTag)) {
				if (!isLikelyImageOrGifUrl(fileUrl)) continue;
			} else if (!isLikelyGifUrl(fileUrl)) {
				continue;
			}
		}

		return toResult({ categoryInfo, sourceTag, sourceName: 'donmai', url: fileUrl, nsfw });
	}

	return null;
}

async function fromNekobot(sourceTag, categoryInfo, nsfw, env) {
	if (!nsfw) return null; // Primarily NSFW API
	const endpoint = `https://nekobot.xyz/api/image?type=${encodeURIComponent(sourceTag)}`;
	const data = await fetchJsonWithTimeout(endpoint, 3000);
	const url = data?.message;
	if (!url || typeof url !== 'string' || !isLikelyImageOrGifUrl(url)) return null;
	return toResult({ categoryInfo, sourceTag, sourceName: 'nekobot.xyz', url, nsfw: true });
}

async function fromYandere(sourceTag, categoryInfo, nsfw, env) {
	const rawTag = String(sourceTag || '').trim();
	if (!rawTag) return null;

	let queryTags = rawTag;
	if (nsfw) {
		queryTags += ' -rating:safe';
	} else {
		queryTags += ' rating:safe';
	}

	const endpoint = `https://yande.re/post.json?tags=${encodeURIComponent(queryTags)}&limit=20`;
	const data = await fetchJsonWithTimeout(endpoint, 3000);
	const posts = Array.isArray(data) ? data : [];
	if (!posts.length) return null;

	const candidates = shuffleArray(posts);
	for (const post of candidates) {
		const fileUrl = post?.file_url || post?.jpeg_url || post?.sample_url || null;
		if (!fileUrl || typeof fileUrl !== 'string' || !fileUrl.startsWith('http')) continue;

		if (nsfw) {
			if (!isLikelyImageOrGifUrl(fileUrl)) continue;
		} else {
			if (allowsImageForSfwCategory(categoryInfo, sourceTag)) {
				if (!isLikelyImageOrGifUrl(fileUrl)) continue;
			} else if (!isLikelyGifUrl(fileUrl)) {
				continue;
			}
		}

		return toResult({ categoryInfo, sourceTag, sourceName: 'yande.re', url: fileUrl, nsfw });
	}

	return null;
}

async function fromKonachan(sourceTag, categoryInfo, nsfw) {
	const rawTag = String(sourceTag || '').trim();
	if (!rawTag) return null;

	let queryTags = rawTag;
	if (nsfw) {
		queryTags += ' -rating:safe';
	} else {
		queryTags += ' rating:safe';
	}

	const endpoint = `https://konachan.com/post.json?tags=${encodeURIComponent(queryTags)}&limit=20`;
	const data = await fetchJsonWithTimeout(endpoint, 3000);
	const posts = Array.isArray(data) ? data : [];
	if (!posts.length) return null;

	const candidates = shuffleArray(posts);
	for (const post of candidates) {
		const fileUrl = post?.file_url || post?.jpeg_url || post?.sample_url || null;
		if (!fileUrl || typeof fileUrl !== 'string' || !fileUrl.startsWith('http')) continue;

		if (nsfw) {
			if (!isLikelyImageOrGifUrl(fileUrl)) continue;
		} else {
			if (allowsImageForSfwCategory(categoryInfo, sourceTag)) {
				if (!isLikelyImageOrGifUrl(fileUrl)) continue;
			} else if (!isLikelyGifUrl(fileUrl)) {
				continue;
			}
		}

		return toResult({ categoryInfo, sourceTag, sourceName: 'konachan.com', url: fileUrl, nsfw });
	}

	return null;
}

async function fromRule34(sourceTag, categoryInfo, nsfw, env) {
	const rawTag = String(sourceTag || '').trim();
	if (!rawTag) return null;

	// Get API credentials from environment variables
	const userId = env?.RULE34_USER_ID;
	const apiKey = env?.RULE34_API_KEY;
	
	// If no credentials, skip this provider
	if (!userId || !apiKey) return null;

	const queryTags = rawTag;
	let endpoint = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${encodeURIComponent(queryTags)}&json=1&limit=20`;
	// Add authentication parameters
	endpoint += `&user_id=${encodeURIComponent(userId)}&api_key=${encodeURIComponent(apiKey)}`;
	
	const data = await fetchJsonWithTimeout(endpoint, 3000);
	const posts = Array.isArray(data) ? data : [];
	if (!posts.length) return null;

	const candidates = shuffleArray(posts);
	for (const post of candidates) {
		const fileUrl = post?.file_url || post?.sample?.url || post?.preview?.url || null;
		if (!fileUrl || typeof fileUrl !== 'string' || !fileUrl.startsWith('http')) continue;

		if (isImageHeavyTag(categoryInfo.canonical)) {
			if (!isLikelyImageOrGifUrl(fileUrl)) continue;
		} else {
			if (!isLikelyGifUrl(fileUrl)) continue;
		}

		return toResult({ categoryInfo, sourceTag, sourceName: 'rule34.xxx', url: fileUrl, nsfw: true });
	}

	return null;
}

async function fromGelbooru(sourceTag, categoryInfo, nsfw) {
	const rawTag = String(sourceTag || '').trim();
	if (!rawTag) return null;

	const queryTags = rawTag;
	const endpoint = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=${encodeURIComponent(queryTags)}&json=1&limit=20`;
	const data = await fetchJsonWithTimeout(endpoint, 3000);
	const posts = Array.isArray(data) ? data : [];
	if (!posts.length) return null;

	const candidates = shuffleArray(posts);
	for (const post of candidates) {
		const fileUrl = post?.file_url || post?.sample?.url || post?.preview?.url || null;
		if (!fileUrl || typeof fileUrl !== 'string' || !fileUrl.startsWith('http')) continue;

		if (isImageHeavyTag(categoryInfo.canonical)) {
			if (!isLikelyImageOrGifUrl(fileUrl)) continue;
		} else {
			if (!isLikelyGifUrl(fileUrl)) continue;
		}

		return toResult({ categoryInfo, sourceTag, sourceName: 'gelbooru.com', url: fileUrl, nsfw: true });
	}

	return null;
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
			'/gif/{category}': 'Strict family-matched SFW media (GIF; neko/waifu can be image or GIF)',
			'/sfw/{category}': 'Alias of /gif/{category}',
			'/nsfw/{category}': 'Strict family-matched NSFW gif',
			'/search?q={category}': 'Strict family search (SFW by default)',
			'/sfw/search?q={category}': 'Alias of /search with SFW mode',
			'/nsfw/search?q={category}': 'Strict family search in NSFW mode',
			'/resolve?category={value}': 'See category normalization + family',
			'/batch?categories=a,b,c': 'Fetch many strict category gifs (SFW by default)',
			'/sfw/batch?categories=a,b,c': 'Alias of /batch with SFW mode',
			'/nsfw/batch?categories=a,b,c': 'Fetch many strict category gifs in NSFW mode',
			'/sources': 'List provider capabilities',
			'/schema': 'API schema'
		},
		families: CATEGORY_FAMILIES
	});
}

async function handleHomePage(request, env) {
	if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
		const assetUrl = new URL(request.url);
		assetUrl.pathname = '/index.html';
		const assetResponse = await env.ASSETS.fetch(new Request(assetUrl.toString(), request));
		const headers = new Headers(assetResponse.headers);
		headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
		headers.set('Pragma', 'no-cache');
		headers.set('Expires', '0');
		for (const [key, value] of Object.entries(CORS_HEADERS)) {
			headers.set(key, value);
		}
		return new Response(assetResponse.body, {
			status: assetResponse.status,
			statusText: assetResponse.statusText,
			headers
		});
	}

	return new Response('Home page asset binding is not configured.', {
		status: 500,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			...CORS_HEADERS
		}
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
		const scopeRoute = route === 'sfw' || route === 'nsfw';
		const scopedNsfw = route === 'nsfw';
		const scopedCommand = scopeRoute ? (pathParts[1] || '') : route;

		if (route === 'proxy' && pathParts[1]) {
			return handleProxy(pathParts.slice(1).join('/'));
		}

		if ((route === 'gif' && pathParts[1]) || (route === 'sfw' && pathParts[1] && pathParts[1] !== 'search' && pathParts[1] !== 'batch')) {
			return handleGifRequest(pathParts[1], false, env);
		}

		if (route === 'nsfw' && pathParts[1]) {
			if (pathParts[1] === 'search' || pathParts[1] === 'batch') {
				// handled by scoped command routing below
			} else {
			return handleGifRequest(pathParts[1], true, env);
			}
		}

		if ((scopeRoute && scopedCommand === 'search') || route === 'search') {
			if (scopeRoute) {
				url.searchParams.set('nsfw', scopedNsfw ? 'true' : 'false');
			}
			return handleSearch(url, env);
		}

		if ((scopeRoute && scopedCommand === 'batch') || route === 'batch') {
			if (scopeRoute) {
				url.searchParams.set('nsfw', scopedNsfw ? 'true' : 'false');
			}
			return handleBatch(url, env);
		}

		if (route === 'resolve') {
			return handleResolve(url);
		}

		if (route === 'sources') {
			return handleSources();
		}

		if (route === 'schema') {
			return handleSchema();
		}

		if (route === '' || route === 'index.html') {
			return handleHomePage(request, env);
		}

		return jsonResponse({ error: 'Not found' }, 404);
	}
};
