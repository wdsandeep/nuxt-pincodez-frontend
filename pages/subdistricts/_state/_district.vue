<template>
  <div>
    <TheNavBar />
    <b-container>
      <b-breadcrumb :items="breadcrumb_items" class="my-2 py-3" />

      <b-table striped hover :fields="fields" :items="table_content" >
        <template #cell(index)="data">
        <strong>{{ data.index + 1 }}</strong>
        </template>
        <template #cell(pincode)="data">
        <NuxtLink :to="{ name: 'pincode-pincode', params: { pincode: data.value }}">{{ data.value }}</NuxtLink>
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
      title: 'Sub District List of State - ' + this.stateName + '\'s district ' + this.districtName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Sub District List of State - ' + this.stateName + '\'s district ' + this.districtName
        }
      ]
    }
  },
  async asyncData ({ $axios, params }) {
    const subdistrict = await $axios.$get(`/subdistrict/${params.state}/${params.district}`)
    const subdistrictinfo = await $axios.$get(`/districtinfo/${params.state}/${params.district}`)
    return { subdistrict, subdistrictinfo }
  },
  data () {
    return {
      parameter: this.$route.params.stateid,
      fields: [
        {
          key: 'index',
          label: 'index'
        },
        {
          key: 'subdistname',
          label: 'Sub District'
        },
        {
          key: 'district_state',
          label: 'District / State'
        },
        {
          key: 'location'
        },
        {
          key: 'office_name',
          label: 'Post Office Name'
        },
        {
          key: 'pincode'
        }
      ]
    }
  },
  computed: {
    table_content () {
      return this.subdistrict.map((d) => {
        let location = d.locality_detail1
        if (d.locality_detail2 !== 'NA') {
          location += ', ' + d.locality_detail2
        }
        if (d.locality_detail3 !== 'NA') {
          location += ', ' + d.locality_detail3
        }
        return {
          subdistname: d.subdistname,
          district_state: this.stateName,
          sub_district: '',
          location,
          office_name: d.OfficeName,
          pincode: d.Pincode
        }
      })
    },
    breadcrumb_items () {
      return [
        { text: 'Home', to: { name: 'index' } },
        { text: this.stateName, to: { name: 'districts-stateid', params: { stateid: this.stateSlug } } },
        { text: this.districtName, to: this.districtSlug }
      ]
    },
    stateName () {
      return this.subdistrictinfo ? this.subdistrictinfo[0].StateName : ''
    },
    stateSlug () {
      return this.subdistrictinfo ? this.subdistrictinfo[0].StateSlug : ''
    },
    districtName () {
      return this.subdistrictinfo ? this.subdistrictinfo[0].DistrictName : ''
    },
    districtSlug () {
      return this.subdistrictinfo ? this.subdistrictinfo[0].DistrictSlug : ''
    }
  }

}
</script>
