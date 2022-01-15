<template>
  <!-- Main container -->
  <div class="container p-4 mx-auto">
    <!-- Main box -->
    <div class="w-full p-4 bg-gray-100 rounded shadow-lg">
      <h1 class="mb-5 text-4xl text-center">IdeaBox</h1>
      <!-- Add Idea -->
      <AddIdea
        @do-login="doLogin"
        @do-logout="doLogout"
        @add-idea="addIdea"
        :user="user"
      />
      <!-- /.Add Idea -->
      <AppIdea
        v-for="(idea, $index) in ideas"
        :key="$index"
        :idea="idea"
        @vote-idea="voteIdea"
      />
    </div>
    <!-- /.Main box -->
  </div>
  <!-- /.Main container -->
</template>

<script>
import AppIdea from "@/components/AppIdea";
import AddIdea from "@/components/AddIdea";
import { ref } from "vue";
import { auth, db, firebase } from "@/firebase.js";

export default {
  components: {
    AppIdea,
    AddIdea,
  },
  setup() {
    const ideas = ref([]);
    let user = ref(null);

    auth.onAuthStateChanged(async (auth) => (user.value = auth ? auth : null));

    db.collection("ideas")
      .orderBy("votes", "desc")
      .onSnapshot(
        (snapshot) => {
          const newIdeas = [];

          snapshot.docs.forEach((doc) => {
            let { name, user, userName, votes } = doc.data();
            let id = doc.id;

            newIdeas.push({
              name,
              user,
              userName,
              votes,
              id,
            });
          });

          ideas.value = newIdeas;
        },
        (error) => console.error(error)
      );

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

    const voteIdea = async ({ id, type }) => {
      console.log("Type:", id);
      try {
        db.collection("ideas")
          .doc(id)
          .update({
            votes: firebase.firestore.FieldValue.increment(type ? 1 : -1),
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
      voteIdea,
    };
  },
};
</script>
