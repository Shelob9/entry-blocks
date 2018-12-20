
import React, {Fragment} from 'react';
import {EntryHeaders} from "./EntryHeaders";
import {EntryRows} from "./EntryRows";
import {SingleEntry} from "./SingleEntry";


export const EntryViewer = (props) => {
	const {currentEntryId,entries,getCurrentEntry,form} = props;

	if( JSON.stringify(entries) === JSON.stringify({}) ){
		return <div>No Entries</div>
	}

	return(
		<table>
			<thead>
				<EntryHeaders entries={entries} formFields={form.fields}/>
			</thead>
			<tbody>
				{currentEntryId &&
					<Fragment>
						<SingleEntry
							entry={getCurrentEntry()}
							entryId={currentEntryId}
							formId={form.ID}
						/>
					</Fragment>
				}
				{!currentEntryId &&
					<EntryRows entries={entries} />
				}
			</tbody>
		</table>
	)
};
