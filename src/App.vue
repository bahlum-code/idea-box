<template>
  <!-- Main container -->
  <div class="container mx-auto p-4">
    <!-- Main box -->
    <div class="w-full bg-gray-100 shadow-lg p-4 rounded">
      <h1 class="mb-5 text-4xl text-center">IdeaBox</h1>
      <!-- Add Idea -->
      <AddIdea
        @do-login="doLogin"
        @do-logout="doLogout"
        @add-idea="addIdea"
        :user="user"
      />
      <!-- /.Add Idea -->
      <AppIdea v-for="(idea, $index) in ideas" :key="$index" :idea="idea" />
    </div>
    <!-- /.Main box -->
  </div>
  <!-- /.Main container -->
</template>

<script>
import AppIdea from "@/components/AppIdea";
import AddIdea from "@/components/AddIdea";
import seed from "./seed.json";
import { ref } from "vue";
import { auth, db, firebase } from "@/firebase.js";

export default {
  components: {
    AppIdea,
    AddIdea,
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

    const addIdea = async (data) => {
      try {
        await db.collection("ideas").add({
          name: data.value,
          user: user.value.uid,
          userName: user.value.displayName,
          votes: 0,
        });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      ideas,
      user,
      doLogin,
      doLogout,
      addIdea,
    };
  },
};
</script>
