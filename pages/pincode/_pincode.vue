<template>
  <div>
    <TheNavBar />
    <b-container>
      <b-breadcrumb :items="breadcrumb_items" class="my-2 py-3" />
      <div class="row">
        <div class="col-md-8">
            <h1>Pincode - {{ pincode }}</h1>
            <div class="bd-example bg-light" style="padding: 1rem; border-width: .2rem;">
            <blockquote class="blockquote">
            <p>The Pincode {{ pincode }} is located in district <strong>{{ districtName }}</strong> of <strong>{{ stateName }}</strong> state.</p>
            </blockquote>
            </div>
            <br>
            <table class="table table-bordered mtb20 bg-white table-striped rounded shadow-sm">
            <tbody><tr>
            <td class="w-25"><strong>Pincode</strong></td>
            <td><NuxtLink :to="{ name: 'pincode-pincode', params: { pincode: this.pincode } }">{{ pincode }}</NuxtLink></td>
            </tr>
            <tr>
            <td class="w-25"><strong>District</strong></td>
            <td> <NuxtLink :to="{ name: 'subdistricts-state-district', params:  { state: this.stateSlug , district: this.districtSlug } }">{{ districtName }}</NuxtLink></td>
            </tr>
            <tr>
            <td class="w-25"><strong>State</strong></td>
            <td><NuxtLink :to="{ name: 'districts-stateid', params: { stateid: this.stateSlug }}">{{ stateName }}</NuxtLink></td>
            </tr>
            </tbody></table>
            <br>
            <h2>Data Information for Pincode {{ pincode }}</h2>
            <table class="table  table-hover bg-white table-striped rounded shadow-sm">
            <thead>
            <tr>
            <th scope="col">State</th>
            <th scope="col">District</th>
            <th scope="col">Post Office</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>{{ stateName }}</td>
            <td>{{ districtName }}</td>
            <td>{{ postOffice }}</td>
            </tr>
            </tbody>
            </table>
            <br>
            <h2>Localities with pincode {{ pincode }}</h2>
            <div class="table-responsive">
                <b-table striped hover :fields="fields" :items="table_content" >
                    <template #cell(district)="data">
                    <!-- `data.value` is the value after formatted by the Formatter -->
                    <NuxtLink :to="{ name: 'subdistricts-state-district', params: { state: data.value.stateslug , district: data.value.dslug }}">{{ data.value.dname }}</NuxtLink>
                    </template>
                </b-table>
            </div>
            </div>
                <AboutPincode :pincode="pincode" />
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
      title: this.pincode + ' Pin code information, Post Offices - ' + this.postOffice + ' in ' + this.districtName + ', ' + this.stateName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'List of locations and post offices with Pin code ' + this.pincode + ' in ' + this.districtName + ', ' + this.stateName
        }
      ]
    }
  },
  async asyncData ({ $axios, params }) {
    const regions = await $axios.$get(`/pincode/${params.pincode}`)
    const regioninfo = { StateName: regions[0].StateName, StateSlug: regions[0].StateSlug, DistrictName: regions[0].DistrictName, DistrictSlug: regions[0].DistrictSlug, postOffice: regions[0].OfficeName }
    return { regions, regioninfo }
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
          key: 'subdistname',
          label: 'Sub District'
        },
        {
          key: 'location'
        },
        {
          key: 'OfficeName',
          label: 'Post Office Name'
        }
      ]
    }
  },
  computed: {
    table_content () {
      return this.regions.map((d, index) => {
        let location = d.locality_detail1
        if (d.locality_detail2 !== 'NA') {
          location += ', ' + d.locality_detail2
        }
        if (d.locality_detail3 !== 'NA') {
          location += ', ' + d.locality_detail3
        }
        return {
          no: index + 1,
          subdistname: d.subdistname,
          location,
          OfficeName: d.OfficeName
        }
      })
    },
    breadcrumb_items () {
      return [
        { text: 'Home', to: { name: 'index' } },
        { text: this.stateName, to: { name: 'districts-stateid', params: { stateid: this.stateSlug } } },
        { text: this.districtName, to: { name: 'subdistricts-state-district', params: { state: this.stateSlug, district: this.districtSlug } } },
        { text: 'PINCODE ' + this.pincode }
      ]
    },
    stateName () {
      return this.regioninfo.StateName || ''
    },
    stateSlug () {
      return this.regioninfo.StateSlug || ''
    },
    districtName () {
      return this.regioninfo.DistrictName || ''
    },
    districtSlug () {
      return this.regioninfo.DistrictSlug || ''
    },
    pincode () {
      return this.$route.params.pincode
    },
    postOffice () {
      return this.regioninfo.postOffice
    }
  }

}
</script>
<style scope>
    .mapouter{ position:relative;text-align:right;height:500px;width:300px; }
    .gmap_canvas { overflow:hidden;background:none!important;height:500px;width:300px; }
</style>
