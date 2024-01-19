import { useUserStore } from '@/store';

export const checkPermission = (el, binding) => {
    const userStore = useUserStore();
    const { value } = binding;
    const roles = userStore.getRoles;   // 这里换成btn权限，每个页面要把按钮权限的code写好，需要一个code维护表
    if (value && value instanceof Array) {
        if (value.length > 0) {
            const permissionRoles = value;

            const hasPermission = roles.some(role => {
                return permissionRoles.includes(role);
            });

            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    } else {
        console.error(`need roles! Like v-permission="['admin','editor']"`);
    }
};