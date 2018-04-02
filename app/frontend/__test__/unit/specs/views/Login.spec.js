import { createLocalVue, shallow } from '@vue/test-utils';
import VeeValidate from 'vee-validate';
import Login from '@/views/Login';

const localVue = createLocalVue();
localVue.use(VeeValidate);

describe('Login.vue', () => {
  it('should render', () => {
    const wrapper = shallow(Login, {
      localVue
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
