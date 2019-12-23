<template>
    <footer>
        <div class="width-limit footer-content">
            <h2 class="copyright-title">
                Web of Integrated Science - Open Geographic Modeling and Simulation
            </h2>
            <p class="footerBottom">Copyright © 2013-2019 OpenGMS. All Rights Reserved.</p>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style lang="less" scoped>
footer {
  height: 60px;
  width: 100%;
  bottom: 0;
  flex: 0 0 auto;
  background-color: #ffffff;
}

.footer-content {
  background-color: #545c64;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}

.copyright-title {
  font-style: italic;
  text-align: center;
  font-weight: 15px;
  color: #e0dede;
  margin-top: 10px;
}

.footerBottom {
  text-align: center;
  color: white;
  font-size: 0.8em;
}
</style>