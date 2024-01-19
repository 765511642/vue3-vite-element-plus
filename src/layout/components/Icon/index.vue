<script>
import { h, defineComponent } from 'vue';
export default defineComponent(
    (props) => {
        return () => {
            // 渲染函数或 JSX
            return h('i', { class: ['iconfont', props.icon] });
        };
    },
    {
        props: {
            icon: {
                type: String,
                default: 'icon-kongxian'
            }
        }
    }
);
</script>