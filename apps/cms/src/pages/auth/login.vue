<script lang="ts" setup>
import { useForm } from 'alova/client'
import { toast } from 'vue-sonner'
import Logo from '~/components/display/Logo.vue'
import { useSharedFingerprint } from '~/composables/auth'
import { useAuthStore, useUserStore } from '~/composables/store'

const router = useRouter()
const agreement = ref(false)

const userStore = useUserStore()
const authStore = useAuthStore()

const fp = useSharedFingerprint()

const { form, loading, send, onSuccess } = useForm(formData => EndApis.Auth.AuthController_login({
  data: {
    fingerprint: fp.value,
    platform: 'CMS',
    ...formData,
  },
  meta: {
    authRole: 'login',
  },
}), {
  initialForm: {
    account: '',
    password: '',
    type: 'password',
  },
})

function handleRegister() {
  router.push('/auth/register')
}

function handleForgetPassword() {
  router.push('/auth/forget-password')
}

async function handleLogin({ errors }: any) {
  /**
   * 发一个请求 - 认证/登录
   * {
   *    account: 账号名
   *    password: 密码
   *    type: 固定写死 password
   * }
   */
  if (Object.values(errors ?? {}).length) {
    return
  }

  send()
}

onMounted(() => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.body.classList.toggle('arco-theme-dark', isDark)
})

onSuccess((data: any) => {
  const token = data.data.token
  authStore.value.accessToken = token.access_token
  authStore.value.refreshToken = token.refresh_token
  authStore.value.expiredTime = Date.now() + token.expire_time

  userStore.setLogin(data.data.user)

  toast.success('登录成功')

  router.push('/')
})

function handleAlipayLogin() {
  toast.error('功能暂未开放')
}

function handlePasskeysLogin() {
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

      <a-form :disabled="loading" layout="vertical" :model="form" @submit="handleLogin">
        <a-form-item :rules="[{ required: true, message: '账号必须存在' }, { minLength: 5, message: '账号最短需要是5位' }]"
          field="account" tooltip="请输入账号" label="账号">
          <a-input v-model="form.account" class="w-[100%]" size="large" placeholder="账号" allow-clear type="username" />
        </a-form-item>
        <a-form-item :rules="[{ required: true, message: '密码必须存在' }, { minLength: 5, message: '密码最短需要是5位' }]"
          field="password" tooltip="请输入密码" label="密码">
          <a-input v-model="form.password" class="w-[100%]" size="large" placeholder="密码" allow-clear type="password" />
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
          <a-button html-type="submit" :loading="loading" size="large" type="primary" class="Login-Button w-full"
            :disabled="!agreement">
            登录
          </a-button>
        </a-form-item>
      </a-form>

      <div class="Login-Button-Second">
        <a-button type="text" @click="handleForgetPassword">
          忘记密码
        </a-button>
        <a-button type="text" @click="handleRegister">
          立即注册
        </a-button>
      </div>

      <a-divider orientation="center">
        或者
      </a-divider>

      <a-button size="large" type="outline" class="Login-Button w-full" @click="handleAlipayLogin">
        支付宝扫码登录
      </a-button>
      <a-button size="large" type="outline" class="Login-Button w-full" @click="handlePasskeysLogin">
        PASSKEYS 登录
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
.Login {
  // background-color: #f0f2f5;
  // color: #000;
  // min-height: 100vh;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  background-color: #f0f2f5;
  color: #000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 暗黑模式适配 */
@media (prefers-color-scheme: dark) {
  .Login {
    background-color: #0e0e0e;
    color: #e0e0e0;
  }

  .Login-Form {
    background: rgba(32, 32, 32, 0.95);
    box-shadow: 0 4px 40px rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.06);
    color: #f1f1f1;
    backdrop-filter: blur(20px) saturate(180%);
    border-radius: 20px;
    filter: brightness(80%);
  }

  .Login h1 {
    color: #0e0e0e;
  }

  .Login-Copyright {
    color: #888;
  }

  .arco-input,
  .arco-input-wrapper {
    background-color: #0f0f0f !important;
    color: #fff;
    border-color: #444;
  }

  .arco-input::placeholder {
    color: #888;
  }

  .arco-btn-primary {
    background-color: #2962ff;
    border-color: #2962ff;
    color: #fff;

    &:hover {
      background-color: #0039cb;
    }
  }

  .arco-btn-outline {
    background-color: #666;
    border: 1px solid #666;
    color: #fff;

    &:hover {
      background-color: #2a2a2a;
    }
  }
}

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
