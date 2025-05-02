import debounce from './debounce.ts'
import throttle from './throttle.ts'

export default function registerDirectives(app:any) {
  debounce(app)
  throttle(app)
}
