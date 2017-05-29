<template>
<div class="check-creation">
  <!-- You can now combine a row and column if you just need a 12 column row -->
  <div class="row">
    <nav aria-label="You are here:" role="navigation" class="large-12 column">
      <ul class="breadcrumbs">
        <li><a href="#">Home</a></li>
        <li><a href="#">Features</a></li>
        <li class="disabled">Gene Splicing</li>
        <li>
          <span class="show-for-sr">Current: </span> Cloning
        </li>
      </ul>
    </nav>
  </div>
  <div class="row">
    <div class="medium-6 columns">
      <img class="thumbnail" src="http://placehold.it/650x350">
      <label>Choose Color</label>
      <hr>
      <div class="row small-up-4">
        <div class="column">
          <img class="thumbnail" src="http://placehold.it/128x128">
        </div>
        <div class="column">
          <img class="thumbnail" src="http://placehold.it/128x128">
        </div>
        <div class="column">
          <img class="thumbnail" src="http://placehold.it/128x128">
        </div>
        <div class="column">
          <img class="thumbnail" src="http://placehold.it/128x128">
        </div>
      </div>
    </div>
    <!-- Check Data -->
    <div id="app" class="medium-6 large-5 columns">
      <div v-if="!custom_view">
        <h3>From $0.10 to $0.20</h3>
        <label>Quantity
           <select v-model="selected_quantity">
             <option disabled value="">Please select one</option>
             <option v-for="quantity in quantities" v-bind:value="quantity">{{quantity.label}}</option>
           </select>
                 <h3>Total: ${{order_total}}</h3>
           </label>
        <a href="#" class="button large expanded" @click.prevent="openCustomView">Personalize</a>
        <div class="small secondary expanded button-group">
          <label>Delivery estimation</label>
          <p>Order by 5pm CST today and we'll ship by Tuesday, 5/30 Learn more</p>
        </div>
      </div>

      <div v-else>
        <form>
          <div class="form-icons">
            <h4>Personal Information</h4>

            <div class="floated-label-wrapper">
              <label for="full-name">Full name</label>
              <input required type="text" id="full-name" name="full name input" placeholder="Full name" v-model="request.name">
            </div>

            <div class="floated-label-wrapper">
              <label for="address1">Address Line 1</label>
              <input required type="text" id="address1" name="address1 input" placeholder="Address Line 1" v-model="request.addressLine1">
            </div>

            <a @click.prevent="openAddress2">Enter additional Address Info</a>

            <div v-show="addressLine2View" class="floated-label-wrapper">
              <label for="address2">Address Line 2</label>
              <input type="text" id="address2" name="address2 input" placeholder="Address Line 2" v-model="request.addressLine2">
            </div>

            <div class="floated-label-wrapper">
              <label for="city">City</label>
              <input required type="text" id="pass" name="city input" placeholder="City" v-model="request.city">
            </div>

            <div class="floated-label-wrapper">
              <label for="city">State</label>
              <select v-model="request.state">
             <option v-for="state in states" :value="state.abbreviation">{{state.name}}</option>
           </select>
            </div>

            <div class="floated-label-wrapper">
              <label for="zip">Zip</label>
              <input required type="text" id="pass" name="zip input" placeholder="Zip Code" v-model="request.zip">
            </div>
            <a @click.prevent="openCustomView" class="button">Product Details</a>
            <a href="#" class="success button">Save</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'check-creation',
  data() {
    return {
      request: {
        name: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
      },
      states: [
        {
          name: 'Alabama',
          abbreviation: 'AL',
        },
        {
          name: 'Alaska',
          abbreviation: 'AK',
        },
        {
          name: 'American Samoa',
          abbreviation: 'AS',
        },
        {
          name: 'Arizona',
          abbreviation: 'AZ',
        },
        {
          name: 'Arkansas',
          abbreviation: 'AR',
        },
        {
          name: 'California',
          abbreviation: 'CA',
        },
        {
          name: 'Colorado',
          abbreviation: 'CO',
        },
        {
          name: 'Connecticut',
          abbreviation: 'CT',
        },
        {
          name: 'Delaware',
          abbreviation: 'DE',
        },
        {
          name: 'District Of Columbia',
          abbreviation: 'DC',
        },
        {
          name: 'Federated States Of Micronesia',
          abbreviation: 'FM',
        },
        {
          name: 'Florida',
          abbreviation: 'FL',
        },
        {
          name: 'Georgia',
          abbreviation: 'GA',
        },
        {
          name: 'Guam',
          abbreviation: 'GU',
        },
        {
          name: 'Hawaii',
          abbreviation: 'HI',
        },
        {
          name: 'Idaho',
          abbreviation: 'ID',
        },
        {
          name: 'Illinois',
          abbreviation: 'IL',
        },
        {
          name: 'Indiana',
          abbreviation: 'IN',
        },
        {
          name: 'Iowa',
          abbreviation: 'IA',
        },
        {
          name: 'Kansas',
          abbreviation: 'KS',
        },
        {
          name: 'Kentucky',
          abbreviation: 'KY',
        },
        {
          name: 'Louisiana',
          abbreviation: 'LA',
        },
        {
          name: 'Maine',
          abbreviation: 'ME',
        },
        {
          name: 'Marshall Islands',
          abbreviation: 'MH',
        },
        {
          name: 'Maryland',
          abbreviation: 'MD',
        },
        {
          name: 'Massachusetts',
          abbreviation: 'MA',
        },
        {
          name: 'Michigan',
          abbreviation: 'MI',
        },
        {
          name: 'Minnesota',
          abbreviation: 'MN',
        },
        {
          name: 'Mississippi',
          abbreviation: 'MS',
        },
        {
          name: 'Missouri',
          abbreviation: 'MO',
        },
        {
          name: 'Montana',
          abbreviation: 'MT',
        },
        {
          name: 'Nebraska',
          abbreviation: 'NE',
        },
        {
          name: 'Nevada',
          abbreviation: 'NV',
        },
        {
          name: 'New Hampshire',
          abbreviation: 'NH',
        },
        {
          name: 'New Jersey',
          abbreviation: 'NJ',
        },
        {
          name: 'New Mexico',
          abbreviation: 'NM',
        },
        {
          name: 'New York',
          abbreviation: 'NY',
        },
        {
          name: 'North Carolina',
          abbreviation: 'NC',
        },
        {
          name: 'North Dakota',
          abbreviation: 'ND',
        },
        {
          name: 'Northern Mariana Islands',
          abbreviation: 'MP',
        },
        {
          name: 'Ohio',
          abbreviation: 'OH',
        },
        {
          name: 'Oklahoma',
          abbreviation: 'OK',
        },
        {
          name: 'Oregon',
          abbreviation: 'OR',
        },
        {
          name: 'Palau',
          abbreviation: 'PW',
        },
        {
          name: 'Pennsylvania',
          abbreviation: 'PA',
        },
        {
          name: 'Puerto Rico',
          abbreviation: 'PR',
        },
        {
          name: 'Rhode Island',
          abbreviation: 'RI',
        },
        {
          name: 'South Carolina',
          abbreviation: 'SC',
        },
        {
          name: 'South Dakota',
          abbreviation: 'SD',
        },
        {
          name: 'Tennessee',
          abbreviation: 'TN',
        },
        {
          name: 'Texas',
          abbreviation: 'TX',
        },
        {
          name: 'Utah',
          abbreviation: 'UT',
        },
        {
          name: 'Vermont',
          abbreviation: 'VT',
        },
        {
          name: 'Virgin Islands',
          abbreviation: 'VI',
        },
        {
          name: 'Virginia',
          abbreviation: 'VA',
        },
        {
          name: 'Washington',
          abbreviation: 'WA',
        },
        {
          name: 'West Virginia',
          abbreviation: 'WV',
        },
        {
          name: 'Wisconsin',
          abbreviation: 'WI',
        },
        {
          name: 'Wyoming',
          abbreviation: 'WY',
        },
      ],
      quantities: [{
        label: '250 ($0.20 each)',
        quantity: 250,
        unit_price: 0.20,
      },
      {
        label: '500 ($0.15 each)',
        quantity: 500,
        unit_price: 0.15,
      },
      {
        label: '1000 ($0.10 each)',
        quantity: 1000,
        unit_price: 0.10,
      },
      ],
      selected_quantity: '',
      custom_view: false,
      addressLine2View: false,
    };
  },
  computed: {
    normalizedSize() {
      return this.size.trim().toLowerCase();
    },
    order_total() {
      if (this.selected_quantity !== '') {
        return _.multiply(this.selected_quantity.quantity,
          this.selected_quantity.unit_price);
      }
      return 0;
    },
  },
  methods: {
    openCustomView() {
      this.custom_view = !this.custom_view;
    },
    openAddress2() {
      this.addressLine2View = !this.addressLine2View;
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
