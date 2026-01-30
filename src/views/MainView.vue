<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 목업: 상장 예정 기업 리스트
const ipoList = ref([
  { id: 1, name: '카카오페이', industry: '핀테크', expectedDate: '2025.02', status: '청약예정', price: '26,000원' },
  { id: 2, name: '크래프톤', industry: '게임', expectedDate: '2025.01', status: '상장완료', price: '49,000원' },
  { id: 3, name: '하이브', industry: '엔터테인먼트', expectedDate: '2025.03', status: '심사중', price: '-' },
  { id: 4, name: '당근마켓', industry: '이커머스', expectedDate: '2025.Q2', status: '준비중', price: '-' },
  { id: 5, name: '토스', industry: '핀테크', expectedDate: '2025.Q2', status: '준비중', price: '-' },
  { id: 6, name: '메디트', industry: '헬스케어', expectedDate: '2025.04', status: '청약예정', price: '18,500원' },
  { id: 7, name: '셀리', industry: '이커머스', expectedDate: '2025.03', status: '심사중', price: '-' },
  { id: 8, name: '스포카', industry: 'SaaS', expectedDate: '2025.Q2', status: '준비중', price: '-' },
])

function getStatusStyle(status) {
  const map = {
    '청약예정': 'bg-toss-blueLight text-toss-blue',
    '상장완료': 'bg-toss-gray text-toss-grayText',
    '심사중': 'bg-amber-50 text-amber-700',
    '준비중': 'bg-toss-gray text-toss-grayText',
  }
  return map[status] || 'bg-toss-gray text-toss-grayText'
}

function goDetail(id) {
  router.push({ name: 'detail', params: { id } })
}
</script>

<template>
  <div class="min-h-screen bg-toss-gray">
    <header class="bg-white shadow-toss sticky top-0 z-10">
      <div class="max-w-2xl mx-auto px-5 py-4">
        <h1 class="text-xl font-bold text-toss-black">상장 예정 기업</h1>
        <p class="text-sm text-toss-grayText mt-0.5">IPO 일정과 청약 정보를 한눈에</p>
      </div>
    </header>

    <main class="max-w-2xl mx-auto px-5 py-6 pb-10">
      <ul class="space-y-3">
        <li
          v-for="ipo in ipoList"
          :key="ipo.id"
          class="bg-white rounded-toss-lg shadow-toss p-5 transition-shadow hover:shadow-toss-hover cursor-pointer"
          @click="goDetail(ipo.id)"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <h2 class="font-bold text-toss-black text-lg truncate">{{ ipo.name }}</h2>
              <p class="text-sm text-toss-grayText mt-0.5">{{ ipo.industry }} · {{ ipo.expectedDate }}</p>
            </div>
            <div class="flex items-center gap-3 ml-4 shrink-0">
              <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="getStatusStyle(ipo.status)"
              >
                {{ ipo.status }}
              </span>
              <span v-if="ipo.price !== '-'" class="text-sm font-semibold text-toss-black">
                {{ ipo.price }}
              </span>
              <span class="text-toss-grayText">›</span>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
