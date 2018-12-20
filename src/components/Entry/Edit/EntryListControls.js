import React, {createElement, Fragment} from 'react';
import {findFormById} from "../findFormById";

import {ChooseForm} from "../../controls/ChooseForm";
import {ChooseEntry} from "../../controls/ChooseEntry";

export default function (props) {
	const {
		entries,
		formId,
		entryId,
		onSetForm,
		onSetEntry,
		instanceId,
		forms
	} = props;
	let form = {};
	if (!props.form) {
		form = findFormById(forms, formId);
	} else {
		form = props.form;
	}

	const elements = [
		<ChooseForm
			forms={forms}
			currentFormId={formId}
			onSetForm={onSetForm}
			instanceId={instanceId}
			key={1}
		/>
	];

	if (formId) {
		elements.push(<ChooseEntry
			entries={entries}
			currentEntry={entryId}
			onSetEntry={onSetEntry}
			instanceId={instanceId}
			key={2}
		/>);
	}



	return createElement(Fragment, {}, elements);
}
