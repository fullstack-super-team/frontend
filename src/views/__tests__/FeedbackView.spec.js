import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'
import FeedbackView from '@/views/FeedbackView.vue';

describe('FeedbackView.vue', () => {
  it('renders correctly', async () => {
    const wrapper = mount(FeedbackView, {
      global: {
        stubs: ['router-link', 'router-view']
      }
    });
    // Add your assertions here   
    expect(wrapper.exists()).toBeTruthy();
  });
});