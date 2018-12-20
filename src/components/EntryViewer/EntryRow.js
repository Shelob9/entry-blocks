import React from 'react';
import {EntryFieldView} from "./EntryFieldView";
import {TableCell} from "./components/TableCell";

export const EntryRow = (props ) => {
	const {entry} = props;
	const {
		id,
		fields
	} = entry;

	return (
		<tr>
			<th scope="row">{id}</th>
			{Object.values(fields).map( (entryField) => {
				return (
					<TableCell key={entryField.id}>
						<EntryFieldView entryField={entryField} labelWith={entryField.slug} fieldType={'text'}/>
					</TableCell>
				);
			})}
		</tr>
	);
};
