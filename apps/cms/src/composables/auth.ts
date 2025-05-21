
export function useFingerprint() {
  const _fingerprint = ref('')

  const init = async () => {
    const FP = await import('@fingerprintjs/fingerprintjs')

    const fp = await FP.load()

    const result = await fp.get()

    return result.visitorId
  }

  init().then((res) => _fingerprint.value = res)

  return _fingerprint
}

export const useSharedFingerprint = createSharedComposable(useFingerprint)