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
            v-if="user"
            type="submit"
            value="Add idea"
            class="w-full p-2 bg-gray-600 text-white sm:flex-1"
          />
        </form>
        <p class="user-actions" v-if="!user">
          Please
          <a href="#" @click="doLogin">login</a>
          first
        </p>
        <p class="user-actions" v-else>
          Hi {{ user.displayName }}. <a href="#" @click="doLogout">Logout</a>
        </p>
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
import { auth, firebase } from "@/firebase.js";

export default {
  components: {
    AppIdea,
  },
  setup() {
    const ideas = ref(seed.ideas);
    let user = ref(null);

    auth.onAuthStateChanged(async (auth) => (user.value = auth ? auth : null));

    const doLogin = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        console.error(error);
      }
    };

    const doLogout = async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.error(error);
      }
    };

    return {
      ideas,
      user,
      doLogin,
      doLogout,
    };
  },
};
</script>

<style scoped>
.user-actions {
  @apply mt-2 text-center;
}

.user-actions a {
  @apply font-bold underline;
}
</style>
