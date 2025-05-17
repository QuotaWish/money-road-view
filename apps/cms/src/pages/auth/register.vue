<script lang="ts" setup>
import Logo from '~/components/display/Logo.vue'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const agreement = ref(false)
const router = useRouter()
function handleClick() {
  router.push('/auth/login')
}

function handleRegister() {
  if (username.value && password.value && confirmPassword.value) {
    // TODO: 提交注册信息
    alert('注册成功')
    router.push('/auth/login')
  }
  else {
    alert('请填写完整信息')
  }
}
</script>

<template>
  <div class="Login">
    <div class="Login-Background" />

    <div class="Login-Form fake-background">
      <h1 text-3xl font-bold>
        注册账号
      </h1>

      <a-input class="w-[80%]" size="large" placeholder="账号" allow-clear type="username" />
      <a-input class="w-[80%]" size="large" placeholder="密码" allow-clear type="password" />
      <a-input class="w-[80%]" size="large" placeholder="重复密码" allow-clear type="password" />
      <a-checkbox v-model="agreement">
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
      </a-checkbox>
      <a-button size="large" type="primary" class="Login-Button w-full" :disabled="!agreement" @click="handleRegister()">
        注册
      </a-button>
      <div class="Login-Button-Second">
        <a-button type="text">
          忘记密码
        </a-button>
        <a-button type="text" @click="handleClick()">
          立即登录
        </a-button>
      </div>
    </div>

    <div class="Login-Brand">
      <Logo />
    </div>

    <div class="Login-Copyright">
      Powered by QuotaWish.
    </div>
  </div>
</template>

<style lang="less" scoped>
.Login-Brand {
  z-index: 1;
  position: absolute;

  top: 1rem;
  left: 1rem;
}

.Login-Copyright {
  position: absolute;

  left: 50%;

  bottom: 1rem;
  opacity: 0.5;
  transform: translateX(-50%);
}

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
  padding: 2rem;

  top: 50%;
  right: 10%;

  width: 20%;
  min-width: 480px;
  height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  overflow: hidden;
  border-radius: 18px;
  --fake-opacity: 0.75;
  transform: translateY(-50%);
  backdrop-filter: blur(18px) saturate(180%);
}

.Login-Background {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;

  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
  background-image: url('/bg/auth-bg.png');
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

@media (max-width: 720px) {
  .Login-Form {
    top: 0;
    right: 0;

    width: 100%;
    height: 100%;
    max-height: 100%;

    transform: none;
    border-radius: 0;
  }

  .Login-Copyright {
    font-size: 10px;
    bottom: 0.25rem;
  }
}
</style>

<route lang="yaml">
meta:
  needAuth: false
  layout: fullscreen
</route>
