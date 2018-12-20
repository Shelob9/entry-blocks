import React, {Fragment} from 'react';
import {TextControl} from '@wordpress/components'
import {componentClassName} from "../../../control-factory/componentClassName";

export default function (props) {
	const {
		after,
		setAfter,
		instanceId,
		hideLabel
	} = props;

	const label = 'Text After Value';
	const className = componentClassName('entryValue', 'after', 'edit')
	const id = className + '-' + instanceId;

	if( hideLabel ){
		return(
			<Fragment>
				<label
					className="sr-only screen-reader-text"
					htmlFor={id}
				>
					{ label }
				</label>
				<input
					type="text"
					value={after}
					placeholder={'Text to show after value'}
					onChange={(event) => setAfter(event.target.value)}
					id={id}
				/>
			</Fragment>
		)
	}


	return (
		<TextControl
			className={className}
			label={label}
			id={id}
			value={after}
			onChange={setAfter}
		/>
	);
}


