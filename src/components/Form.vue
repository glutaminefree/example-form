<template>
  <form class="form">
    <b-field
      label="Full name"
      :type="fieldsTypes.fullName"
      :message="fieldMessages.fullName"
    >
      <b-input
        v-model="form.fullName"
        v-validate="'required'"
        name="fullName"
        placeholder="John Connor"
        icon="user"
        icon-pack="fa"
        size="is-medium"
      ></b-input>
    </b-field>
    <b-field
      label="Email"
      :type="fieldsTypes.email"
      :message="fieldMessages.email"
    >
      <b-input
        v-model="form.email"
        v-validate="'required|email'"
        name="email"
        placeholder="john-connor@example.com"
        icon="envelope"
        icon-pack="fa"
        size="is-medium"
      ></b-input>
    </b-field>
    <b-field
      label="Phone"
      :type="fieldsTypes.phone"
      :message="fieldMessages.phone"
    >
      <b-input
        v-model="form.phone"
        v-mask="'+7 999 999-99-99'"
        v-validate="{required: true, regex: /\+7 \d{3} \d{3}(-\d{2}){2}/}"
        name="phone"
        placeholder="+7 999 999-99-99"
        icon="phone-alt"
        icon-pack="fa"
        size="is-medium"
      ></b-input>
    </b-field>
    <b-field
      label="Address"
      :type="fieldsTypes.address"
      :message="fieldMessages.address"
    >
      <b-input
        v-model="form.address"
        name="address"
        v-validate="'required'"
        placeholder="200 E Main ST Phoenix AZ 85123"
        icon="map-marked-alt"
        icon-pack="fa"
        size="is-medium"
      ></b-input>
    </b-field>
    <b-field class="form__submit">
      <b-button
        :class="{'is-loading': submitInProgress, 'is-disabled': submitDisabled}"
        type="is-primary"
        size="is-medium"
        @click="sendForm"
      >Submit</b-button>
    </b-field>
  </form>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
      },

      submitTriggered: false,
      submitInProgress: false,
      submitDisabled: false,
    };
  },
  computed: {
    fieldsTouched() {
      const formFields = Object.keys(this.form);
      const fields = {};

      formFields.forEach((field) => {
        fields[field] = this.submitTriggered
          ? true
          : this.fields && this.fields[field] && this.fields[field].touched;
      });

      return fields;
    },
    fieldsTypes() {
      const formFields = Object.keys(this.form);
      const types = {};

      formFields.forEach((field) => {
        if (this.fieldsTouched[field]) {
          if (this.errors.has(field)) {
            types[field] = 'is-danger';
          } else if (this.form[field]) {
            types[field] = 'is-success';
          }
        } else {
          types[field] = '';
        }
      });

      return types;
    },
    fieldMessages() {
      const formFields = Object.keys(this.form);
      const messages = {};

      formFields.forEach((field) => {
        messages[field] = this.fieldsTouched[field] ? this.errors.first(field) : '';
      });

      return messages;
    },
  },
  methods: {
    sendForm() {
      if (this.submitDisabled) {
        return false;
      }

      this.submitInProgress = true;

      this.$validator.validateAll().then((result) => {
        this.submitTriggered = true;

        if (result) {
          this.$buefy.toast.open({
            message: 'Form is valid!',
            type: 'is-success',
            position: 'is-bottom',
          });

          setTimeout(() => {
            this.submitInProgress = false;
            this.submitDisabled = true;
          }, 800);
        } else {
          this.$buefy.toast.open({
            message: 'Form is not valid! Please check the fields.',
            type: 'is-danger',
            position: 'is-bottom'
          })

          setTimeout(() => {
            this.submitInProgress = false;
          }, 800);
        }
      });

      return true;
    },
  },
};
</script>

<style scoped lang="less">
.form {
  width: 420px;
  margin: 60px auto 0;

  @media (max-width: 480px) {
    width: 100%;
    padding: 0 15px;
  }

  &__submit {
    margin-top: 30px;
  }
}
</style>
