import { createLocalVue, shallow } from 'vue-test-utils';
import VeeValidate from 'vee-validate';
import Login from '@/components/Login';

const localVue = createLocalVue();
localVue.use(VeeValidate);

describe('Login.vue', () => {
  it('should render login form with correct content', () => {
    const wrapper = shallow(Login, {
      localVue
    });

    expect(wrapper.contains('form[name="login-form"]')).to.eq(true);
    expect(wrapper.findAll('input').length).to.equal(2);
    expect(wrapper.contains('button[type="submit"]')).to.eq(true);
  });
});
