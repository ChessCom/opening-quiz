import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '@/views/WelcomePage.vue';
import OpeningQuiz from '@/views/OpeningQuiz.vue';
import ResultPage from '@/views/ResultPage.vue';


const routes = [
  { path: '/', component: WelcomePage },
  { path: '/quiz', component: OpeningQuiz },
  { path: '/result', component: ResultPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
