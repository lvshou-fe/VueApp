import { shallow } from '@vue/test-utils';
import Home from '@/views/Home';

describe('Home.vue', () => {
  it('should render', () => {
    const wrapper = shallow(Home);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
