export const name = 'caldera-entry-blocks/entry-table';
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
	title: 'Entry Table',
	description: 'Display the entry table',
	icon: 'image-filter',
	category: 'widgets',
	attributes,
	edit() {
		return (
			<div>
				<h2>Display the entry table</h2>
			</div>
		);
	},

	save() {
		return (
			<div>
				<h2>Block A!</h2>
			</div>
		);
	},
};
