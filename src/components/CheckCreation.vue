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
							<canvasComponent  :textCheckNumberPrefix="request.checkNumberPrefix" :textZip="request.zip" :textState="request.state" :textCity="request.city" :textSecondNameCompany="request.secondNameCompany" :textAddressLine2="request.addressLine2" :textName="request.name" :textAddress="request.addressLine1" :textStartingCheckNumber="request.startingCheckNumber"
															 :textRountingNumber="request.routingNumber" :textBankName="request.bankName" :textAccountNumber="request.accountNumber"/>
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
												<input type="text" id="full-name" maxlength="50" name="name" placeholder="Full name" v-model="request.name" v-validate="'required'">
												<span v-show="errors.has('name')" style="color:red;">{{ errors.first('name') }}</span>
											</label>
										</div>
										<a @click.prevent="openNameCompany">Enter Second Name/Company</a>
										<br/>
										<div v-show="secondNameCompanyView" class="floated-label-wrapper">
											<label for="name-company">Second Name/Company</label>
											<input type="text" id="name-company" maxlength="50" name="name-company input" placeholder="Name/Company" v-model="request.secondNameCompany">
										</div>
										<div class="floated-label-wrapper">
											<label for="address1">Address Line 1</label>
											<input required type="text" id="address1" maxlength="50" name="address" placeholder="Address Line 1" v-model="request.addressLine1" v-validate="'required'">
											<span v-show="errors.has('address')" style="color:red;">{{ errors.first('address') }}</span>
										</div>
										<a @click.prevent="openAddress2">Enter additional Address Info</a>
										<br/>
										<div v-show="addressLine2View" class="floated-label-wrapper">
											<label for="address2">Address Line 2</label>
											<input type="text" id="address2" maxlength="50" name="address2 input" placeholder="Address Line 2" v-model="request.addressLine2">
										</div>
										<div class="row">
											<div class="large-4 columns">
												<label for="city">City</label>
												<input required type="text" id="pass"  maxlength="25" name="city" placeholder="City" v-model="request.city" v-validate="'required'">
												<span v-show="errors.has('city')" style="color:red;">{{ errors.first('city') }}</span>
											</div>
											<div class="large-4 columns">
												<label for="city">State</label>
												<select v-model="request.state" name="state" v-validate="'required'">
													<option v-for="state in states" :value="state.abbreviation">{{state.name}}</option>
													<span v-show="errors.has('state')" style="color:red;">{{ errors.first('state') }}</span>
												</select>
											</div>
											<div class="large-4 columns">
												<label for="zip">Zip</label>
												<input required type="text" id="pass" maxlength="10" name="zip-code" placeholder="Zip Code" v-model="request.zip" v-validate="'required|numeric'">
												<span v-show="errors.has('zip-code')" style="color:red;">{{ errors.first('zip-code') }}</span>
											</div>
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
												<input type="text" id="routingNumber" maxlength="9" name="Routing Number" placeholder="9-digit Routing Number" v-model="request.routingNumber"
												v-validate="'required|numeric|digits:9'">
												<span v-show="errors.has('Routing Number')" style="color:red;">{{ errors.first('Routing Number') }}</span>
											</label>
										</div>
										<div class="floated-label-wrapper">
											<label for="accountNumber">Account Number</label>
											<input type="text" id="accountNumber" name="Account Number" maxlength="14" placeholder="Account Number" v-model="request.accountNumber" v-validate="'required'">
											<span v-show="errors.has('Account Number')" style="color:red;">{{ errors.first('Account Number') }}</span>
										</div>
										<div class="row">
											<div class="large-4 columns">
												<label>Starting Check Number
													<input type="text" id="startingCheckNumber" maxlength="8" name="Starting Check Number" placeholder="Starting Check #" v-model="request.startingCheckNumber"
													v-validate="'required|numeric|min_value:101'" >
													<span v-show="errors.has('Starting Check Number')" style="color:red;">{{ errors.first('Starting Check Number') }}</span>
												</label>
											</div>
											<div class="large-4 columns">
												<label>Check Number Prefix
													<input type="text" maxlength="2" placeholder="Check # Prefix" name="Check Number Prefix" v-model="request.checkNumberPrefix" v-validate="'required|numeric'">
													<span v-show="errors.has('Starting Check Number')" style="color:red;">{{ errors.first('Starting Check Numberr') }}</span>
												</label>
											</div>
										</div>
										<div class="floated-label-wrapper">
											<label for="bankName">Bank Name</label>
											<input type="text" id="bankName" maxlength="50" name="Bank Name" placeholder="Bank Name" v-on:input="updateValue($event.target, canvasComponent.textBankName)" v-model="request.bankName" v-validate="'required'">
											<span v-show="errors.has('Bank Name')" style="color:red;">{{ errors.first('Bank Name') }}</span>
										</div>
										<div class="config-panel-footer">
										<a @click.prevent="openCustomView" class="button">Previous Step</a>
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
import EventBus from '../event-bus';
import CheckCanvas from './CheckCanvas';

export default {
  name: 'check-creation',
  components: {
    canvasComponent: CheckCanvas,
  },
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
      states: [],
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
  mounted() {
    this.getStates();
  },
  computed: {
    order_total() {
      if (this.selected_quantity !== '') {
        return _.multiply(this.selected_quantity.quantity,
          this.selected_quantity.unit_price);
      }
      return 0;
    },
  },
  methods: {
    updateValue(target, prop) {
      EventBus.$emit('reply', target, prop);
      // console.log(target.value);
    },
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
      if (this.request.name === '' || this.request.addressLine1 === '' || this.request.city === ''
          || this.request.state === '' || this.request.zip === '') {
        alert('Please fill the requested information'); // eslint-disable-line no-alert
      } else {
        this.personalizedView = false;
        this.additionalInfoView = true;
      }
    },
    postToChekApi() {
      this.$validator.validateAll().then(() => {
        this.request.unitAmount = this.selected_quantity.unit_price;
        this.request.quantity = this.selected_quantity.quantity;
        this.$http.post('checks', this.request).then((response) => {
          response.headers.get('Expires');
          this.someData = response.body;
        }, (response) => {
          this.someData = response.body;
        });
      }).catch((e) => {
        console.log(e.message); // eslint-disable-line no-alert
      });
    },
    getStates() {
      this.$http.get('states').then((response) => {
        this.states = response.body;
        if (this.states[0] != null) {
          this.request.state = this.states[0].abbreviation;
        }
      }, (response) => {
        console.log(response); // eslint-disable-line no-alert
      });
    },
    createEaselComponent() {
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
