const fs = require('fs');
const path = require('path');

async function fetchPage(page, limit = 200) {
	const url = `https://danbooru.donmai.us/tags.json?limit=${limit}&page=${page}`;
	const res = await fetch(url, { headers: { 'User-Agent': 'phawse-tag-fetcher/1.0' } });
	if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
	return await res.json();
}

(async function main() {
	try {
		const outJson = path.resolve(__dirname, '..', 'src', 'donmai-tags.json');
		const outJs = path.resolve(__dirname, '..', 'src', 'donmai-tags.js');
		const limit = 200;
		let page = 1;
		const tags = new Set();
		while (true) {
			console.log(`Fetching page ${page}...`);
			let data;
			try {
				data = await fetchPage(page, limit);
			} catch (err) {
				console.error('Fetch error, retrying once...', err.message);
				await new Promise(r => setTimeout(r, 1000));
				data = await fetchPage(page, limit);
			}

			if (!Array.isArray(data) || data.length === 0) break;

			for (const t of data) {
				if (t && t.name) tags.add(t.name);
			}

			page += 1;
			// friendly delay to avoid hammering the API
			await new Promise(r => setTimeout(r, 300));

			// safety cap (stop if we've collected a lot)
			if (tags.size >= 80000) break;
		}

		const tagsArr = Array.from(tags).sort();
		fs.writeFileSync(outJson, JSON.stringify(tagsArr, null, 2), 'utf8');

		const jsContent = `export const DONMAI_TAGS = ${JSON.stringify(tagsArr, null, 2)};\nexport default DONMAI_TAGS;\n`;
		fs.writeFileSync(outJs, jsContent, 'utf8');

		console.log(`Wrote ${tagsArr.length} tags to ${outJson} and ${outJs}`);
	} catch (err) {
		console.error('Error:', err);
		process.exit(1);
	}
})();
