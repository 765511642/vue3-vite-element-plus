<template>
    <div id="tags-view-container"
        class="tags-view-container">
        <scroll-pane ref="scrollPane"
            class="tags-view-wrapper">
            <router-link v-for="tag in visitedViews"
                ref="tagDom"
                :key="tag.path"
                :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                class="tags-view-item"
                @click.middle="!isAffix(tag)?closeSelectedTag(tag):''">
                {{ tag.title }}
                <el-icon class="close"
                    v-if="!isAffix(tag)"
                    @click.prevent.stop="closeSelectedTag(tag)">
                    <Close />
                </el-icon>
            </router-link>
        </scroll-pane>
    </div>
</template>
<script setup>
import pathBrowserify from 'path-browserify';
import { ref, computed, watch, onMounted } from 'vue';
import { useTagsViewStore, usePermissionStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
const tagsViewStore = useTagsViewStore();
const permissionStore = usePermissionStore();
const route = useRoute();
const router = useRouter();
import scrollPane from './ScrollPane.vue';
let affixTagsList = ref([]);
let tagDom = ref();
watch(
    () => route,
    () => {
        addTags();
    },
    { deep: true }
);
onMounted(() => {
    initTags();
    addTags();
});
const visitedViews = computed(() => {
    return tagsViewStore.visitedViews;
});
const routes = computed(() => {
    return permissionStore.routes;
});

const isActive = (tag) => {
    return tag.path === route.path;
};
const isAffix = (tag) => {
    return tag.meta && tag.meta.affix;
};

const closeSelectedTag = (view) => {
    tagsViewStore.delView(view).then(({ visitedViews }) => {
        if (isActive(view)) {
            toLastView(visitedViews, view);
        }
    });
};
const toLastView = (visitedViews, view) => {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
        router.push(latestView.fullPath);
    } else {
        // 现在默认情况是如果没有标签视图则重定向到主页;
        if (view.name === 'home') {
            router.replace({ path: '/redirect' + view.fullPath });
        } else {
            router.push('/');
        }
    }
};

const addTags = () => {
    const { name } = route;
    if (name) {
        tagsViewStore.addView(route);
    }
    return false;
};
const filterAffixTags = (routes, basePath = '/') => {
    let tags = [];
    routes.forEach(route => {
        if (route.meta && route.meta.affix) {
            const tagPath = pathBrowserify.resolve(basePath, route.path);
            tags.push({
                fullPath: tagPath,
                path: tagPath,
                name: route.name,
                meta: { ...route.meta }
            });
        }
        if (route.children) {
            const tempTags = filterAffixTags(route.children, route.path);
            if (tempTags.length >= 1) {
                tags = [...tags, ...tempTags];
            }
        }
    });
    return tags;
};
const initTags = () => {
    let routersView = routes?.value?.map((item) => {
        return (item.children);
    }).filter(e => e).flat();
    const affixTags = affixTagsList.value = filterAffixTags(routersView);
    for (const tag of affixTags) {
        // 必须有标签名称
        if (tag.name) {
            tagsViewStore.addVisitedView(tag);
        }
    }
};

</script>
<style lang="scss" scoped>
.tags-view-container {
	height: 38px;
	width: 100%;
	background: #fff;
	border-bottom: 1px solid #d8dce5;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
	.tags-view-wrapper {
		.tags-view-item {
			display: inline-block;
			position: relative;
			cursor: pointer;
			height: 28px;
			line-height: 28px;
			border-bottom: 1px solid none;
			background-color: rgb(195 224 210 / 26%);
			color: #50b089;
			border-color: #42b98342;
			padding: 0 8px;
			font-size: 12px;
			margin-left: 5px;
			margin-top: 5px;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			font-weight: 400;
			.close {
				position: relative;
				top: 2px;
				transition: all 0.3s;
				width: 0;
			}
			&:hover {
				.close {
					width: 20px;
				}
			}
			&:first-of-type {
				margin-left: 15px;
			}
			&:last-of-type {
				margin-right: 15px;
			}
			&.router-link-active {
				background-color: #42b98342;
				color: #50b089;
				border-color: #42b98342;
				font-weight: 700;
				.close {
					width: 20px;
				}
				// &::before {
				// 	content: '';
				// 	background: #fff;
				// 	display: inline-block;
				// 	width: 8px;
				// 	height: 8px;
				// 	border-radius: 50%;
				// 	position: relative;
				// 	margin-right: 2px;
				// }
			}
		}
	}
	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 3000;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;
			&:hover {
				background: #eee;
			}
		}
	}
}
</style>