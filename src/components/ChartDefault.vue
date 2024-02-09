<template>
	<div>
		<h4 class="text-xl font-semibold">Notowania przykładowego instrumentu finansowego</h4>

		<div class="mt-4">
			<PageLoader v-if="data.length === 0"/>

			<div v-show="data.length > 0">
				<div id="scichart-root" class="w-full h-[600px] mx-auto"></div>

				<h4 class="text-xl font-semibold mt-8">Tabela dla porównania rekordów</h4>

				<div class="h-[500px] overflow-y-scroll">
					<table class="w-full mt-4">
						<thead>
						<tr>
							<th class="border p-3">Data</th>
							<th class="border p-3">Cena</th>
							<th class="border p-3">Ilość</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="item in data" :key="item.dt">
							<td class="border p-3">{{ new Date(item.dt * 1000).toLocaleString() }}</td>
							<td class="border p-3">{{ item.price }}</td>
							<td class="border p-3">
								{{ item.amount }}
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import axios, {AxiosResponse} from "axios";
import {onBeforeUnmount, onMounted, ref} from "vue";
import PageLoader from "@/components/PageLoader.vue";
import {initSciChart} from "@/utils/sciChart";

const data = ref<any>([])
const chartInitializationPromise = ref<any>(undefined)

const fetchData: () => Promise<AxiosResponse<any, any>> = async () => {
	return axios.get("https://rest.statica.pl/rest/stockquotes/gpw:PLKGHM000017?type=trades&dt_from=2010-01-01&limit=10000", {
		auth: {
			username: 'frontend2024',
			password: 'test'
		}
	})
		.then((response: AxiosResponse<any, any>) => {
			const res = response.data
			const last = res[res.length - 1]
			const lastDifference = last.dt - 10800 // 3 hours

			return res.filter((item: any) => item.dt > lastDifference - 3000 && item.dt < lastDifference + 3000)
		})
}

onMounted(async () => {
	data.value = await fetchData()

	chartInitializationPromise.value = initSciChart(
		data.value.map((item: any) => item.dt),
		data.value.map((item: any) => item.price),
		data.value.map((item: any) => item.amount),
	)
})

onBeforeUnmount(() => {
	chartInitializationPromise.value.then((chart: any) => {
		chart?.delete()
	})
})
</script>
