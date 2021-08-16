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

      <!-- List of contacts, these are built dynamicly by javascript on page load -->
      <table id="contactList" class="contact-list">
        <tbody>
          <tr class="contact selected-contact" style="transform: translateY(107px);">
            <td class="contact-image">
              <div data-image-color="#e6ef86" style="background-color: rgb(230, 239, 134);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Micheal</span> <span
                class="last-name">Carswell</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#91f2ea" style="background-color: rgb(145, 242, 234);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Jed</span> <span
                class="last-name">Cherry</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#9aede8" style="background-color: rgb(154, 237, 232);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Freddie</span> <span
                class="last-name">Crimmins</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#ddf28c" style="background-color: rgb(221, 242, 140);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Dimple</span> <span
                class="last-name">Deloatch</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#7fffc5" style="background-color: rgb(127, 255, 197);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Tomas</span> <span
                class="last-name">Duhn</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#ccfc8d" style="background-color: rgb(204, 252, 141);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Coralee</span> <span
                class="last-name">Earheart</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#ffb7f0" style="background-color: rgb(255, 183, 240);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Solomon</span> <span
                class="last-name">Magruder</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#708df4" style="background-color: rgb(112, 141, 244);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Antionette</span> <span
                class="last-name">May</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#f7e56f" style="background-color: rgb(247, 229, 111);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Illa</span> <span
                class="last-name">Schwindt</span></td>
          </tr>
          <tr class="contact">
            <td class="contact-image">
              <div data-image-color="#90f77e" style="background-color: rgb(144, 247, 126);"></div>
            </td>
            <td class="contact-name"><span class="first-name">Jesica</span> <span
                class="last-name">Utt</span></td>
          </tr>
        </tbody>
      </table>
      <!-- END List of contacts -->

      <!-- Contact Info (Details), hidden by default, visible when a contact is selected -->
      <!-- This info is not contact item specific so it is not loaded dynamically -->
      <table id="contactInfo" class="contact-info visible">
        <tbody>
          <tr id="contactUsername" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-comment-o"></i></td>
            <td class="contact-info-detail">joedoe</td>
          </tr>
          <tr id="contactEmail" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-envelope-o"></i></td>
            <td class="contact-info-detail">john.smith@email.com</td>
          </tr>
          <tr id="contactHomeNumber" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-phone"></i></td>
            <td class="contact-info-detail">(555) 987-1234</td>
          </tr>
          <tr id="contactWorkNumber" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-building-o"></i></td>
            <td class="contact-info-detail">(555) 987-1234</td>
          </tr>
          <tr id="contactAddress" class="contact-info-item">
            <td class="contact-info-icon"><i class="fa fa-home"></i></td>
            <td class="contact-info-detail">123 Elm Street</td>
          </tr>
        </tbody>
      </table>
      <!-- End Contact Info (Details) -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>
