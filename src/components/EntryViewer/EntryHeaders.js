
import React from 'react';
import {EntryHeader} from "./EntryHeader";

export function getFieldFromCollection( fields, fieldId )  {
	if( ! fields.hasOwnProperty(fieldId) ){
		// eslint-disable-next-line no-throw-literal
		throw 'Can not find field';
	}
	return fields[fieldId];
};


export const EntryHeaders = (props) => {
	const {formFields} = props;
	const firstEntry = Object.values(props.entries)[0];
	return (
		<tr>
			<th scope="col">ID</th>
			{Object.values(firstEntry.fields).map( (entryField ) => {
				let labelWith;
				let fieldType = 'text';

				try {
					const field = getFieldFromCollection(formFields,entryField.field_id);
					labelWith = field.name;
					fieldType = field.type;
				}catch(e){
					labelWith = entryField.slug
				}


				return (
					<th key={entryField.id}>
						<EntryHeader entryField={entryField} labelWith={labelWith} fieldType={fieldType}/>
					</th>);
			})}
		</tr>
	);
};
