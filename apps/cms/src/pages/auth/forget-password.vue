<script lang="ts" setup>
import { toast } from 'vue-sonner'
import Logo from '~/components/display/Logo.vue'

const form = reactive({
  account: '',
  password: '',
  confirmPassword: '',
})

const agreement = ref(false)
const router = useRouter()
function handleLogin() {
  router.push('/auth/login')
}
function handleRegister() {
  router.push('/auth/register')
}
function handleForgetPassword({ errors }: any) {
  if (Object.values(errors).length) {
    return
  }

  if (form.password !== form.confirmPassword) {
    toast.error('两次密码不一致')
    return
  }
  toast.error('修改成功')
  router.push('/auth/login')
}
</script>

<template>
  <div class="ForgetPassword">
    <div class="ForgetPassword-Background" />

    <div class="ForgetPassword-Form fake-background">
      <h1 text-3xl font-bold text-left w-full>
        重置密码
      </h1>
      <a-form :model="form" layout="vertical" @submit="handleForgetPassword">
        <a-form-item :rules="[{ required: true, message: '账号必须存在' }, { minLength: 5, message: '账号最短需要是5位' }]" field="account" tooltip="请输入账号" label="账号">
          <a-input v-model="form.account" class="w-[80%]" size="large" placeholder="账号" allow-clear />
        </a-form-item>
        <a-form-item :rules="[{ required: true, message: '类型' }, { minLength: 5, message: '密码最短需要是5位' }]" field="password" tooltip="请选择类型" label="类型">
          <a-input v-model="form.password" class="w-[80%]" size="large" placeholder="类型" allow-clear />
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
          <a-button html-type="submit" size="large" type="primary" class="Login-Button w-full" :disabled="!agreement">
            修改
          </a-button>
        </a-form-item>
      </a-form>

      <div class="ForgetPassword-Button-Second">
        <a-button type="text" @click="handleRegister()">
          立即注册
        </a-button>
        <a-button type="text" @click="handleLogin()">
          立即登录
        </a-button>
      </div>
    </div>

    <div class="ForgetPassword-Brand">
      <Logo />
    </div>

    <div class="ForgetPassword-Copyright">
      Powered by QuotaWish.
    </div>
  </div>
</template>

<style lang="less" scoped>
.ForgetPassword-Brand {
  z-index: 1;
  position: absolute;

  top: 1rem;
  left: 1rem;
}

.ForgetPassword-Copyright {
  position: absolute;

  left: 50%;

  bottom: 1rem;
  opacity: 0.5;
  transform: translateX(-50%);
}

.ForgetPassword-Form {
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
  height: 550px;

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

.ForgetPassword-Background {
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

.ForgetPassword {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.ForgetPassword-Button-Second {
  display: flex;
  flex-direction: rows;
  justify-content: space-between;
  width: 100%;
}

@media (max-width: 720px) {
  .ForgetPassword-Form {
    top: 0;
    right: 0;

    width: 100%;
    height: 100%;
    max-height: 100%;

    transform: none;
    border-radius: 0;
  }

  .ForgetPassword-Copyright {
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
