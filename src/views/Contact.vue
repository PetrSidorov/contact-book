<template>
  <div class="app-wrapper">
    <!-- Header for the 'app' -->
    <header class="app-bar">
      <button id="menuToggle" class="app-bar-button menu-toggle menu-is-closed"><i
          class="fa fa-arrow-left"></i></button>
      <h1 id="appHeadline" class="app-headline">All Contacts</h1>
      <button id="sortToggle" class="app-bar-button sort-toggle"><i
          class="fa fa-sort-alpha-asc"></i></button>
    </header>
    <!-- END 'app' Header -->
    <!-- Table of contacts -->
    <div class="app-body"
      style="background-image: linear-gradient(rgb(230, 239, 134) 0%, rgb(255, 255, 255) 100%);
      background-position: 0px 0px; overflow: hidden;">
      <table id="contactInfo" class="contact-info visible">
        <tbody>
          <tr id="contactUsername" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-comment"></i></td>
            <td class="contact-info-detail">{{ contact.name }} {{ contact.last_name }}</td>
          </tr>
          <tr id="contactEmail" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-envelope"></i></td>
            <td class="contact-info-detail">{{ contact.email }}</td>
          </tr>
          <tr id="contactHomeNumber" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-phone"></i></td>
            <td class="contact-info-detail">{{ contact.mobile_phone }}</td>
          </tr>
          <tr id="contactWorkNumber" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-building"></i></td>
            <td class="contact-info-detail">{{ contact.home_phone }}</td>
          </tr>
          <tr id="contactAddress" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-home"></i></td>
            <td class="contact-info-detail">{{ contact.address }}</td>
          </tr>
           <tr id="contactAddress" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-home"></i></td>
            <td class="contact-info-detail">{{ contact.name }}</td>
          </tr>
        </tbody>
      </table>
      <!-- End Contact Info (Details) -->
    </div>
  </div>
</template>
<script>
import { contactsCollection } from '@/includes/firebase';

export default {
  name: 'Contact',
  data() {
    return {
      contact: {},
    };
  },
  async created() {
    const docSnapshot = await contactsCollection.doc(this.$route.params.id).get();
    if (!docSnapshot.exists) {
      this.$router.push({
        name: 'home',
      });
      return;
    }
    this.contact = docSnapshot.data();
    // this.getComments();
  },
};
</script>
