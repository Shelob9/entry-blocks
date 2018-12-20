
import {
	registerStore,
	dispatch,
	select,
} from '@wordpress/data';

import {
	state,
	store
} from '@caldera-labs/state';
import * as cfApi from "@caldera-labs/api-client";
export const SET_FORMS = 'SET_FORMS';
export const SET_FORM = 'SET_FORM';
import {getFormFieldsOfForm} from "../components/controls/ChooseEntryField";

const {
	actions,
	selectors,
	reducers
} = store;
const {
	setForms,
	setForm
} = actions;
const API_URL = 'object' === typeof CF_ADMIN ? CF_ADMIN.api.root.replace(/\/$/, "") : 'http://localhost:8218';
let forms = 'object' === typeof CF_ADMIN ? CF_ADMIN.forms : {};
forms = Object.values(forms);
const NONCE = 'object' === typeof CF_ADMIN ? CF_ADMIN.api.nonce : '12345';
export const entryApiClient = new cfApi.EntriesClient(API_URL);
entryApiClient.setNonce(NONCE);

function getEntries(formId, page) {
	return entryApiClient.makeRequest(`entries/${formId}`, {page});
}

const e = forms.reduce((acc, form) => {
	acc[form.ID] = {1: {}};
	return acc;
}, {});

export const initialState =
	{
		...e,
		forms,
		previewFormId: '',
		previewEntryId: 0
	};

function findForm(state, formId) {
	let form = {};
	const {forms} = state;
	if (forms) {
		const index = forms.findIndex(form => formId === form.ID);
		if (index > -1) {
			form = forms[index];
		}
	}
	return form;
}

function findEntryPage(state, formId, pageNumber) {
	if (state.hasOwnProperty(formId) && state[formId].hasOwnProperty(pageNumber)) {
		return state[formId][pageNumber];
	}
	return {};
}

const SET_ENTRY_PREVIEW_FORM_ID = 'CALDERA_FORMS/ENTRIES/PREVIEW/FORM/ID';
const SET_ENTRY_PREVIEW_ENTRY_ID = 'CALDERA_FORMS/ENTRIES/PREVIEW/ENTRY/ID';

function setEntryPreviewFormId(formId) {
	return {
		type: SET_ENTRY_PREVIEW_FORM_ID,
		formId
	}
}

function setEntryPreviewEntryId(entryId) {
	return {
		type: SET_ENTRY_PREVIEW_ENTRY_ID,
		entryId
	}
}

export function entryStoreFactory(slug, resolvers = {}) {
	return registerStore(slug, {
		reducer(state = initialState, action) {
			switch (action.type) {
				case SET_FORM :
					const forms = [...state.forms];
					const index = forms.findIndex(form => action.form.ID === form.ID);
					if (index > -1) {
						forms[index] = action.form;
					} else {
						forms.push(action.forms);
					}
					return {
						...state,
						forms
					};
				case SET_FORMS :
					return {
						...state,
						forms: action.forms
					};
				case SET_ENTRY_PREVIEW_ENTRY_ID :
					return {
						...state,
						previewEntryId: action.entryId
					};
				case SET_ENTRY_PREVIEW_FORM_ID :
					return {
						...state,
						previewFormId: action.formId
					};
				default:
					return reducers.entriesReducer(state, action);

			}
		},
		actions: {
			setForms,
			setForm,
			setEntries: (formId, pageNumber, entries) => actions.setEntries(formId, pageNumber, entries),
			setEntryPreviewFormId,
			setEntryPreviewEntryId
		},
		selectors: {
			getFormFieldsForEntry(state, formId) {
				return getFormFieldsOfForm(findForm(state, formId));
			},
			getEntries(state, formId, pageNumber = 1) {
				return findEntryPage(state, formId, pageNumber);
			},
			getEntry(state, formId, entryId, pageNumber = 1) {
				const page = findEntryPage(state, formId, 1);
				if (page.hasOwnProperty(entryId)) {
					return page[entryId];
				}
				return {
					fields: {}
				};

			},
			getForms(state) {
				return state.forms
					? state.forms
					: [];
			},
			getForm(state, formId) {
				return findForm(state, formId);
			},
			getPreviewEntryId(state) {
				return state.previewEntryId
					? state.previewEntryId
					: 0;
			},
			getPreviewFormId(state) {
				return state.previewFormId
					? state.previewFormId
					: '';
			}
		},
		resolvers
	});
}

export const {CALDERA_FORMS_ENTRIES_SLUG} = state;
export const entryStore = entryStoreFactory(CALDERA_FORMS_ENTRIES_SLUG, {
	getEntries(formId, pageNumber = 1) {
		if (formId) {
			getEntries(formId, pageNumber).then(r => r.json())
				.then(r => {
					if (!r.code) {
						dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntries(formId, pageNumber, r)
					}

					return r;
				});
		}

	},

});

if (forms) {
	dispatch(CALDERA_FORMS_ENTRIES_SLUG).setForms(forms);
}

