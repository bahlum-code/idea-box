<template>
  <!-- Add Idea -->
  <section class="mb-6">
    <form @submit.prevent="addIdea" class="sm:flex">
      <input
        type="text"
        v-model="idea"
        placeholder="Add your idea"
        class="w-full p-3 sm:flex-auto"
      />
      <input
        v-if="user"
        type="submit"
        value="Add idea"
        class="w-full p-2 text-white bg-gray-600 sm:flex-1"
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
</template>

<script>
import { ref } from "vue";

export default {
  name: "AddIdea",
  props: {
    user: {
      type: [Object, null],
    },
  },
  emits: ["do-login", "do-logout", "add-idea"],
  setup(props, { emit }) {
    const idea = ref("");
    const doLogin = () => emit("do-login");
    const doLogout = () => emit("do-logout");
    const addIdea = () => {
      emit("add-idea", idea);
      idea.value = "";
    };

    return {
      doLogin,
      doLogout,
      idea,
      addIdea,
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
