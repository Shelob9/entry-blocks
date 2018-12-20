import React, {Fragment} from 'react';
import {EntryFieldView} from '../../components/Entry/';
import Grid from 'react-css-grid'


/**
 * Display EntryValue
 *
 * @param props
 * @return {*}
 * @constructor
 */
export default function Display(props) {
	const {
		entryId,
		formId,
		entryFieldId,
		entry,
		before,
		after
	} = props;

	if( ! formId || ! entryId || ! entryFieldId ){
		return <Fragment/>
	}

	let entryField = {};
	if( entry.fields.hasOwnProperty(entryFieldId) ){
		entryField = entry.fields[entryFieldId];
	}
	else{
		return <Fragment/>
	}

	return(
		<Grid>
			<Fragment>{before}</Fragment>
			<EntryFieldView entryField={entryField} fieldType={'text'} />
			<Fragment>{after}</Fragment>
		</Grid>
	);




};
