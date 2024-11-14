import HelloWorld from '@/components/HelloWorld.vue'
import { mount } from '@vue/test-utils'

describe('helloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
