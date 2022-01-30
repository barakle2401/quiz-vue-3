import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import TheHome from "@/views/home/TheHome.vue";
import TheQuiz from "@/views/quiz/TheQuiz.vue";
import TheScore from "@/components/quiz/TheScore.vue";
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: TheHome },
    { path: "/quiz", name: "quiz", component: TheQuiz },
    {
      path: "/score",
      name: "TheScore",
      component: TheScore,
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.name === "TheScore" && (!to.params.totalQuestions || !to.params.score))
    next("/");
  else next();
});
createApp(App).use(router).mount("#app");
