<template>
  <div class="app-wrapper">
    <!-- Header for the 'app' -->
    <header class="app-bar">
      <button id="menuToggle" class="app-bar-button menu-toggle menu-is-closed"><i
          class="fa fa-bars"></i></button>
      <h1 id="appHeadline" class="app-headline">All contacts</h1>
      <button @click="showAddContactForm" class="add-contact cursor-pointer">
        <span v-if="!showForm">Add contact</span>
        <span v-else>Hide form</span>
        </button>
      <button id="sortToggle" class="app-bar-button sort-toggle"><i
          class="fa fa-sort-alpha-asc"></i></button>
    </header>
    <!-- END 'app' Header -->

    <!-- Table of contacts -->
    <div class="app-body"
    style="background-image: linear-gradient(rgb(252, 208, 196) 0%, rgb(255, 255, 255) 100%);
    overflow: auto;">

      <table id="contactList" class="contact-list">
        <tbody>
          <tr class="contact" v-for="contact in contacts"
          :key="contact">
          <router-link class="contact-link" :to="{ name: 'contact', params: { id: contact.id } }">
            <td class="contact-image">
              <div v-bind:style="{ backgroundColor: contact.color}"></div>
            </td>
            <td class="contact-name">
              <span class="first-name">{{ contact.name }} {{ contact.lastName }}</span></td>
              </router-link>
          </tr>
        </tbody>
      </table>
      <!-- END List of contacts -->
  <form
  v-show="showForm"
  class="interaction"
  :validation-schema="schema"
  novalidate="true"
  :class="{ visible: smoothPopUp }">
    <div class="form-in">
    <h3 class="center-text">Add contact</h3>
      <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </p>
      <div v-for="(input, index) in contactInfo"
         :key="index"
          class="input-button-row"
        >
        <div class="small-inputs-container">
    <input v-model="input.propertyName"
               type="text"
               class="h-10 rounded-lg outline-none p-2 input-field-small
               "
               placeholder="Enter Property name"
          />
    <input v-model="input.value"
               type="text"
               class="h-10 rounded-lg outline-none p-2 input-field-small
               "
               placeholder=" Enter Property Value"
          />
          </div>
          <div class="button-wrapper">
          <button @click.prevent="addField(input, contactInfo)"><i class="fas fa-plus"></i></button>
          <button  v-show="contactInfo.length > 1"
            @click="removeField(index, contactInfo)"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="static-inputs-container">
        <input v-model="contactsStatic.name"
        class="input-field" type="text" placeholder="Name" name="name"/>
        <input v-model="contactsStatic.lastName" class="input-field" name="last_name"
        type="text" placeholder="Last name"/>
        <input v-model="contactsStatic.tel" class="input-field" type="tel"
        name="mobile_phone" placeholder="Мобильный телефон"/>
      </div>
      <button @click.prevent="submit" type="submit">SUBMIT</button>
      </div>
</form>
    </div>
  </div>
</template>

<script>
import { contactsCollectionD } from '@/includes/firebase';

export default {
  name: 'Home',
  components: {
    // AppContactItem,
  },
  data() {
    return {
      contacts: [],
      contact: {},
      schema: {
        name: 'required|min:3|max:100',
        last_name: 'required|min:3|max:100',
        comment: 'required|min:3|max:100',
        email: 'required|min:3|max:100|email',
        mobile_phone: 'required',
        home_phone: 'required',
        address: 'required',
      },
      errors: [],
      contactInfo: [{ propertyName: '' }],
      contactsStatic: {
        name: '',
        lastName: '',
        tel: '',
        color: '',
      },
      showForm: false,
      smoothPopUp: false,
    };
  },
  async created() {
    this.getContacts();
  },
  methods: {
    async getContacts() {
      const snapshot = await contactsCollectionD.get();
      this.contacts = [];
      snapshot.forEach((doc) => [
        this.contacts.push({
          ...doc.data(),
          id: doc.id,
        }),
        // console.log(this.contacts),
      ]);
    },
    async addContact(values, { resetForm }) {
      const contact = {
        name: values.name,
        last_name: values.last_name,
        comment: values.comment,
        email: values.email,
        mobile_phone: values.email,
        home_phone: values.home_phone,
        address: values.address,
      };
      await contactsCollectionD.add(contact);
      resetForm();
      this.getContacts();
    },
    async submit() {
      if (this.checkForm()) {
        console.log('test');
        this.contactsStatic.dynamicFields = this.contactInfo;
        this.contactsStatic.color = `rgb(${Array(3).fill().map(() => this.getRandomNumber(0, 255))})`;
        console.log(this.contactsStatic);
        await contactsCollectionD.add(this.contactsStatic);
        this.getContacts();
      }
    },
    addField(value, contactInfo) {
      contactInfo.push({});
    },
    removeField(index, type) {
      type.splice(index, 1);
    },
    getRandomNumber(min, max) {
      const ceilMin = Math.ceil(min);
      const floorMax = Math.floor(max);
      return Math.floor(Math.random() * (floorMax - ceilMin + 1)) + ceilMin;
    },
    showAddContactForm() {
      this.showForm = !this.showForm;
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.smoothPopUp = !this.smoothPopUp, 200);
    },
    checkForm() {
      this.errors = [];

      if (!this.contactsStatic.name) {
        this.errors.push('Name required.');
      }
      if (!this.contactsStatic.lastName) {
        this.errors.push('Last name required.');
      }
      if (!this.contactsStatic.tel) {
        this.errors.push('Telephone number required.');
      }
      if (this.errors.length) {
        return false;
      }

      return true;
    },
  },
};
</script>
<style scoped>
.visible {
  opacity: 1;
  -webkit-transform: translateY(0);
  transform: translateY(0);
}
</style>
