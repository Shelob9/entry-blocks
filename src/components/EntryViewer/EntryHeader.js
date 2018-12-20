import React, {Fragment} from 'react';
export const EntryHeader = (props ) => {
	const {entryField,labelWith} = props;
	const label = labelWith && labelWith.length ? labelWith : entryField.slug;
	return (
		<Fragment>
			{label}
		</Fragment>

	);
};
