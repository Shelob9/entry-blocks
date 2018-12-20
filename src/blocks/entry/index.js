export const name = 'caldera-entry-blocks/entry';
const attributes = {
	"formId": {
		"type": "string",
		"default": ""
	},
	"entryId": {
		"type": "number",
		"default": 0
	}
};

export const options = {
	title: 'Caldera Forms Entry',

	description: 'Display one entry',

	icon: 'images-alt',

	category: 'widgets',
	attributes,
	edit() {
		return (
			<div>
				<h2>Block B preview</h2>
			</div>
		);
	},

	save() {
		return (
			<div>
				<h2>Block B!</h2>
			</div>
		);
	},
};
