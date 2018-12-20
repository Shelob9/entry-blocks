
export function findFormById(forms, formId) {
	return forms.find((__form) => formId === __form.ID);
}
