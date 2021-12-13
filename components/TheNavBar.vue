<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="py-3">
      <b-navbar-brand :to="{ name: 'index' }" class="mr-5">PINCODES</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'index' }">HOME</b-nav-item>
          <b-nav-item href="#">ABOUT</b-nav-item>
          <b-nav-item-dropdown id="menu_state_list" text="STATES">
            <b-dropdown-item
            v-for="state in statesList"
            :key="state.stateSlug"
            :to="{ name: 'districts-stateid',
            params: { stateid: state.stateSlug }}"
            >
            {{ state.stateName }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="#">INDIAN PINCODE SYSTEM</b-nav-item>
          <b-nav-item href="#">CONTACT</b-nav-item>
          <b-nav-item href="#">PRIVACY POLICY</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button
            >
          </b-nav-form>

        </b-navbar-nav> -->
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  computed: {
    statesList () {
      return this.$store.getters['pins/giveMeStateList']
    }
  },
  async fetch () {
    await this.$store.dispatch('pins/fetchAllStates')
  }
}
</script>
<style>
.dropdown-menu {
  min-width: 36rem !important;
}
#menu_state_list li {
  width: 275px;
  float: left;
}
</style>
