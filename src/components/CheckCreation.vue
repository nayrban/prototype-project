<template>
	<div class="check-creation">
		<form>
      <br>
			<div id="firstStepView" class="main-container"  v-show="!personalizedView && !additionalInfoView ">
				<div class="main-container">
					<div class="row">
						<div class="large-12 columns">
							<h1 class="h3">Laser Multi-Purpose Check, 3/Sheet</h1>
						</div>
					</div>
					<div class="row">
						<div class="large-6 columns">
							<div class="pdp-product-image-wrap">
								<img class="thumbnail" src="http://placehold.it/650x350">
							</div>
						</div>
						<!-- Check Data -->
						<div class="large-6 xlarge-5 xlarge-offset-1 columns">
							<div class="pdp-details">
								<div >
									<div class="pdp-pricing">
										<h3>From $0.10 to $0.20</h3>
									</div>
								</div>
								<div class="pdp-product-options">
									<div class="row">
										<label>Quantity
											<select v-model="selected_quantity">
												<option disabled value="">Please select one</option>
												<option v-for="quantity in quantities" v-bind:value="quantity">{{quantity.label}}</option>
											</select>
											<h3>Total: ${{order_total}}</h3>
										</label>
									</div>
									<a class="button large expanded" @click.prevent="openCustomView">Personalize</a>
									<div class="small secondary expanded button-group">
										<label>Delivery estimation</label>
										<p>Order by 5pm CST today and we'll ship by Tuesday, 5/30 Learn more</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Second Step -->
			<div class="main-container">
				<div class="row">
					<!-- custom check panel -->
					<div class="xlarge-7 columns" v-show="personalizedView || additionalInfoView">
						<div>
							<div class="callout callout-config-container">
								<div class="configurator__app">
									<img src="../assets/img/checks/l-mp101b_01_pr.jpg" alt="">
									<img id="canvasContainer" src="" alt="">
								</div>
							</div>
						</div>
					</div>
					<div class="xlarge-5 columns">
						<div>
							<div>
								<div class="config-panel" v-show="personalizedView">
									<div class="config-panel-top">
										<h4>Personal Information</h4>
									</div>
									<div class="config-input-group">
										<div class="form-group">
											<label for="full-name" >Name
												<input type="text" id="full-name" name="name" placeholder="Full name" v-model="request.name" v-validate="'required'">
												<span v-show="errors.has('name')" style="color:red;">{{ errors.first('name') }}</span>
											</label>
										</div>
										<a @click.prevent="openNameCompany">Enter Second Name/Company</a>
										<br/>
										<div v-show="secondNameCompanyView" class="floated-label-wrapper">
											<label for="name-company">Second Name/Company</label>
											<input type="text" id="name-company" name="name-company input" placeholder="Name/Company" v-model="request.secondNameCompany">
										</div>
										<div class="floated-label-wrapper">
											<label for="address1">Address Line 1</label>
											<input required type="text" id="address1" name="address" placeholder="Address Line 1" v-model="request.addressLine1" v-validate="'required'">
											<span v-show="errors.has('address')" style="color:red;">{{ errors.first('address') }}</span>
										</div>
										<a @click.prevent="openAddress2">Enter additional Address Info</a>
										<br/>
										<div v-show="addressLine2View" class="floated-label-wrapper">
											<label for="address2">Address Line 2</label>
											<input type="text" id="address2" name="address2 input" placeholder="Address Line 2" v-model="request.addressLine2">
										</div>
										<div class="floated-label-wrapper">
											<label for="city">City</label>
											<input required type="text" id="pass" name="city" placeholder="City" v-model="request.city" v-validate="'required'">
											<span v-show="errors.has('city')" style="color:red;">{{ errors.first('city') }}</span>
										</div>
										<div class="floated-label-wrapper">
											<label for="city">State</label>
											<select v-model="request.state" name="state" v-validate="'required'">
												<option v-for="state in states" :value="state.abbreviation">{{state.name}}</option>
												<span v-show="errors.has('state')" style="color:red;">{{ errors.first('state') }}</span>
											</select>
										</div>
										<div class="floated-label-wrapper">
											<label for="zip">Zip</label>
											<input required type="text" id="pass" name="zip-code" placeholder="Zip Code" v-model="request.zip" v-validate="'required'">
											<span v-show="errors.has('zip-code')" style="color:red;">{{ errors.first('zip-code') }}</span>
										</div>
										<a @click.prevent="openCustomView" class="button">Product Details</a>
										<a @click.prevent="openAdditionalInfoView" class="success button">Additional Information</a>
									</div>
								</div>
								<!-- additional Data -->
								<div class="config-panel" v-show="additionalInfoView">
									<div class="config-panel-top">
										<h4>Bank Information</h4>
									</div>
									<div class="config-input-group">
										<div class="form-group">
											<label for="routingNumber" >Routing Number
												<input type="text" id="routingNumber" name="Routing Number" placeholder="9-digit Routing Number" v-model="request.routingNumber" v-validate="'required'">
												<span v-show="errors.has('Routing Number')" style="color:red;">{{ errors.first('Routing Number') }}</span>
											</label>
										</div>
										<div class="floated-label-wrapper">
											<label for="accountNumber">Account Number</label>
											<input type="text" id="accountNumber" name="Account Number" placeholder="Account Number" v-model="request.accountNumber" v-validate="'required'">
											<span v-show="errors.has('Account Number')" style="color:red;">{{ errors.first('Account Number') }}</span>
										</div>
										<div class="row">
											<div class="large-4 columns">
												<label>Starting Check Number
													<input type="text" id="startingCheckNumber" name="Starting Check Number" placeholder="Starting Check #" v-model="request.startingCheckNumber" v-validate="'required'" >
													<span v-show="errors.has('Starting Check Number')" style="color:red;">{{ errors.first('Starting Check Numberr') }}</span>
												</label>
											</div>
											<div class="large-4 columns">
												<label>Check Number Prefix
													<input type="text" placeholder="Check # Prefix" name="Check Number Prefix" v-model="request.checkNumberPrefix" v-validate="'required'">
													<span v-show="errors.has('Starting Check Number')" style="color:red;">{{ errors.first('Starting Check Numberr') }}</span>
												</label>
											</div>
										</div>
										<div class="floated-label-wrapper">
											<label for="bankName">Bank Name</label>
											<input type="text" id="bankName" name="Bank Name" placeholder="Bank Name" v-model="request.bankName" v-validate="'required'">
											<span v-show="errors.has('Bank Name')" style="color:red;">{{ errors.first('Bank Name') }}</span>
										</div>
										<div class="config-panel-footer" >
											<a @click.prevent="openCustomView" class="button">Back</a>
											<a @click.prevent="postToChekApi" class="success button">Save</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
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
        secondNameCompany: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        routingNumber: '',
        accountNumber: '',
        startingCheckNumber: '',
        checkNumberPrefix: '',
        bankName: '',
        status: ['pending'],
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
      personalizedView: false,
      addressLine2View: false,
      secondNameCompanyView: false,
      additionalInfoView: false,
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
	mounted: {
	  //do something after mounting vue instance

	},
  methods: {
    openCustomView() {
      this.personalizedView = !this.personalizedView;
      this.additionalInfoView = false;
    },
    openAddress2() {
      this.addressLine2View = !this.addressLine2View;
    },
    openNameCompany() {
      this.secondNameCompanyView = !this.secondNameCompanyView;
    },
    openAdditionalInfoView() {
      if (this.request.name === '' || this.request.addressLine1 === ''
          || this.request.city === '' || this.request.state === '' || this.request.zip === '') {
        alert('Please complete the requested Information!');
      } else {
        this.personalizedView = false;
        this.additionalInfoView = true;
      }
    },
    postToChekApi() {
      this.$validator.validateAll().then(() => {
        this.$http.post('checks', this.request).then((response) => {
          response.headers.get('Expires');
          this.someData = response.body;
        }, (response) => {
          this.someData = response.body;
        });
      }).catch(() => {
        alert('Please complete the requested Information!');
      });
    },
    createEaselComponent() {

    },
  },
};
</script>
<style lang="scss" scoped>

</style>
