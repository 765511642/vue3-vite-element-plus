import { useUserStore } from '@/store';

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission (value) {
    const userStore = useUserStore();
    if (value && value instanceof Array && value.length > 0) {
        const roles = userStore.getRoles;
        const permissionRoles = value;

        const hasPermission = roles.some(role => {
            return permissionRoles.includes(role);
        });
        return hasPermission;
    } else {
        console.error(`need roles! Like v-permission="['admin','editor']"`);
        return false;
    }
}
