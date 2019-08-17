<template>
  <div class="page-form">
    <div class="columns">
      <div class="column is-half page-form__bg"></div>
      <div class="column is-half if-full-mobile page-form__form">
        <h1 class="title has-text-centered">Form Demo</h1>
        <Form />
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form.vue';

export default {
  name: 'PageForm',
  components: { Form },
};
</script>

<style scoped lang="less">
.page-form {
  &__bg {
    height: 100vh;
    background: url('../assets/form-bg.jpg') no-repeat right center;
    background-size: cover;

    @media (max-width: 768px) {
      display: none;
    }
  }
  &__form {
    padding-top: 60px;
    padding-bottom: 60px;
  }
}
</style>
