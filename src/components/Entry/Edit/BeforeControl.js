import React, {Fragment} from 'react';
import {TextControl} from '@wordpress/components'
import {componentClassName} from "../../../control-factory/componentClassName";

export default function (props) {
	const {
		before,
		setBefore,
		hideLabel,
		instanceId
	} = props;

	const label = 'Text Before Value';
	const className = componentClassName('entryValue', 'before', 'edit');
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
					value={before}
					placeholder={'Text to show before value'}
					onChange={(event) => setBefore(event.target.value)}
				/>
			</Fragment>
		)
	}

	return (
		<TextControl
			className={className}
			id={id}
			label={label}
			value={before}
			onChange={setBefore}
		/>
	);
}


