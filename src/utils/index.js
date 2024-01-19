/**
 * 删除空白符
 * @param {*} ob
 */
export function removeNullItem (ob) {
	for (let e in ob) {
		if (
			typeof ob[e] === 'undefined' ||
			ob[e] === null ||
			ob[e] === undefined ||
			ob[e] === '' ||
			ob[e] === ''
		) {
			delete ob[e];
		} else if (ob[e].constructor === Object) {
			if (Object.keys(ob[e]).length === 0) {
				delete ob[e];
			} else {
				removeNullItem(ob[e]);
			}
		} else if (ob[e].constructor === Array) {
			ob[e].map((seg) => {
				if (typeof seg === 'object') {
					removeNullItem(seg);
				}
			});
		} else if (ob[e].constructor === String) {
			ob[e] = ob[e].trim();
		}
	}
	return ob;
}
/**
 * promise封装
 */
export function to (promise) {
	return promise instanceof Promise
		? promise
			.then((data) => {
				return [null, data];
			})
			.catch((errorExt) => {
				return [errorExt, undefined];
			})
		: [promise, undefined];
}
// 验证路径path 是否以 http:, https:, mailto: 或 tel: 开头
export function isExternal (path) {
	return /^(https?:|mailto:|tel:)/.test(path);
}
