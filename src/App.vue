<template>
  <div id="app" class="off-canvas-wrapper" data-off-canvas-wrapper >
    <div  data-off-canvas-content>
    <section class="site-header">
    <nav class="top-bar ">
        <div class="top-bar-left">
        </div>
        <div class="top-bar-right" >
          <ul class="menu" show-for-xlarge>
            <li><a href="#"><i class="fi-list"></i> <span>One</span></a></li>
            <li><a href="#"><i class="fi-list"></i> <span>Two</span></a></li>
            <li><a href="#"><i class="fi-list"></i> <span>Three</span></a></li>
            <li><a href="#"><i class="fi-list"></i> <span>Four</span></a></li>
          </ul>
        </div>
    </nav>
    <nav class="top-bar show-for-xlarge">
        <div >
          <div class="title-bar-left">
            <ul id="menuBar" class="vertical medium-horizontal menu" data-responsive-menu="drilldown medium-dropdown">
            <li>
              <a href="#">Checks</a>
              <ul class="menu">
                <li><a href="#">Computer Checks</a></li>
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
    <div class='row' id='root'>
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
