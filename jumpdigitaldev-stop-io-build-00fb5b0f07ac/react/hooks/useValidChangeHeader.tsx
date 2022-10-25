import { useRuntime } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'

export default () => {
  const { history } = useRuntime()
  const { isMobile } = useDevice()

  return {
    isValid: history?.location?.pathname === '/' || !isMobile
  }

}