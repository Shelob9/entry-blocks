import React, {Fragment} from 'react';
import {EntryRow} from "./EntryRow";
export const EntryRows = (props: {entries} ) => {
	return (
		<Fragment>
			{Object.values(props.entries).map( (entry : Entry ) => {
				return (<EntryRow
					entry={entry}
					key={entry.id}
				/>)
			})}
		</Fragment>
	);
}
