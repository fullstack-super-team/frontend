import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DashboardView from '@/views/DashboardView.vue';

describe('DashboardView.vue', () => {
  it ('renders correctly', async () => {
    const wrapper = mount(DashboardView, {
      global: {
        stubs: ['router-link', 'router-view']
      }
    });
    expect(wrapper.exists()).toBeTruthy();
  });

    it ('has a title', async () => {
        const wrapper = mount(DashboardView, {
        global: {
            stubs: ['router-link', 'router-view']
        }
        });
        expect(wrapper.find('h1').text()).toBe('Dashboard');
    });
});