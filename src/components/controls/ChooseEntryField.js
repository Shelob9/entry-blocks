
import classNames from "classnames";
import {Fragment} from '@wordpress/element';

export function getFormFieldsOfForm(form) {
	return  {
		...form.field_details.entry_list,
		...form.field_details.order
	};
}

export const ChooseEntryField = (props) => {
	const {
		hideLabel,
		currentEntry,
		instanceId,
		form,
		onSetField,
		entryFieldId
	} = props;
	const formFields = getFormFieldsOfForm(form);
	const className = 'caldera-forms-entry-field-chooser';
	const id = className + '-' + instanceId;

	let options = [
		{
			label: '--',
			value: null
		}
	];


	if ('object' === typeof formFields && JSON.stringify(formFields) !== JSON.stringify({})) {
		Object.values(formFields).forEach((field) => {
			if ('object' === typeof  field) {
				options.push({
					value: field.id,
					label: field.label
				});
			}

		});
	}
	return (
		<Fragment>
			<label
				htmlFor={id}
				className={classNames({
					'sr-only': hideLabel,
					'screen-reader-text': hideLabel,
				})}
			>
				Choose Field
			</label>
			<select
				id={id}
				className={className}
				value={entryFieldId}
				onChange={(event) => {
					onSetField(event.target.value)
				}}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>{option.label}</option>))}
			</select>
		</Fragment>

	);
};
