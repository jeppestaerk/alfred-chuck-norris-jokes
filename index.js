'use strict';
const alfy = require('alfy');

const api = 'https://api.chucknorris.io';
const output = [];
const promises = [];

function addJoke(joke) {
	output.push({
		title: joke.value,
		subtitle: `Category: ${joke.category}. Press ⏎ to see, ⌘⏎ to copy, ⌥⏎ to read, or ⌃⏎ to open`,
		arg: joke.value,
		mods: {
			cmd: {
				subtitle: 'press ⏎ to copy to clipboard',
				arg: joke.value
			},
			alt: {
				subtitle: 'press ⏎ to read aloud',
				arg: joke.value
			},
			ctrl: {
				subtitle: `press ⏎ to open in browser: ${joke.url}`,
				arg: joke.url
			}
		},
		icon: {
			path: 'icon.png'
		},
		quicklookurl: joke.url,
		text: {
			copy: joke.value,
			largetype: joke.value
		}
	});
}

function getChuckNorrisJokeFromCategory(category) {
	return new Promise((resolve) => {
		alfy.fetch(`${api}/jokes/random?category=${category}`).then(joke => {
			addJoke(joke);
			resolve(joke);
		});
	});
}

alfy.fetch(`${api}/jokes/categories`).then(categories => {
	categories.forEach(category => promises.push(getChuckNorrisJokeFromCategory(category)));
	Promise.all(promises).then(() => alfy.output(output));
});
