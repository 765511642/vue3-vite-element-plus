import Cookies from 'js-cookie';
import { setting } from './settings';
let { tokenTableName } = setting;
export function getCookies(key) {
	return Cookies.get(key);
}
export function setCookies(key, value) {
	return Cookies.set(key, value);
}
export function removeCookies(key) {
	if (tokenTableName === key) {
		throw new Error('不可删除accessToken');
	} else {
		return Cookies.remove(key);
	}
}
