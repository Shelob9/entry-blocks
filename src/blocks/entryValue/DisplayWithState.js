import React from 'react';
import Display from './Display'
import {withSelect} from "@wordpress/data";
import {CALDERA_FORMS_ENTRIES_SLUG} from "../../store/entryStore";

/**
 * Wrap EntryValue Display component with WordPress's state managment
 */
export default withSelect( ( select,ownProps ) => {
	const { getForm, getEntry,getEntries} = select( CALDERA_FORMS_ENTRIES_SLUG );
	const {formId,entryId,entryFieldId} = ownProps;
	return {
		...ownProps,
		form: getForm( formId ),
		entry: getEntry(formId,entryId),
		entries: getEntries(formId),
	};
} )( Display );
