# Recaptcha
使用 Cloudflare Turnstile 加強安全性

## 前置作業
- 申請 [Cloudflare](https://www.cloudflare.com/zh-tw/) 帳號
- 登入後，找到 `Protect & connect` > `Application security` > `Turnstile`
- 點 `Add widget manually`
- 填入資料
  - `Widget name` 打你的網站名稱
  - `Hostname Management` 需要套用的網域，輸入自己的 GitHub Pages 網域 `xxx.github.io` 和 `localhost`
  - `Widget Mode` 維持 `Managed`
  - `Skip future security rule challenges for verified visitors` 關閉，只有在 Cloudflare 代理網站時有效

## 前端
- 設定環境變數 `VITE_TURNSTILE_SITE_KEY`
- 建立前端元件 `CfTurnstile.vue`
  ```html
  <template>
    <div ref="turnstileContainer"></div>
  </template>

  <script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  interface TurnstileRenderOptions {
    sitekey: string
    action?: string
    theme?: 'light' | 'dark' | 'auto'
    size?: 'normal' | 'flexible' | 'compact'
    callback?: (token: string) => void
    'error-callback'?: (code: string) => void
    'expired-callback'?: () => void
  }

  interface Turnstile {
    render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string
    reset: (widgetId?: string) => void
    remove: (widgetId?: string) => void
    getResponse: (widgetId?: string) => string | undefined
  }

  declare global {
    interface Window {
      turnstile?: Turnstile
    }
  }

  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''

  const props = withDefaults(
    defineProps<{
      modelValue?: string
      action?: string
      theme?: 'light' | 'dark' | 'auto'
      size?: 'normal' | 'flexible' | 'compact'
    }>(),
    {
      action: '',
      theme: 'auto',
      size: 'normal',
    },
  )

  const emit = defineEmits<{
    (e: 'update:modelValue', token: string): void
    (e: 'error', code: string): void
    (e: 'expired'): void
  }>()

  const turnstileContainer = ref<HTMLElement | null>(null)
  let widgetId: string | undefined = undefined

  const renderWidget = () => {
    if (!window.turnstile || !turnstileContainer.value) return

    if (widgetId !== undefined) {
      window.turnstile.remove(widgetId)
    }

    widgetId = window.turnstile.render(turnstileContainer.value, {
      sitekey: siteKey,
      action: props.action,
      theme: props.theme,
      size: props.size,
      callback: (token: string) => {
        emit('update:modelValue', token)
      },
      'error-callback': (code: string) => {
        emit('error', String(code))
      },
      'expired-callback': () => {
        emit('update:modelValue', '')
        emit('expired')
      },
    })
  }

  onMounted(() => {
    if (!window.turnstile) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.onload = renderWidget
      document.head.appendChild(script)
    } else {
      renderWidget()
    }
  })

  onBeforeUnmount(() => {
    if (widgetId !== undefined && window.turnstile) {
      window.turnstile.remove(widgetId)
    }
  })

  const reset = () => {
    if (widgetId !== undefined && window.turnstile) {
      emit('update:modelValue', '')
      window.turnstile.reset(widgetId)
    }
  }
  defineExpose({ reset })
  </script>
  ```
- 使用元件
  ```html
    <!-- action文字自訂，跟後端檢查時一樣就好 -->
    <template>
      <cf-turnstile v-model="turnstileToken" action="login"></cf-turnstile>
    </template>
    <script setup lang="ts">
      import { ref } from 'vue'
      import CfTurnstile from './CfTurnstile.vue'

      const turnstileToken = ref('')

      const onSubmit = form.handleSubmit(async (values) => {
        if (!turnstileToken.value) {
          // 未通過時的處理
          return
        }

        await authService.login({
          // 其他表單資料
          'cf-turnstile-response': turnstileToken.value,
        })
      })
    </script>
  ```

## 後端
- 設定環境變數 `TURNSTILE_SECRET_KEY`
- 建立 `middlewares/turnstile.ts`
  ```ts
  import type { NextFunction, Request, RequestHandler, Response } from 'express'
  import axios, { AxiosError } from 'axios'
  import FormData from 'form-data'
  import { StatusCodes } from 'http-status-codes'

  export interface TurnstileOptions {
    secretKey?: string | undefined
    timeout?: number | undefined
    expectedAction?: string | undefined
    expectedHostname?: string | undefined
    idempotencyKey?: string | undefined
  }

  export interface TurnstileResult {
    success: boolean
    error?: string | undefined
    expected?: string | undefined
    received?: string | undefined
    action?: string | undefined
    hostname?: string | undefined
    challenge_ts?: string | undefined
    cdata?: string | undefined
  }

  export class TurnstileValidator {
    private secretKey: string
    private timeout: number

    constructor(secretKey: string, timeout: number = 10000) {
      this.secretKey = secretKey
      this.timeout = timeout
    }

    async validate(
      token: string,
      remoteip?: string,
      options: TurnstileOptions = {},
    ): Promise<TurnstileResult> {
      if (!token || typeof token !== 'string') {
        return { success: false, error: 'Invalid token format' }
      }

      if (token.length > 2048) {
        return { success: false, error: 'Token too long' }
      }

      try {
        const formData = new FormData()
        formData.append('secret', this.secretKey)
        formData.append('response', token)

        if (remoteip) {
          formData.append('remoteip', remoteip)
        }

        if (options.idempotencyKey) {
          formData.append('idempotency_key', options.idempotencyKey)
        }

        const response = await axios.post<{
          success: boolean
          action?: string
          hostname?: string
          challenge_ts?: string
          cdata?: string
          'error-codes'?: string[]
        }>('https://challenges.cloudflare.com/turnstile/v0/siteverify', formData, {
          timeout: this.timeout,
        })

        const result = response.data

        if (result.success) {
          if (options.expectedAction && result.action !== options.expectedAction) {
            return {
              success: false,
              error: 'Action mismatch',
              expected: options.expectedAction,
              received: result.action,
            }
          }

          if (options.expectedHostname && result.hostname !== options.expectedHostname) {
            return {
              success: false,
              error: 'Hostname mismatch',
              expected: options.expectedHostname,
              received: result.hostname,
            }
          }
        } else {
          return {
            success: false,
            error: result['error-codes']?.join(', ') || 'Unknown Turnstile Error',
          }
        }

        return {
          success: true,
          action: result.action,
          hostname: result.hostname,
          challenge_ts: result.challenge_ts,
          cdata: result.cdata,
        }
      } catch (error) {
        if (error instanceof AxiosError && error.code === 'ECONNABORTED') {
          return { success: false, error: 'Validation timeout' }
        }
        return { success: false, error: 'Internal error' }
      }
    }
  }

  export default (options: TurnstileOptions = {}): RequestHandler => {
    const secretKey = options.secretKey || import.meta.env.TURNSTILE_SECRET_KEY || ''
    const validator = new TurnstileValidator(secretKey, options.timeout)

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const token = req.body['cf-turnstile-response']
      const remoteip = req.ip

      if (!token || typeof token !== 'string') {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          error: 'Turnstile token is missing',
        })
        return
      }

      const result = await validator.validate(token, remoteip, {
        expectedAction: options.expectedAction,
        expectedHostname: options.expectedHostname,
      })

      if (!result.success) {
        res.status(StatusCodes.FORBIDDEN).json({
          success: false,
          message: 'Turnstile validation failed',
        })
        return
      }

      next()
    }
  }
  ```
- 在路由使用
  ```ts
  router.post('/login', turnstile({ expectedAction: 'login' }), login)
  ```