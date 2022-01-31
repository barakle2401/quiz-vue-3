<script>
import httpUtil from "@/utils/httpUtil.js";
import { convertSymbols } from "@/utils/stringUtil.js";
import { onMounted, ref, computed } from "@vue/runtime-core";
import QuestionItem from "@/components/quiz/QuestionItem.vue";
import { useRouter } from "vue-router";
const OPEN_TDB_API = "https://opentdb.com/api.php?amount=10";

export default {
  components: {
    QuestionItem,
  },
  setup() {
    const questions = ref([]);
    const correctAnswers = ref(0);
    const currentQuestionIndex = ref(0);
    const currentQuestion = ref(null);
    const router = useRouter();

    onMounted(() => {
      getQuestions(OPEN_TDB_API).then((res) => {
        questions.value = res.results;
        currentQuestion.value = res.results[currentQuestionIndex.value];
      });
    });
    const currentOptions = computed(() => {
      return [
        ...currentQuestion.value.incorrect_answers.map((a) =>
          convertSymbols(a)
        ),
        convertSymbols(currentQuestion.value.correct_answer),
      ].sort(() => 0.5 - Math.random());
    });

    const getQuestions = (api) => {
      return httpUtil.getRequest(api);
    };

    const quizIsOver = computed(() => {
      return totalQuestions.value === currentQuestionIndex.value;
    });

    const totalQuestions = computed(() => {
      return questions.value.length;
    });

    const handleSelect = (option) => {
      if (option === currentQuestion.value.correct_answer) {
        correctAnswers.value++;
      }

      currentQuestion.value = questions.value[++currentQuestionIndex.value];
      if (quizIsOver.value) {
        router
          .push({
            name: "TheScore",
            params: {
              score: correctAnswers.value,
              totalQuestions: totalQuestions.value,
            },
          })
          .catch((e) => console.log(e));
      }
    };

    return {
      currentQuestion,
      currentOptions,
      convertSymbols,
      handleSelect,
    };
  },
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
