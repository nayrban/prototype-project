<template>
  <div id="app" class="off-canvas-wrapper" data-off-canvas-wrapper >
    <div  data-off-canvas-content>
    <section class="pop-header">
    <nav class="pop-header-info">
        <div class="main-container" >
          <span class="tagline-text">
            PoC <br>GPS Hiring</span>
          <ul class="menu nav-service-links " show-for-xlarge>
            <li><a href="#"><i class="fi-list"></i> <span>Search</span></a></li>
            <li><a href="#"><i class="fi-list"></i> <span>Help</span></a></li>
            <li><a href="#"><i class="fi-list"></i> <span>Order Status</span></a></li>
            <li><a href="#"><i class="fi-list"></i> <span>Login / Register</span></a></li>
          </ul>
        </div>
    </nav>
    <nav class="top-bar show-for-xlarge">
        <div class="pop-container-nav">
          <div class="title-bar-left">
            <ul id="menuBar" class="vertical medium-horizontal menu" data-responsive-menu="drilldown medium-dropdown">
            <li>
              <a href="">Checks</a>
              <ul class="menu">
                <li><router-link to="/check-creation" exact>Computer Checks</router-link></li>
              </ul>
            </li>
            <li>
              <a href="#">Envelopes</a>
            </li>
            <li><a href="#">Deposit Solutions</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">Tax Forms</a></li>
          </ul>
          </div>
      </div>
    </nav>
  </section>
  <!-- End Section header -->
  <!--  Section Body -->
  <section>
    <div class='' id='root'>
      <router-view></router-view>
    </div>
  </section>
  </div>
</div>
</template>

<script>

export default {
  name: 'app',
  mounted() {
    // need to initialize the foundation api to get this plugin working
    $(document).foundation();
    this.menuBar = new Foundation.ResponsiveMenu($('#menuBar'), {});
  },
};
</script>

<style lang="scss">
@import './styles/global';

// Chrome Reset
</style>
