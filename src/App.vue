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
        :user="user"
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

    auth.onAuthStateChanged(async (auth) => {
      let userVotes;
      if (auth) {
        user.value = auth;
        userVotes = db
          .collection("votes")
          .doc(user.value.uid)
          .onSnapshot((doc) => {
            if (doc.exists) {
              let document = doc.data();
              if ("ideas" in document) {
                user.value.votes = document.ideas;
              }
            }
          });
      } else {
        user.value = null;
        userVotes && userVotes();
      }
    });

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
      try {
        await db
          .collection("ideas")
          .doc(id)
          .update({
            votes: firebase.firestore.FieldValue.increment(type ? 1 : -1),
          });
        await db
          .collection("votes")
          .doc(user.value.uid)
          .set(
            {
              ideas: firebase.firestore.FieldValue.arrayUnion(id),
            },
            { merge: true }
          );
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
