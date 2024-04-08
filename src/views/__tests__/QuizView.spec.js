import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import QuizView from "@/views/QuizView.vue";
import MainLayout from '@/layouts/MainLayout.vue';
import Button from "@/components/Button.vue";
import mainStore from '@/stores/mainStore.js';
import router from "@/router/index.js";

describe('QuizDetailView.vue', () => {
  it('renders correctly', () => {
      const wrapper = mount(QuizView, {
        global: {
          stubs: ['router-link', 'router-view', MainLayout, Button],
          plugins: [mainStore, router]
        }
      });
    expect(wrapper.exists()).toBeTruthy();
  });
});
