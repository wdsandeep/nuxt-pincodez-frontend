<template>
  <div>
    <TheNavBar />
    <b-container>
      <div
        class="d-flex align-items-center p-3 my-1 text-white-50 bg-purple rounded shadow-sm"
      >
        <div class="lh-100">
          <h4 class="mb-0 text-white lh-100">
            Indian States
          </h4>
          <small>DISTRICTS</small>
        </div>
      </div>
      <div v-for="state in states" :key="state.stateSlug" class="my-1 p-3 bg-white rounded shadow-sm">
        <div class="media text-muted">
          <p
            class="media-body pb-1 mb-0 text-justify lead1 border-bottom border-gray"
          >
            <strong
              class="d-block text-gray-dark lead font-weight-bold"
            >
              <NuxtLink
                :to="{ name: 'districts-stateid',
                       params: { stateid: state.stateSlug }}"
              >{{ state.stateName }}
              </NuxtLink>
            </strong>
            <span
              v-for="(district, index) in state.districtList.sort()"
              :key="district"
            >
              <NuxtLink
                :to="{ name: 'subdistricts-state-district', params: { state: state.stateSlug, district: state.districtSlug.sort()[index] }}"
                class="text-secondary"
              >{{ district }}</NuxtLink>
              <span v-if="index < state.districtList.length - 1"> | </span>
            </span>
          </p>
        </div>
      </div>
    </b-container>
    <TheDisclaimer />
    <TheFooter />
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'India Pincode Search, Pin Code List by State, in Code List by locality, Pin codes of India, India Pincodez search made easy',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Largest Indian pin code search engine which provides information about India pin codes'
        }
      ]
    }
  },
  computed: {
    states () {
      return this.$store.getters['pins/giveMeStateList']
    }
  },
  fetchOnServer: true
}
</script>
<style>
.bg-purple {
  background-color: #6f42c1;
}
</style>
