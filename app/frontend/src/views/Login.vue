<template>
  <div class="login-container">
    <form autocomplete="off" name="login-form" @submit.prevent="onSubmit">
      <div class="form-field">
        <input v-model="model.username" v-validate="'required'" name="username" type="text" placeholder="Username"/>
        <span class="field-error"><span v-show="errors.has('username')">Username is required</span></span>
      </div>
      <div class="form-field">
        <input v-model="model.password" v-validate="'required'" name="password" type="password" placeholder="Password"/>
        <span class="field-error"><span v-show="errors.has('password')">Password is required</span></span>
      </div>
      <div class="submit-error">
        <span v-show="errors.has('submit')" class="form-error">Invalid username or password</span>
      </div>
      <button :disabled="isSubmitBtnDisabled" type="submit">Login</button>
    </form>
    <div class="forgotten-password-link">
      <a href="#">Forgotten your password?</a>
    </div>
  </div>
</template>

<script>
import tokenService from '../config/tokenService';

export default {
  name: 'login',
  data() {
    return {
      model: {
        username: '',
        password: ''
      }
    };
  },
  computed: {
    isSubmitBtnDisabled() {
      return (
        this.errors.has('username') ||
        this.errors.has('password') ||
        !this.model.username ||
        !this.model.password
      );
    }
  },
  methods: {
    onSubmit() {
      const handleValidation = (isValid) => {
        return isValid ? this.$store.dispatch('LOGIN', this.model) : null;
      };

      const handleResponse = (token) => {
        if (token) {
          tokenService.setToken(token);
          tokenService.setAuthorizationHeader(token);
          this.$router.push({ name: 'home' });
        } else {
          this.errors.add({
            field: 'submit',
            msg: 'Invalid username or password'
          });
        }
      };

      this.$validator
        .validateAll()
        .then(handleValidation)
        .then(handleResponse)
        .catch((err) => {
          // eslint-disable-next-line
          console.log("Error. Form validation failed!", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;

  form[name="login-form"] {
    display: flex;
    flex-direction: column;
    width: 300px;
    z-index: 2;
  }

  .forgotten-password-link {
    margin-top: 15px;
    z-index: 2;

    a {
      font-size: 14px;
    }
  }
}
</style>
