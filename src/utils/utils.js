import Layout from '@/layout/index';
const loadView = import.meta.glob('../views/**/*.vue');
export function toTree(list, idProp, parentIdProp) {
	const map = new Map();
	const tree = [];

	// 将列表中的每个项映射到哈希表中
	list.forEach((item) => {
		map.set(item[idProp], item);
	});

	// 遍历列表，将每个项添加到其父级的 children 数组中
	list.forEach((item) => {
		let newItem = item;
		const parent = map.get(newItem[parentIdProp]);
		if (parent) {
			if (!parent.children) {
				parent.children = [];
			}
			parent.children.push(newItem);
		} else {
			tree.push(newItem);
		}
	});
	return tree;
}
export function addComponent(routerList) {
	routerList.map((oneMenu) => {
		return oneMenu.children.map((twoMenu) => {
			// 二级，组件为layout
			twoMenu.component = Layout;
			twoMenu.children.map((threeMenu) => {
				// 三级，为自己的页面
				// threeMenu.component = tabIndex;
				threeMenu.component = loadView[`../views${threeMenu.component}.vue`];
				return threeMenu;
			});
			return twoMenu;
		});
	});
	return routerList;
}
