<template>
    <div class="sidebar-logo-container"
        :class="{ 'collapse': collapse }">
        <Transition>
            <router-link v-if="collapse"
                key="collapse"
                class="sidebar-logo-link"
                to="/">
                <img v-if="logo"
                    :src="logo"
                    class="sidebar-logo" />
                <h1 v-else
                    class="sidebar-title">{{ title }}</h1>
            </router-link>
            <router-link v-else
                key="expand"
                class="sidebar-logo-link"
                to="/">
                <img v-if="logo"
                    :src="logo"
                    class="sidebar-logo" />
                <h1 class="sidebar-title">{{ title }}</h1>
            </router-link>
        </Transition>
    </div>
</template>
<script setup>
import { setting } from '@/utils/settings';
import { ref } from 'vue';
import logoImg from '@/assets/logo.jpg';
defineProps({
    collapse: {
        type: Boolean,
        required: true
    }
});
let title = ref(setting.title);

let logo = ref(logoImg);
</script>
<style lang="scss" scoped>
.v-enter-active {
	transition: opacity 1.5s;
}
.v-enter-from,
.v-leave-to {
	opacity: 0;
}
.sidebar-logo-container {
	position: relative;
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	overflow: hidden;
	background: #2b2f3a;

	& .sidebar-logo-link {
		height: 100%;
		width: 100%;

		& .sidebar-logo {
			width: 32px;
			height: 32px;
			vertical-align: middle;
			margin-right: 12px;
		}

		& .sidebar-title {
			display: inline-block;
			margin: 0;
			color: #fff;
			font-weight: 600;
			line-height: 50px;
			font-size: 14px;
			font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
			vertical-align: middle;
		}
	}

	&.collapse {
		.sidebar-logo {
			margin-right: 0px;
		}
	}
}
</style>
