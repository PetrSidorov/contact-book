<template>
  <div class="app-wrapper">
    <!-- Header for the 'app' -->
    <header class="app-bar">
      <button class="app-bar-button menu-toggle menu-is-closed cursor-pointer"
      @click="this.$router.push({
        name: 'home',
      });" ><i
          class="fa fa-arrow-left"></i></button>
      <h1 id="appHeadline" class="app-headline">All Contacts</h1>
      <button id="sortToggle" class="app-bar-button sort-toggle"><i
          class="fa fa-sort-alpha-asc"></i></button>
    </header>
    <!-- END 'app' Header -->
    <!-- Table of contacts -->
    <div class="app-body app-body-contact"
    :style="{ backgroundImage: getColor}"
    >
      <table id="contactInfo" :class="{ visible: updated }" class="contact-info">
        <tbody>
          <tr id="contactUsername" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-comment"></i></td>
            <td class="contact-info-detail">
              <p v-if="!isEditing">{{ contact.name }}
              {{ contact.lastName  }}</p>
              <template v-else>
              <input v-model="contact.name" type="text"/>
              <input v-model="contact.lastName" type="text"/>
              </template>
              </td>
          </tr>
          <tr id="contactHomeNumber" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-phone"></i></td>
            <td class="contact-info-detail">
              <p v-if="!isEditing">
                <a class="phone-link" v-bind:href="'tel:' + contact.tel">{{ contact.tel }}</a></p>
              <input v-else v-model="contact.tel" type="text"/>
              </td>
          </tr>
            <template v-for="(field, i) in dynamicFields" :key="i">
           <tr id="contactEmail" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-info-circle"></i></td>
            <td class="contact-info-detail">
              <p v-if="!isEditing">{{ dynamicFields[i].propertyName }}:
            {{ dynamicFields[i].value }}</p>
            <template v-else>
              <input v-model="dynamicFields[i].propertyName" type="text"/>
              <input v-model="dynamicFields[i].value" type="text"/>
            </template>
            </td>
          </tr>
          </template>
          <template v-if="showNewInput">
           <template addingValue v-for="(input, i) in newContactFields" :key="i">
           <tr id="contactEmail" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-info-circle"></i></td>
            <td class="contact-info-detail">
              <!-- <p v-if="!isEditing">{{ dynamicFields[i].propertyName }}:
            {{ dynamicFields[i].value }}</p> -->
            <!-- <template v-else> -->
              <input  placeholder="Enter Property Name" v-model="input.propertyName" type="text"/>
              <input placeholder="Enter Property Value" v-model="input.value" type="text"/>
            </td>
          </tr>
          </template>
          </template>
           <tr id="edit" class="contact-info-item">
            <td @click.stop="edit" class="contact-info-icon"><i class="fas fa-edit"></i></td>
            <td class="contact-info-detail cursor-pointer">
              <p v-if="!isEditing">Edit contact</p>
              <p @click="submitChanges" v-else>Save changes</p>
              </td>
              <template v-if="isEditing">
              <td class="contact-info-icon" @click.prevent="addField(input, newContactFields)">
                <i class="fas fa-plus"></i></td>
              <td class="contact-info-detail cursor-pointer">
              <p>Add field</p>
              </td>
               <td class="contact-info-icon" @click="removeField(index, newContactFields)">
                <i class="fas fa-window-close"></i></td>
              <td class="contact-info-detail cursor-pointer">
              <p>Delete field</p>
              </td>
              </template>
          </tr>
          <tr @click="togglePopUp"  id="edit" class="contact-info-item">
            <td class="contact-info-icon"><i class="fas fa-user-slash"></i></td>
            <td class="contact-info-detail cursor-pointer">
              <p>Delete contact</p>
              </td>
          </tr>
        </tbody>
      </table>
      <!-- End Contact Info (Details) -->
      <div class="interaction"
      :class="{ visible: smoothPopUp }">
        <p v-if="!deleted"
        class="center-text delete-text">Are you sure you want to delete this contact?</p>
        <p class="center-text delete-text" v-else>This contact was removed</p>
        <div v-if="!deleted" class="delete-confirm">
          <button
          :style="{ background: this.contact.color}"
          @click="deleteContact">
          Yes
          </button>
          <button
          :style="{ background: this.contact.color}"
          @click="togglePopUp">
          No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { contactsCollectionD } from '@/includes/firebase';

export default {
  name: 'Contact',
  data() {
    return {
      contact: {},
      dynamicFields: [],
      isEditing: false,
      updated: false,
      showDeletePopUp: false,
      smoothPopUp: false,
      deleted: false,
      newContactFields: [{ propertyName: '' }],
      showNewInput: 0,
      lastFieldIndex: 0,
    };
  },
  computed: {
    getColor() {
      return `linear-gradient(${this.contact.color} 0%, rgb(255, 255, 255) 100%)`;
    },
  },
  updated() {
    this.updated = true;
  },
  async created() {
    const docSnapshot = await contactsCollectionD.doc(this.$route.params.id).get();
    if (!docSnapshot.exists) {
      this.$router.push({
        name: 'home',
      });
      return;
    }
    this.contact = docSnapshot.data();
    this.dynamicFields = this.contact.dynamicFields;
    this.lastFieldIndex = this.dynamicFields.length - 1;
  },
  methods: {
    edit() {
      this.isEditing = !this.isEditing;
    },
    async submitChanges() {
      console.log('submit test');
      const docRef = await contactsCollectionD.doc(this.$route.params.id);
      docRef.update(this.contact);
    },
    togglePopUp() {
      this.showDeletePopUp = !this.showDeletePopUp;
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.smoothPopUp = !this.smoothPopUp, 200);
    },
    async deleteContact() {
      const docRef = await contactsCollectionD.doc(this.$route.params.id);
      docRef.delete();
      this.deleted = true;
      setTimeout(() => this.$router.push({
        name: 'home',
      }), 3000);
    },
    addField(value, newContactFields) {
      if (this.showNewInput === 0) {
        this.showNewInput += 1;
        // eslint-disable-next-line no-useless-return
        return;
      }
      newContactFields.push({});
    },
    async removeField(index, type) {
      if (this.newContactFields.length > 0) {
        type.splice(index, 1);
      } else {
        // console.log(this.contact.dynamicFields[this.lastFieldIndex]);
        // const docRef = await contactsCollectionD.doc(this.$route.params.id);
        // docRef.update({
        //   dynamicFields: firebase.firestore.FieldValue.arrayRemove(this.lastFieldIndex),
        // });
        this.contact.dynamicFields.splice(this.lastFieldIndex, 1);
        this.lastFieldIndex -= 1;
      }
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
