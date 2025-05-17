<script lang="ts" setup>
// const username = ref("")
// const password = ref("")
// function handleClick() {
//   if (username.value === "" || password.value === "") {
//     alert("请输入用户名或密码")
//     return
//   }
// }
</script>

<template>
  <div class="Login">
    <div class="Login-Background" />

    <div class="Login-Form">
      <h1>LOGIN</h1>

      <a-input class="w-[80%]" size="large" placeholder="账号" allow-clear />
      <a-input class="w-[80%]" size="large" placeholder="密码" allow-clear />
      <p>
        继续操作即代表您同意接受
        <a-link href="link">
          《服务条款》
        </a-link>
        和
        <a-link href="link">
          《隐私政策》
        </a-link>
      </p>

      <a-button type="primary" class="Login-Button w-full">
        登录
      </a-button>
      <div class="Login-Button-Second">
        <a-button type="text">
          忘记密码
        </a-button>
        <a-button type="text">
          立即注册
        </a-button>
      </div>

      <a-divider orientation="center">
        或者
      </a-divider>

      <a-button class="Login-Button w-full">
        谷歌登录
      </a-button>
      <a-button class="Login-Button w-full">
        SSO登录
      </a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.Login-Form {
  &::before {
    z-index: -1;
    content: '';
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  }

  position: absolute;
  padding: 1rem;

  top: 10%;
  right: 10%;

  width: 20%;
  height: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  backdrop-filter: blur(18px) saturate(180%);
}

.Login-Background {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;

  background-size: contain;
  background-position: left center;
  background-repeat: no-repeat;
  background-image: url('/bg/auth.png');
}

.Login {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.Login-Button-Second {
  display: flex;
  flex-direction: rows;
  justify-content: space-between;
  width: 100%;
}
</style>

<route lang="yaml">
meta:
  needAuth: false
  layout: fullscreen
</route>
