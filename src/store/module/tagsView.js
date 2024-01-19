// 程序操作
import { defineStore } from 'pinia';

export const useTagsViewStore = defineStore('tagsViewStore', {
    state: () => ({
        visitedViews: [],   // 打开的页签
        cachedViews: []    // 需要打开程序就缓存的页签
    }),
    getters: {},
    actions: {
        DEL_VISITED_VIEW (view) {
            return new Promise((resolve) => {
                for (const [i, v] of this.visitedViews.entries()) {
                    if (v.path === view.path) {
                        this.visitedViews.splice(i, 1);
                        resolve();
                        break;
                    }
                }
            });
        },
        DEL_CACHED_VIEW (view) {
            return new Promise((resolve) => {
                const index = this.cachedViews.indexOf(view.name);
                index > -1 && this.cachedViews.splice(index, 1);
                resolve();
            });
        },
        ADD_VISITED_VIEW (view) {
            if (this.visitedViews.some(v => v.path === view.path)) return;
            this.visitedViews.push(
                Object.assign({}, view, {
                    title: view.meta.title || '首页'
                })
            );
        },
        DEL_ALL_VISITED_VIEWS () {
            const affixTags = this.visitedViews.filter(tag => tag.meta.affix);
            this.visitedViews = affixTags;
        },
        DEL_ALL_CACHED_VIEWS () {
            this.cachedViews = [];
        },
        ADD_CACHED_VIEW (view) {
            if (this.cachedViews.includes(view.name)) return;
            if (!view.meta.noCache) {
                this.cachedViews.push(view.name);
            }
        },
        delView (view) {
            return new Promise((resolve) => {
                this.DEL_VISITED_VIEW(view);
                this.DEL_CACHED_VIEW(view);
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                });
            });
        },
        addView (view) {
            this.ADD_VISITED_VIEW(view);
            this.ADD_CACHED_VIEW(view);
        },
        addVisitedView (view) {
            this.ADD_VISITED_VIEW(view);
        },
        delAllViews () {
            return new Promise((resolve) => {
                this.DEL_ALL_CACHED_VIEWS();
                this.DEL_ALL_VISITED_VIEWS();
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                });
            });
        }
    }
});
