<template>
<aside class="col-md-4 blog-sidebar">
  <div class="p-4 mb-3 bg-light rounded">
    <h4 class="font-italic">About Pincode {{ pincode }}</h4>
    <p class="mb-0">
      PIN code {{ pincode }} consisits of 6 digit code which is used to find out post
      offices in district in India. The first digit of a PIN indicates the zone
      (Northern/ Western/ Southern/ Eestern). For the pincode {{ pincode }}, first
      digit is "{{ pincodeAt1 }}" so zone is {{ region }}. The second digit indicates the
      sub-zone. Here combination of first two digit is "{{ pincodeAt12 }}" So this denotes to
      the state {{ state }}, and the third, combined with the first two,
      indicates the sorting district within that zone. The final three digits
      are assigned to individual post offices within the sorting district.
    </p>
  </div>
  <div class="p-4 mb-3 bg-light rounded">
    <div class="gmap_canvas">
      <iframe
        width="300"
        height="500"
        id="gmap_canvas"
        :src="`https://maps.google.com/maps?&amp;q=${pincode}&amp;t=&amp;z=11&amp;ie=UTF8&amp;iwloc=&amp;output=embed`"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
      ></iframe>
    </div>
  </div>
  </aside>
</template>
<script>
export default {
  props: ['pincode'],
  computed: {
    pincodeAt1 () {
      return this.pincode[0]
    },
    pincodeAt12 () {
      return this.pincode[0] + this.pincode[1]
    },
    pincodeAt123 () {
      return this.pincode[0] + this.pincode[1] + this.pincode[2]
    },
    region () {
      let region = ''
      if (['1', '2'].includes(this.pincodeAt1)) {
        region = 'Northern'
      } else if (['3', '4'].includes(this.pincodeAt1)) {
        region = 'Western'
      } else if (['5', '6'].includes(this.pincodeAt1)) {
        region = 'Southern'
      } else if (['7', '8'].includes(this.pincodeAt1)) {
        region = 'Eestern'
      } else if (['9'].includes(this.pincodeAt1)) {
        region = 'APS'
      }
      return region
    },
    state () {
      let state = 'N/A'
      if (['11'].includes(this.pincodeAt12)) {
        state = 'Delhi'
      } else if (['12', '13'].includes(this.pincodeAt12)) {
        state = 'Haryana'
      } else if (['14', '15', '16'].includes(this.pincodeAt12)) {
        state = 'Punjab'
      } else if (['17'].includes(this.pincodeAt12)) {
        state = 'Himachal Pradesh'
      } else if (['18', '19'].includes(this.pincodeAt12)) {
        state = 'Jammu & Kashmir'
      } else if (['20', '21', '22', '23', '24', '25', '26', '27', '28'].includes(this.pincodeAt12)) {
        state = 'Uttar Pradesh, Uttarakhand'
      } else if (['30', '31', '32', '33', '34'].includes(this.pincodeAt12)) {
        state = 'Rajasthan'
      } else if (['36', '37', '38', '39'].includes(this.pincodeAt12)) {
        state = 'Gujarat'
      } else if (['40', '41', '42', '43', '44'].includes(this.pincodeAt12)) {
        state = 'Maharashtra'
      } else if (['45', '46', '47', '48'].includes(this.pincodeAt12)) {
        state = 'Madhya Pradesh'
      } else if (['49'].includes(this.pincodeAt12)) {
        state = 'Chhattisgarh'
      } else if (['50'].includes(this.pincodeAt12)) {
        state = 'Telangana'
      } else if (['51', '52', '53'].includes(this.pincodeAt12)) {
        state = 'Andhra Pradesh'
      } else if (['56', '57', '58', '59'].includes(this.pincodeAt12)) {
        state = 'Karnataka'
      } else if (['60', '61', '62', '63', '64', '65', '66'].includes(this.pincodeAt12)) {
        state = 'Tamil Nadu'
      } else if (['67', '68', '69'].includes(this.pincodeAt12)) {
        state = 'Kerala'
      } else if (['70', '71', '72', '73', '74'].includes(this.pincodeAt12)) {
        state = 'West Bengal'
      } else if (['75', '76', '77'].includes(this.pincodeAt12)) {
        state = 'Odisha'
      } else if (['78'].includes(this.pincodeAt12)) {
        state = 'Assam'
      } else if (['80', '81', '82', '83', '84', '85'].includes(this.pincodeAt12)) {
        state = 'Bihar, Jharkhand'
      } else if (['90', '91', '92', '93', '94', '95', '96', '97', '98', '99'].includes(this.pincodeAt12)) {
        state = 'Army Postal Service'
      } else if (['396'].includes(this.pincodeAt123)) {
        state = 'Dadra and Nagar Haveli'
      } else if (['403'].includes(this.pincodeAt123)) {
        state = 'Goa'
      } else if (['605'].includes(this.pincodeAt123)) {
        state = 'Puducherry'
      } else if (['682'].includes(this.pincodeAt123)) {
        state = 'Lakshadweep'
      } else if (['737'].includes(this.pincodeAt123)) {
        state = 'Sikkim'
      } else if (['744'].includes(this.pincodeAt123)) {
        state = 'Andaman and Nicobar Islands'
      } else if (['790', '791', '792'].includes(this.pincodeAt123)) {
        state = 'Arunachal Pradesh'
      } else if (['793', '794'].includes(this.pincodeAt123)) {
        state = 'Meghalaya'
      } else if (['795'].includes(this.pincodeAt123)) {
        state = 'Manipur'
      } else if (['796'].includes(this.pincodeAt123)) {
        state = 'Mizoram'
      } else if (['797', '798'].includes(this.pincodeAt123)) {
        state = 'Nagaland'
      } else if (['799'].includes(this.pincodeAt123)) {
        state = 'Tripura'
      } else if (['396210'].includes(this.pincode)) {
        state = 'Daman and Diu'
      }
      return state
    }
  }
}
</script>
