<template>
	<header class="mx-auto py-5 container">
		<h2 class="text-center text-3xl font-bold font-sans">Statica Test</h2>
	</header>

	<main class="container mx-auto">
		<div class="mt-8 shadow-md border p-5">
			<ChartDefault/>
		</div>
	</main>

	<footer>
		<p class="text-center mt-8">Created @ {{ copyright.year }} - {{ copyright.author }} &copy;</p>
	</footer>
</template>

<script setup lang="ts">
import ChartDefault from "@/components/ChartDefault.vue";
import {Ref, ref} from "vue";

const copyright: Ref<{ year: number, author: string }> = ref({
	year: new Date().getFullYear(),
	author: "Łukasz Fujarski"
})
</script>
