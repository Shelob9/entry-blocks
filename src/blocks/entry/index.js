import React from 'react';
//import {InspectorControls, InnerBlocks} from '@wordpress/editor';
const {InspectorControls, InnerBlocks} = wp.editor;
import {select, dispatch} from '@wordpress/data';
import {
	ChooseEntryWithSelect,
	ChooseEntryFieldWithSelect,
	FormChooserForEntriesWithSelect
} from "../../store/components/entryControlsWithState";
import {
	entryStore,
	CALDERA_FORMS_ENTRIES_SLUG
} from "../../store/entryStore";
import {ENTRY_VALUE_BLOCK_NAME} from "../entryValue";
import {addFilter} from '@wordpress/hooks';
import {createElement,Fragment} from '@wordpress/element';
export const name = 'caldera-entry-blocks/entry';
export const ENTRY_BLOCK_NAME = 'caldera-entry-blocks/entry';

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

let ALLOWED_BLOCKS = [
	'core/image',
	'core/paragraph',
	'core/columns',
	ENTRY_VALUE_BLOCK_NAME
];

const {
	getPreviewFormId,
	getPreviewEntryId,
} = select(CALDERA_FORMS_ENTRIES_SLUG);

const formId = getPreviewFormId();
const entryId = getPreviewEntryId();


const Edit = ({
				  attributes,
				  setAttributes,
				  className,
				  id,
				  isSelected
			  }) => {
	const {
		formId,
		entryId
	} = attributes;


	let TEMPLATE = [
		[ENTRY_VALUE_BLOCK_NAME, {entryId, formId}],
	];
	console.log(TEMPLATE);


	if (!isSelected) {
		return <InnerBlocks
			className={className}
			template={TEMPLATE}
			allowed={ALLOWED_BLOCKS}
			templateLock={false}
		/>;
	}

	const setFormId = (formId) => {
		setAttributes({formId});
	};

	const setEntryId = (entryId) => {
		setAttributes({entryId});
	};


	const inlineElements = [];
	const inspectorControlsElements = [];

	const FormChooser = <FormChooserForEntriesWithSelect
		currentFormId={formId}
		onSetForm={setFormId}
		instanceId={id}
		key={1}
	/>;

	inspectorControlsElements.push(FormChooser);

	const EntryChooser = <ChooseEntryWithSelect
		currentEntry={entryId}
		onSetEntry={setEntryId}
		instanceId={id}
		currentFormId={formId}
		key={2}

	/>

	if (formId) {
		inspectorControlsElements.push(EntryChooser);
	}

	if (formId && entryId) {
		const formFields = select(CALDERA_FORMS_ENTRIES_SLUG).getFormFieldsForEntry(formId);
		if ('object' === typeof formFields) {
			Object.values(formFields).forEach(formField => {
				TEMPLATE.push([ENTRY_VALUE_BLOCK_NAME, {
					entryId,
					formId,
					fieldId: formField.id,
					before: formField.label + ' : '
				}]);

			});
		}

	} else {
		if (formId) {
			inlineElements.push(EntryChooser);
		} else {
			inlineElements.push(FormChooser);
		}
	}

	inlineElements.push(createElement(InspectorControls, {}, inspectorControlsElements));
    if (formId && entryId) {
        const innerBlocks = <InnerBlocks
            className={className}
            template={TEMPLATE}
            allowed={ALLOWED_BLOCKS}
            templateLock={false}

        />;
        inlineElements.push(innerBlocks);

    }

	return createElement('div', {className}, inlineElements);
};

function Display(className) {
	return (
		<div className={className}>
			<InnerBlocks.Content/>
		</div>
	);
}

const Save = ({className}) => {
	return Display(className);
};


export const options = {
	title: 'Caldera Forms Entry',
	description: 'Display one entry',
	icon: 'images-alt',
	category: 'widgets',
	attributes,
	edit: Edit,
	save: Save,
	supports: {
		multiple: false,
		//html: false,
	}
};
