<template>
  <article class="p-3 mb-4 bg-gray-300 rounded-lg sm:flex sm:items-center">
    <!-- Info -->
    <section class="text-center sm:flex-1 sm:text-left">
      <h2 class="text-xl sm:leading-6 sm:text-2xl">
        {{ idea.name }}
      </h2>
      <small>{{ idea.userName }}</small>
    </section>
    <!-- /.Info -->
    <!-- Vote -->
    <section
      class="pt-3 mt-6 border-t-2 border-black sm:pt-0 sm:pl-3 sm:border-t-0 sm:border-l-2 sm:mt-0 sm:flex sm:items-center"
    >
      <h3 class="text-3xl font-bold text-center">{{ idea.votes }}</h3>
      <nav class="flex justify-center sm:block">
        <img
          @click="voteIdea(true)"
          class="w-10 cursor-pointer"
          src="@/assets/images/arrow.svg"
          alt="Vote Up"
        />
        <img
          @click="voteIdea(false)"
          class="w-10 cursor-pointer transform rotate-180"
          src="@/assets/images/arrow.svg"
          alt="Vote down"
        />
      </nav>
    </section>
    <!-- /.Vote -->
  </article>
</template>

<script>
export default {
  name: "AppIdea",
  props: {
    idea: {
      type: Object,
    },
  },
  emits: ["vote-idea"],
  setup(props, { emit }) {
    const voteIdea = (type) => emit("vote-idea", { type, id: props.idea.id });
    return {
      voteIdea,
    };
  },
};
</script>
