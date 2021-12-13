<template>
  <div>
    <TheNavBar />
    <b-container>
      <b-breadcrumb :items="breadcrumb_items" class="my-2 py-3" />

      <b-table striped hover :fields="fields" :items="table_content" >
        <template #cell(district)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <NuxtLink :to="{ name: 'subdistricts-state-district', params: { state: data.value.stateslug , district: data.value.dslug }}">{{ data.value.dname }}</NuxtLink>
      </template>
      </b-table>
    </b-container>
    <TheDisclaimer />
    <TheFooter />
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'District List of State - ' + this.stateName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'District list of ' + this.stateName
        }
      ]
    }
  },
  async asyncData ({ $axios, params }) {
    const regions = await $axios.$get(`/district/${params.stateid}`)
    const stateinfo = await $axios.$get(`/stateinfo/${params.stateid}`)
    return { regions, stateinfo }
  },
  data () {
    return {
      parameter: this.$route.params.stateid,
      fields: [
        {
          key: 'no',
          label: 'No.'
        },
        {
          key: 'district'
        },
        {
          key: 'state'
        },
        {
          key: 'sub_district'
        }
      ]
    }
  },
  computed: {
    table_content () {
      return this.regions.map((d, index) => {
        return {
          no: index + 1,
          district: { dname: d.districtName, dslug: d.districtSlug, stateslug: this.stateSlug },
          state: this.stateName,
          sub_district: d.subDistrictList.sort().join(' | ')
        }
      })
    },
    breadcrumb_items () {
      return [{ text: 'Home', to: { name: 'index' } }, { text: this.stateName, to: this.stateSlug }]
    },
    stateName () {
      return this.stateinfo ? this.stateinfo[0].StateName : ''
    },
    stateSlug () {
      return this.stateinfo ? this.stateinfo[0].StateSlug : ''
    }
  },
  fetchOnServer: true

}
</script>
