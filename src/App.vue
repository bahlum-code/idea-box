<template>
  <!-- Main container -->
  <div class="container mx-auto p-4">
    <!-- Main box -->
    <div class="w-full bg-gray-100 shadow-lg p-4 rounded">
      <h1 class="mb-5 text-4xl text-center">IdeaBox</h1>
      <!-- Add Idea -->
      <section class="mb-6">
        <form class="sm:flex">
          <input
            type="text"
            placeholder="Add your idea"
            class="w-full p-3 sm:flex-auto"
          />
          <input
            type="submit"
            value="Add idea"
            class="w-full p-2 bg-gray-600 text-white sm:flex-1"
          />
        </form>
      </section>
      <!-- /.Add Idea -->
      <AppIdea v-for="(idea, $index) in ideas" :key="$index" :idea="idea" />
    </div>
    <!-- /.Main box -->
  </div>
  <!-- /.Main container -->
</template>

<script>
import AppIdea from "@/components/AppIdea";
import seed from "./seed.json";
import { ref } from "vue";

export default {
  components: {
    AppIdea,
  },
  setup() {
    const ideas = ref(seed.ideas);

    return {
      ideas,
    };
  },
};
</script>
