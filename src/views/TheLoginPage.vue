<template>
  <div class="login-page-wrapper">
    <a-card title="Person recognition system">
      <a-form
          :form="form"
          class="login-form"
          @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
              v-decorator="username"
              placeholder="enter username"
          >
            <a-icon slot="prefix" class="input-icon" type="user"/>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
              v-decorator="password"
              placeholder="enter password"
              type="password"
          >
            <a-icon slot="prefix" class="input-icon" type="lock"/>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-button class="login-form-button" html-type="submit" type="primary">
            Login
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>

import {LOGIN} from "@/store/user.module";

export default {
  name: 'TheLoginPage',
  data() {
    return {
      form: this.$form.createForm(this),
      username: ['username', {rules: [{required: true}]}],
      password: ['password', {rules: [{required: true}]}],
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((errors, fields) => {
        if (!errors) {
          this.$store.dispatch(LOGIN, fields);
        }
      });
    },
  },
};
</script>

<style scoped>
.login-page-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    width: 25rem;
 }
    
 .login-form-button {
    width: 100%;
 }
 
 .input-icon {
    color: rgba(0, 0, 0, 0.25);
  }
</style>
