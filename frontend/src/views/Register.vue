<template>
  <div class="register-container">
    <form autocomplete="off" name="register-form" @submit.prevent="onSubmit">
      <fieldset>
        <legend>Account details</legend>
        <div class="form-field">
          <input v-model="model.username" v-validate="'required'" name="username" type="text" placeholder="Username"/>
          <span class="field-error"><span v-show="errors.has('username')">Username is required</span></span>
        </div>
        <div class="form-field">
          <input v-model="model.password" v-validate="'required'" name="password" type="password" placeholder="Password"/>
          <span class="field-error"><span v-show="errors.has('password')">Password is required</span></span>
        </div>
      </fieldset>
      <fieldset>
        <legend>Personal details</legend>
        <div class="form-field">
          <input v-model="model.name.firstName" v-validate="'required'" name="firstName" type="text" placeholder="Firstname"/>
          <span class="field-error"><span v-show="errors.has('firstName')">Firstname is required</span></span>
        </div>
        <div class="form-field">
          <input v-model="model.name.lastName" v-validate="'required'" name="lastName" type="text" placeholder="Lastname"/>
          <span class="field-error"><span v-show="errors.has('lastName')">Lastname is required</span></span>
        </div>
      </fieldset>
      <div class="submit-error">
        <span v-show="submitError" class="form-error">Registration failed, try again.</span>
      </div>
      <button :disabled="disableSubmit" type="submit">Register</button>
    </form>
    <div class="registration-success">
      <span v-if="registrationSuccess">Registration was successful. You can now <router-link to="login">login</router-link>.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      model: {
        username: '',
        password: '',
        name: {
          firstName: '',
          lastName: ''
        }
      },
      submitError: false,
      registrationSuccess: false
    };
  },
  computed: {
    disableSubmit() {
      return !Object.keys(this.fields).some(key => this.fields[key].dirty);
    }
  },
  methods: {
    onSubmit() {
      const handleValidation = (isValid) => {
        return isValid ? this.$store.dispatch('REGISTER', this.model) : null;
      };

      const handleResponse = (response) => {
        if (response) {
          this.registrationSuccess = true;
        } else {
          this.submitError = true;
        }
      };

      this.$validator
        .validateAll()
        .then(handleValidation)
        .then(handleResponse)
        .catch((err) => {
          // eslint-disable-next-line
          console.log('Error. Form validation failed!', err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.register-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
}

form[name='register-form'] {
  display: flex;
  flex-direction: column;
  width: 300px;
  z-index: 2;
}

.registration-success {
  height: 22px;
  margin-top: 35px;
}
</style>
