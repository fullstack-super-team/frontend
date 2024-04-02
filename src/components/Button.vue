<script>
export default {
  name: 'MyButton',
  props: {
    btnClass: {
      type: String,
      default: 'btn-default', // A default class you can override
    },
  },
  methods: {
    clickHandler() {
      this.$emit('click'); // Emits the click event to the parent
    },
  },
};
</script>

<template>
  <button :class="btnClass" @click="clickHandler">
    <slot></slot> <!-- This allows for custom button text -->
  </button>
</template>

<style scoped>
.btn-default {
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>