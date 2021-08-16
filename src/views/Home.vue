<template>
  <div class="app-wrapper">
    <!-- Header for the 'app' -->
    <header class="app-bar">
      <button id="menuToggle" class="app-bar-button menu-toggle menu-is-closed"><i
          class="fa fa-bars"></i></button>
      <h1 id="appHeadline" class="app-headline">Все контакты</h1>
      <button id="sortToggle" class="app-bar-button sort-toggle"><i
          class="fa fa-sort-alpha-asc"></i></button>
    </header>
    <!-- END 'app' Header -->

    <!-- Table of contacts -->
    <div class="app-body"
    style="background-image: linear-gradient(rgb(252, 208, 196) 0%, rgb(255, 255, 255) 100%);
    overflow: auto;">
      <!-- List of contacts, these are built dynamicly by javascript on page load -->
      <table id="contactList" class="contact-list">
        <tbody>
          <!-- <contact-item v-for="contact in contacts"
          :key="contact" :contact="contact"/> -->
          <tr class="contact" v-for="contact in contacts"
          :key="contact">
          <router-link :to="{ name: 'contact', params: { id: contact.id } }">
            <td class="contact-image">
              <div data-image-color="#fcd0c4" style="background-color: rgb(252, 208, 196);"></div>
            </td>
            <td class="contact-name">
              <span class="first-name">{{ contact.info[0].name }}
                {{ contact.info[0].lastName }}</span>
            </td>
            <!-- <td class="contact-name">
              <span class="first-name">{{ contact.info[0].propertyName }}: </span>
              <span class="first-name">{{ contact.info[0].value }}</span>
                </td> -->
              </router-link>
          </tr>
        </tbody>
        <!-- <tbody>
          <tr class="contact" style="">
            <td class="contact-image">
              <div data-image-color="#fcd0c4" style="background-color: rgb(252, 208, 196);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Micheal</span> <span
                class="last-name">Carswell</span></td>
          </tr>
          <tr class="contact" style="">
            <td class="contact-image">
              <div data-image-color="#71fc76" style="background-color: rgb(113, 252, 118);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Jed</span> <span
                class="last-name">Cherry</span></td>
          </tr>
          <tr class="contact" style="">
            <td class="contact-image">
              <div data-image-color="#ffadf2" style="background-color: rgb(255, 173, 242);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Freddie</span> <span
                class="last-name">Crimmins</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#ecf998" style="background-color: rgb(236, 249, 152);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Dimple</span> <span
                class="last-name">Deloatch</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#fcbde9" style="background-color: rgb(252, 189, 233);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Tomas</span> <span
                class="last-name">Duhn</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#ea7bf7" style="background-color: rgb(234, 123, 247);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Coralee</span> <span
                class="last-name">Earheart</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#72eade" style="background-color: rgb(114, 234, 222);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Solomon</span> <span
                class="last-name">Magruder</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#cfaef9" style="background-color: rgb(207, 174, 249);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Antionette</span> <span
                class="last-name">May</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#ae9aed" style="background-color: rgb(174, 154, 237);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Illa</span> <span
                class="last-name">Schwindt</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#adf7f2" style="background-color: rgb(173, 247, 242);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Jesica</span> <span
                class="last-name">Utt</span></td>
          </tr>
        </tbody> -->
      </table>
      <!-- END List of contacts -->
<div>
  <form id="contact" :validation-schema="schema" v-on:submit.prevent="submit">
    <h3>Добавить контакт</h3>
      <div v-for="(input, index) in contactInfo"
         :key="`phoneInput-${index}`"
          class="input wrapper flex items-center"
        >
        <div class="small-inputs-container">
    <input v-model="input.propertyName"
               type="text"
               class="input-field-small"
               placeholder=" Enter Phone Number"
          />
    <input v-model="input.value"
               type="text"
               class="h-10 rounded-lg outline-none p-2"
               placeholder=" Enter Phone Number"
          />
          </div>
          <!--          Add Svg Icon-->
          <svg @click="addField(input, contactInfo)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path fill="green"
              d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2
              12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>
          <svg
            v-show="contactInfo.length > 1"
            @click="removeField(index, contactInfo)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="#EC4899"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2
              12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8
              8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12
              13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
            />
          </svg>
          </div>
      <div v-for="(input, index) in contactStatic"
         :key="index">
        <input v-model="input.name" class="input-field" type="text" placeholder="Имя"/>
        <input v-model="input.lastName" class="input-field" type="text" placeholder="Фамилия"/>
        <input v-model="input.tel" class="input-field" type="tel"
        name="mobile_phone" placeholder="Мобильный телефон"/>
      </div>
      <button name="submit" type="submit">SUBMIT</button>
      <!--
      <vee-field class="input-field" type="email"  name="email" placeholder="Email"/>
      <ErrorMessage class="text-red-600" name="email"/>
      <vee-field class="input-field" type="tel" name="home_phone" placeholder="Домашний телефон"/>
      <ErrorMessage class="text-red-600" name="home_phone"/>
      <vee-field class="input-field" type="text" name="address" placeholder="Адрес"/>
      <ErrorMessage class="text-red-600" name="address"/>
      <vee-field class="input-field" as="textarea"
      name="comment"  placeholder="Комментарий"></vee-field>
      <ErrorMessage class="text-red-600" name="comment"/> -->
      <!-- <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">
        Submit</button> -->
  </form>
</div>
    </div>
  </div>
</template>

<script>
// import { AppContactItem } from '@/components/ContactItem.vue';
import { contactsCollection, contactsCollectionD } from '@/includes/firebase';

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
      contactInfo: [{ propertyName: '' }],
      contactStatic: [{}],
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
        // console.log(this.contacts[0]),
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
      await contactsCollection.add(contact);
      resetForm();
      this.getContacts();
    },
    async submit(e) {
      e.preventDefault();
      // console.log(this.contactInfo);
      // console.log(this.contactStatic);
      const contactResult = [].concat(this.contactStatic, this.contactInfo);
      console.log(contactResult);
      const contact = {
        info: contactResult,
      };
      await contactsCollectionD.add(contact);
      // resetForm();
      this.getContacts();
    },
    addField(value, contactInfo) {
      contactInfo.push({});
    },
    removeField(index, type) {
      type.splice(index, 1);
    },
  },
};
</script>
