import React from 'react';
import classNames from 'classnames';
export const ChooseForm = (props) => {
	const id = 'caldera-forms-form-chooser-' + props.instanceId;
	return (
		<div>
			<label
				className={classNames({'sr-only': false})}
				htmlFor={id}
			>
				Choose Form
			</label>
			<select
				key={id}
				id={id}
				className={'caldera-forms-form-chooser'}
				value={ props.currentFormId }
				onChange={ (event) => {props.onSetForm(event.target.value)} }
			>
				{<option key={'null-opt'}> -- </option>}
				{ props.forms.map( form => ( <option key={form.ID} value={form.ID}>{form.name}</option>) )}
			</select>
		</div>
	);

};
