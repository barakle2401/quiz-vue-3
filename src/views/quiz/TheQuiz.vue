<script>
import httpUtil from "@/utils/httpUtil.js";
import { convertSymbols } from "@/utils/stringUtil.js";
import { onMounted, ref, computed } from "@vue/runtime-core";
import QuestionItem from "@/components/quiz/QuestionItem.vue";
import { useRouter } from "vue-router";
const questions = ref([]);
const correctAnswers = ref(0);
const currentQuestionIndex = ref(0);
const currentQuestion = ref(null);
const dataFetched = ref(false);

const currentOptions = computed(() => {
  return [
    ...currentQuestion.value.incorrect_answers.map((a) => convertSymbols(a)),
    convertSymbols(currentQuestion.value.correct_answer),
  ].sort(() => 0.5 - Math.random());
});

const getQuestions = () => {
  httpUtil.getRequest("https://opentdb.com/api.php?amount=10").then((res) => {
    questions.value = res.results;
    currentQuestion.value = res.results[currentQuestionIndex.value++];
  });
};

const quizIsOver = computed(() => {
  return totalQuestions.value === currentQuestionIndex.value;
});

const totalQuestions = computed(() => {
  return questions.value.length;
});
export default {
  components: {
    QuestionItem,
  },
  setup() {
    const router = useRouter();
    onMounted(() => {
      if (totalQuestions.value === 0) getQuestions();
    });
    const handleSelect = (option) => {
      if (quizIsOver.value)
        router
          .push({
            name: "TheScore",
            params: {
              score: correctAnswers.value,
              totalQuestions: totalQuestions.value,
            },
          })
          .catch((e) => console.log(e));
      if (option === currentQuestion.value.correct_answer)
        correctAnswers.value++;
      currentQuestion.value = questions.value[currentQuestionIndex.value++];
    };
    return {
      currentQuestion,
      currentOptions,
      correctAnswers,
      convertSymbols,
      totalQuestions,
      dataFetched,
      quizIsOver,
      router,
      handleSelect,
    };
  },
  computed,
};
</script>
<template lang="">
  <div class="min-h-screen flex items-center justify-center flex-col">
    <QuestionItem
      v-if="currentQuestion"
      :category="currentQuestion.category"
      :question="convertSymbols(currentQuestion.question)"
      :options-answers="currentOptions"
      @select="handleSelect"
    />
    <h1 v-else class="text-white animate-pulse text-lg">Loading...</h1>
  </div>
</template>
<style lang="scss"></style>
