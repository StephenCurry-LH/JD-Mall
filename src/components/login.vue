<template>
  <div class="container">
    <form action="http://mall.caimingyang.cn:8080/login" method="post">
      <div class="form-group">
        <label for="username-input">Phone</label>
        <input type="text" id="username-input" name="username">
      </div>
      <div class="form-group">
        <label for="password-input">Password</label>
        <input type="password" id="password-input" name="password">
      </div>
      <input class="btn btn-primary" type="submit" value="Login">
    </form>
  </div>
</template>

<script>
export default {
  name: 'login'
};
</script>

<style scoped>

</style>
