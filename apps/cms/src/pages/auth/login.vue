<script lang="ts" setup>
import { toast } from 'vue-sonner'
import Logo from '~/components/display/Logo.vue'

const router = useRouter()
const agreement = ref(false)

const form = reactive({
  account: '',
  password: '',
})

function handleClick() {
  router.push('/auth/register')
}
function handleLogin() {
  if (!form.account || !form.password) {
    toast.error('请输入用户名或密码')
  }

  /**
   * 发一个请求 - 认证/登录
   * {
   *    account: 账号名
   *    password: 密码
   *    type: 固定写死 password
   * }
   */
}

function handleGoogleLogin() {
  toast.error('功能暂未开放')
}

function handleSSOLogin() {
  toast.error('功能暂未开放')
}
</script>

<template>
  <div class="Login">
    <div class="Login-Background" />

    <div class="Login-Form fake-background">
      <h1 text-3xl font-bold text-left w-full>
        登录账号
      </h1>

      <a-form layout="vertical" :model="form" @submit="handleLogin">
        <a-form-item field="account" tooltip="请输入账号" label="账号">
          <a-input v-model="form.account" class="w-[80%]" size="large" placeholder="账号" allow-clear type="username" />
        </a-form-item>
        <a-form-item field="password" tooltip="请输入密码" label="密码">
          <a-input v-model="form.password" class="w-[80%]" size="large" placeholder="密码" allow-clear type="password" />
        </a-form-item>
        <a-form-item field="isRead">
          <a-checkbox v-model="agreement">
            <p>
              继续操作即代表您同意接受
              <a-link href="/service">
                《服务条款》
              </a-link>
              和
              <a-link href="/privacy">
                《隐私政策》
              </a-link>
            </p>
          </a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button size="large" type="primary" class="Login-Button w-full" :disabled="!agreement">
            登录
          </a-button>
        </a-form-item>
      </a-form>

      <div class="Login-Button-Second">
        <a-button type="text">
          忘记密码
        </a-button>
        <a-button type="text" @click="handleClick()">
          立即注册
        </a-button>
      </div>

      <a-divider orientation="center">
        或者
      </a-divider>

      <a-button size="large" type="outline" class="Login-Button w-full" @click="handleGoogleLogin()">
        谷歌注册
      </a-button>
      <a-button size="large" type="outline" class="Login-Button w-full" @click="handleSSOLogin()">
        SSO注册
      </a-button>
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
  height: 750px;

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
