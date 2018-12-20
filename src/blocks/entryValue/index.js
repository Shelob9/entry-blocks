import {
	FormChooserForEntriesWithSelect,
	ChooseEntryFieldWithSelect,
	ChooseEntryWithSelect
} from "../../store/components/entryControlsWithState";
import DisplayWithState from './DisplayWithState';
import Display from './Display'
import {CALDERA_FORMS_ENTRIES_SLUG} from "../../store/entryStore";
import {dispatch, select} from '@wordpress/data';
//import {InspectorControls} from '@wordpress/editor';
const {InspectorControls} = wp.editor;
import {createElement, Fragment} from '@wordpress/element';
import {EntryValueInlineEditor} from "../../components/Entry/Edit/Inline";
import {ChooseEntryField, getFormFieldsOfForm} from "../../components/controls/ChooseEntryField";


/** Need block name in both formats for now, deal with it**/
export const name = 'caldera-entry-blocks/entry-value';
export const ENTRY_VALUE_BLOCK_NAME = 'caldera-entry-blocks/entry-value';


function getCurrentEntry(entries, entryId) {
	return entries.hasOwnProperty(entryId) ? entries[entryId] : {};
}


const Edit = ({
				  attributes,
				  setAttributes,
				  isSelected,
				  clientId,
				  className
			  }) => {
	const {
		fieldId,
		entryId,
		formId,
		before,
		after
	} = attributes;

	let entries = formId ? select(CALDERA_FORMS_ENTRIES_SLUG).getEntries(formId, 1) : {};
	let form = formId ? select(CALDERA_FORMS_ENTRIES_SLUG).getForm(formId) : {};

	if (!isSelected) {
		if (formId && entryId && fieldId) {
			return createElement(DisplayWithState, {
					entryFieldId: fieldId,
					entryId,
					formId,
					before,
					after,
				}
			);
		}
		return <div> :) </div>
	}
	const setFormId = (formId) => setAttributes({formId});
	const setEntryId = (entryId) => setAttributes({entryId});
	const setFieldId = (fieldId) => {
		const entry = entries.hasOwnProperty(entryId) ? entries[entryId] : null;
		if (entry && form.hasOwnProperty('fields')) {
			const fields = getFormFieldsOfForm(form);
			if ('object' === typeof fields && fields.hasOwnProperty(fieldId)) {
				setAttributes({before: fields[fieldId].label + ' : '});

			}
		}
		setAttributes({fieldId})

	};
	const setBefore = (before) => setAttributes({before});
	const setAfter = (after) => setAttributes({after});


	const inlineElements = [];
	const inspectorControlsElements = [];

	const FormChooser = <FormChooserForEntriesWithSelect
		currentFormId={formId}
		onSetForm={setFormId}
		instanceId={clientId}
		key={1}
	/>;
	inspectorControlsElements.push(FormChooser);


	const EntryChooser = <ChooseEntryWithSelect
		currentEntry={entryId}
		onSetEntry={setEntryId}
		instanceId={clientId}
		currentFormId={formId}
		key={2}

	/>

	if (formId) {
		inspectorControlsElements.push(EntryChooser);
	}

	const ChooseEntryField = function (hideLabel) {
		return <ChooseEntryFieldWithSelect
			currentEntry={entryId}
			form={form}
			onSetField={setFieldId}
			instanceId={clientId}
			entries={entries}
			entryFieldId={fieldId}
			hideLabel={hideLabel}
			key={3}
		/>
	};

	if (entryId) {
		inspectorControlsElements.push(ChooseEntryField(false));
	}
	if (!formId) {
		inlineElements.push(FormChooser);
	} else if (!entryId) {
		inlineElements.push(EntryChooser)
	} else if (!fieldId) {
		inlineElements.push(ChooseEntryField(false))
	} else {
		inlineElements.push(
			<EntryValueInlineEditor
				instanceId={clientId}
				before={before}
				after={after}
				setBefore={setBefore}
				setAfter={setAfter}
				getChooseEntryField={() => ChooseEntryField(true)}

			/>
		)
	}

	inlineElements.push(createElement(InspectorControls, {}, inspectorControlsElements));
	return createElement('div', {className}, inlineElements);
};

const Save = ({attributes}) => {
	const {
		formId,
		entryId,
		fieldId,
		className,
		before,
		after,
	} = attributes;

	const entries = formId ? select(CALDERA_FORMS_ENTRIES_SLUG).getEntries(formId, 1) : {};
	const entry = entries.hasOwnProperty(entryId) ? entries[entryId] : null;
	if (entry) {
		return createElement(DisplayWithState, {
				entryFieldId: fieldId,
				entryId,
				formId,
				before,
				after,

			}
		);
	}

};


export const options = {
	title: 'Caldera Forms Entry Value',
	description: 'Display one entry field value of an entry',
	icon: 'images-alt',
	category: 'widgets',
	attributes: {
		"formId": {
			"type": "string",
			"default": ""
		},
		"entryId": {
			"type": "number",
			"default": 0
		},
		"fieldId": {
			"type": "string",
			"default": ""
		},
		"before": {
			"type": "string",
			"default": ""
		},
		"after": {
			"type": "string",
			"default": ""
		}
	},
	edit: Edit,

	save: Save
};
