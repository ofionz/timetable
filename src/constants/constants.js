// const API_URL = 'https://b24.formula.starlabs.su/ajax/';
// const API_URL = 'https://b24dev2.formula.starlabs.su/ajax/';
// const API_URL = 'http://localhost:8080/alice/testserver';
const API_URL = 'https://b24.formula.as/ajax/';

const API_ENDPOINT = `${API_URL}?controller=schedule&action=`;

export const GET_DEPARTMENTS_ENDPOINT = `${API_ENDPOINT}getdepartments`;
export const GET_CITIES_ENDPOINT = `${API_ENDPOINT}getcities`;
export const SAVE_DEPARTMENT_ENDPOINT = `${API_ENDPOINT}savedepartment`;
