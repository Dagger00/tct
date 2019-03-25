import TrafficLight from './components/TrafficLight.vue'
import VueRouter from 'vue-router'

const routes = [
  { path: '/', redirect: '/1' },
  { path: '/1', component: TrafficLight, props: {
    seconds: 4,
  }},
  { path: '/2', component: TrafficLight, props: {
    seconds: 4,
  }},
  { path: '/3', component: TrafficLight, props: {
    seconds: 4,
  } },
];

export const router = new VueRouter({
  routes,
  mode: 'history'
});
