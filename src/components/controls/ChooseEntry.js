import React, {Fragment} from 'react';

export const ChooseEntry = (props) =>{
	const id = 'caldera-forms-entry-chooser-' + props.instanceId;
	let options = [
		{
			label:'--',
			value: null
		}
	];

	if( JSON.stringify(props.entries)!== JSON.stringify({})){
		Object.values(props.entries).forEach( (entry) => {
			if( 'object' === typeof  entry ){
				options.push( {
					value:entry.id,
					label:entry.id
				});
			}

		});
	}
	return <Fragment>
		<label
			htmlFor={id}
		>
			Choose Entry
		</label>
		<select
			id={ id }
			className={'caldera-forms-entry-chooser'}
			value={ props.currentEntry }
			onChange={ (event) => {props.onSetEntry( event.target.value)} }
		>
			{ options.map( (option) => ( <option key={option.value} value={option.value}>{option.label}</option>) )}
		</select>
	</Fragment>
};
