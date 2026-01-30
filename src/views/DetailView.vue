<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as echarts from 'echarts'

const route = useRoute()
const router = useRouter()
const chartRef = ref(null)
const chartRef2 = ref(null)
let chartInstance = null
let chartInstance2 = null

function defaultFinancial() {
  return [
    { item: '매출액', unit: '억원', y2022: 1200, y2023: 1890, y2024: 2450 },
    { item: '영업이익', unit: '억원', y2022: -120, y2023: 80, y2024: 210 },
    { item: '당기순이익', unit: '억원', y2022: -150, y2023: 45, y2024: 180 },
    { item: '자산총계', unit: '억원', y2022: 3200, y2023: 4100, y2024: 5200 },
    { item: '부채총계', unit: '억원', y2022: 1100, y2023: 1200, y2024: 1350 },
  ]
}

// 목업: 기업별 상세 데이터
const companyData = {
  1: {
    name: '카카오페이',
    industry: '핀테크',
    expectedDate: '2025.02',
    status: '청약예정',
    price: '26,000원',
    summary: '카카오톡 간편결제·송금 서비스를 제공하는 핀테크 기업입니다.',
    financial: [
      { item: '매출액', unit: '억원', y2022: 4230, y2023: 5891, y2024: 7102 },
      { item: '영업이익', unit: '억원', y2022: -892, y2023: 234, y2024: 512 },
      { item: '당기순이익', unit: '억원', y2022: -1102, y2023: 156, y2024: 398 },
      { item: '자산총계', unit: '억원', y2022: 12450, y2023: 15230, y2024: 18901 },
      { item: '부채총계', unit: '억원', y2022: 8120, y2023: 9450, y2024: 10230 },
    ],
    similar: [
      { name: '네이버페이', industry: '핀테크', marketCap: '약 12조' },
      { name: '토스', industry: '핀테크', marketCap: '약 9조' },
      { name: '페이코', industry: '핀테크', marketCap: '약 2조' },
    ],
  },
  2: {
    name: '크래프톤',
    industry: '게임',
    expectedDate: '2025.01',
    status: '상장완료',
    price: '49,000원',
    summary: '배틀그라운드, 테라 등 글로벌 게임 IP를 보유한 게임 개발사입니다.',
    financial: [
      { item: '매출액', unit: '억원', y2022: 18920, y2023: 19450, y2024: 21230 },
      { item: '영업이익', unit: '억원', y2022: 7120, y2023: 6890, y2024: 8102 },
      { item: '당기순이익', unit: '억원', y2022: 5890, y2023: 5234, y2024: 6450 },
      { item: '자산총계', unit: '억원', y2022: 25120, y2023: 28450, y2024: 32100 },
      { item: '부채총계', unit: '억원', y2022: 2340, y2023: 2120, y2024: 2890 },
    ],
    similar: [
      { name: '넥슨', industry: '게임', marketCap: '약 18조' },
      { name: '넷마블', industry: '게임', marketCap: '약 8조' },
      { name: '카카오게임즈', industry: '게임', marketCap: '약 2조' },
    ],
  },
  3: {
    name: '하이브',
    industry: '엔터테인먼트',
    expectedDate: '2025.03',
    status: '심사중',
    price: '-',
    summary: 'BTS, 뉴진스 등 글로벌 아티스트를 보유한 음악·엔터테인먼트 기업입니다.',
    financial: [
      { item: '매출액', unit: '억원', y2022: 14230, y2023: 18901, y2024: 22450 },
      { item: '영업이익', unit: '억원', y2022: 1890, y2023: 2340, y2024: 2890 },
      { item: '당기순이익', unit: '억원', y2022: 1234, y2023: 1567, y2024: 1901 },
      { item: '자산총계', unit: '억원', y2022: 12340, y2023: 15670, y2024: 18230 },
      { item: '부채총계', unit: '억원', y2022: 3450, y2023: 4120, y2024: 4890 },
    ],
    similar: [
      { name: 'SM', industry: '엔터', marketCap: '약 1.2조' },
      { name: 'JYP', industry: '엔터', marketCap: '약 1.8조' },
      { name: 'YG', industry: '엔터', marketCap: '약 0.9조' },
    ],
  },
  4: { name: '당근마켓', industry: '이커머스', expectedDate: '2025.Q2', status: '준비중', price: '-', summary: '중고거래·동네정보 플랫폼.', financial: defaultFinancial(), similar: [{ name: '쿠팡', industry: '이커머스', marketCap: '약 80조' }, { name: '네이버', industry: '이커머스', marketCap: '약 45조' }, { name: '티몬', industry: '이커머스', marketCap: '약 0.5조' }] },
  5: { name: '토스', industry: '핀테크', expectedDate: '2025.Q2', status: '준비중', price: '-', summary: '간편송금·결제·금융 서비스.', financial: defaultFinancial(), similar: [{ name: '카카오페이', industry: '핀테크', marketCap: '-' }, { name: '네이버페이', industry: '핀테크', marketCap: '약 12조' }, { name: '페이코', industry: '핀테크', marketCap: '약 2조' }] },
  6: { name: '메디트', industry: '헬스케어', expectedDate: '2025.04', status: '청약예정', price: '18,500원', summary: '디지털 헬스케어·원격진료 플랫폼.', financial: defaultFinancial(), similar: [{ name: '셀트리온', industry: '헬스케어', marketCap: '약 25조' }, { name: '유한양행', industry: '헬스케어', marketCap: '약 8조' }, { name: 'SK바이오팜', industry: '헬스케어', marketCap: '약 5조' }] },
  7: { name: '셀리', industry: '이커머스', expectedDate: '2025.03', status: '심사중', price: '-', summary: '해외직구 대리구매 이커머스.', financial: defaultFinancial(), similar: [{ name: '쿠팡', industry: '이커머스', marketCap: '약 80조' }, { name: '위메프', industry: '이커머스', marketCap: '약 0.3조' }, { name: '11번가', industry: '이커머스', marketCap: '-' }] },
  8: { name: '스포카', industry: 'SaaS', expectedDate: '2025.Q2', status: '준비중', price: '-', summary: '매장·리테일 관리 SaaS.', financial: defaultFinancial(), similar: [{ name: '더존', industry: 'SaaS', marketCap: '약 2조' }, { name: '한컴', industry: 'SaaS', marketCap: '약 0.8조' }, { name: '카페24', industry: '이커머스/SaaS', marketCap: '약 0.5조' }] },
}

// 공통 기본 데이터 (id 없거나 목업에 없는 경우)
const defaultCompany = {
  name: '상장 예정 기업',
  industry: '-',
  expectedDate: '-',
  status: '준비중',
  price: '-',
  summary: '증권신고서 상세 정보를 확인할 수 있습니다.',
  financial: [
    { item: '매출액', unit: '억원', y2022: 0, y2023: 0, y2024: 0 },
    { item: '영업이익', unit: '억원', y2022: 0, y2023: 0, y2024: 0 },
    { item: '당기순이익', unit: '억원', y2022: 0, y2023: 0, y2024: 0 },
    { item: '자산총계', unit: '억원', y2022: 0, y2023: 0, y2024: 0 },
    { item: '부채총계', unit: '억원', y2022: 0, y2023: 0, y2024: 0 },
  ],
  similar: [
    { name: '유사기업 1', industry: '-', marketCap: '-' },
    { name: '유사기업 2', industry: '-', marketCap: '-' },
    { name: '유사기업 3', industry: '-', marketCap: '-' },
  ],
}

const company = computed(() => {
  const id = Number(route.params.id)
  return companyData[id] || { ...defaultCompany, name: `기업 #${id}` }
})

function goBack() {
  router.push('/')
}

function initCharts() {
  if (!chartRef.value || !chartRef2.value) return

  const years = ['2022', '2023', '2024']
  const revenue = company.value.financial.find(r => r.item === '매출액')
  const profit = company.value.financial.find(r => r.item === '당기순이익')
  const revenueData = revenue ? [revenue.y2022, revenue.y2023, revenue.y2024] : [0, 0, 0]
  const profitData = profit ? [profit.y2022, profit.y2023, profit.y2024] : [0, 0, 0]

  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: { type: 'category', data: years, axisLine: { lineStyle: { color: '#E5E7EB' } } },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#F2F4F6' } } },
    series: [{ name: '매출액(억원)', type: 'bar', data: revenueData, itemStyle: { color: '#3182F6' }, barMaxWidth: 48 }],
  })

  chartInstance2 = echarts.init(chartRef2.value)
  chartInstance2.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: { type: 'category', data: years, axisLine: { lineStyle: { color: '#E5E7EB' } } },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#F2F4F6' } } },
    series: [{ name: '당기순이익(억원)', type: 'line', data: profitData, smooth: true, lineStyle: { color: '#3182F6', width: 2 }, itemStyle: { color: '#3182F6' }, areaStyle: { color: 'rgba(49,130,246,0.1)' } }],
  })
}

onMounted(() => {
  initCharts()
})

watch(
  () => route.params.id,
  () => {
    if (chartInstance) chartInstance.dispose()
    if (chartInstance2) chartInstance2.dispose()
    setTimeout(initCharts, 50)
  }
)
</script>

<template>
  <div class="min-h-screen bg-toss-gray pb-10">
    <!-- 헤더 -->
    <header class="bg-white shadow-toss sticky top-0 z-10">
      <div class="max-w-2xl mx-auto px-5 py-4">
        <button
          class="flex items-center gap-1 text-toss-grayText hover:text-toss-black mb-2"
          @click="goBack"
        >
          ‹ 목록
        </button>
        <h1 class="text-xl font-bold text-toss-black">{{ company.name }}</h1>
        <p class="text-sm text-toss-grayText mt-0.5">{{ company.industry }} · {{ company.expectedDate }} · {{ company.status }}</p>
      </div>
    </header>

    <main class="max-w-2xl mx-auto px-5 py-6 space-y-6">
      <!-- 요약 -->
      <section class="bg-white rounded-toss-lg shadow-toss p-5">
        <h2 class="text-base font-bold text-toss-black mb-2">기업 개요</h2>
        <p class="text-sm text-toss-grayText leading-relaxed">{{ company.summary }}</p>
        <p v-if="company.price !== '-'" class="mt-3 text-sm">
          <span class="text-toss-grayText">희망공모가</span>
          <span class="ml-2 font-semibold text-toss-black">{{ company.price }}</span>
        </p>
      </section>

      <!-- 재무제표 -->
      <section class="bg-white rounded-toss-lg shadow-toss p-5">
        <h2 class="text-base font-bold text-toss-black mb-4">재무제표 요약</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-toss-gray text-toss-grayText font-medium">
                <th class="text-left py-3 pr-4">항목</th>
                <th class="text-right py-3 px-2">2022</th>
                <th class="text-right py-3 px-2">2023</th>
                <th class="text-right py-3 px-2">2024</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in company.financial"
                :key="row.item"
                class="border-b border-toss-gray"
                :class="i % 2 === 0 ? 'bg-white' : 'bg-toss-gray/30'"
              >
                <td class="py-3 pr-4 text-toss-black">{{ row.item }}</td>
                <td class="text-right py-3 px-2 text-toss-black">{{ row.y2022?.toLocaleString() }}</td>
                <td class="text-right py-3 px-2 text-toss-black">{{ row.y2023?.toLocaleString() }}</td>
                <td class="text-right py-3 px-2 text-toss-black font-medium">{{ row.y2024?.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-xs text-toss-grayText mt-2">단위: {{ company.financial[0]?.unit ?? '억원' }}</p>
      </section>

      <!-- 그래프 -->
      <section class="bg-white rounded-toss-lg shadow-toss p-5">
        <h2 class="text-base font-bold text-toss-black mb-4">매출액 추이</h2>
        <div ref="chartRef" class="w-full h-56"></div>
      </section>
      <section class="bg-white rounded-toss-lg shadow-toss p-5">
        <h2 class="text-base font-bold text-toss-black mb-4">당기순이익 추이</h2>
        <div ref="chartRef2" class="w-full h-56"></div>
      </section>

      <!-- 유사기업 -->
      <section class="bg-white rounded-toss-lg shadow-toss p-5">
        <h2 class="text-base font-bold text-toss-black mb-4">유사기업</h2>
        <ul class="space-y-3">
          <li
            v-for="s in company.similar"
            :key="s.name"
            class="flex items-center justify-between py-2 border-b border-toss-gray last:border-0"
          >
            <div>
              <p class="font-medium text-toss-black">{{ s.name }}</p>
              <p class="text-xs text-toss-grayText">{{ s.industry }}</p>
            </div>
            <span class="text-sm text-toss-grayText">{{ s.marketCap }}</span>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>
