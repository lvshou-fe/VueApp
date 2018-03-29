import { createLocalVue, shallow } from '@vue/test-utils';
import VeeValidate from 'vee-validate';
import Register from '@/views/Register';

const localVue = createLocalVue();
localVue.use(VeeValidate);

describe('Register.vue', () => {
  it('should render', () => {
    const wrapper = shallow(Register, {
      localVue
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
