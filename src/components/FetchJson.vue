<script lang="ts">
  import { ref, defineComponent } from "vue";

  export default defineComponent({
    props: {
      url: {
        type: String,
        required: true,
      },
      headers: {
        type: Object,
        default: () => {},
      },
      method: {
        type: String,
        default: "GET",
      },
    },
    setup(props: any, ctx) {
      //ref replaced data
      const res = ref("");
      const loading = ref(true);
      fetch(props.url, {
        method: props.method,
        headers: props.headers,
      })
        .then((response) => response.json())
        .then((response) => {
          res.value = response;
          loading.value = false;
        });
      return () =>
        ctx.slots.default({ res: res.value, loading: loading.value });
    },
  });
</script>
