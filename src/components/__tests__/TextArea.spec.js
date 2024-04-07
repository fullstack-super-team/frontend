import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TextArea from "@/components/TextArea.vue"; // Adjust the import path to your component's file location

describe('YourComponent', () => {
    it('renders correctly with required props', () => {
        const wrapper = mount(TextArea, {
            props: {
                id: 'test-textarea',
                label: 'Test Label',
                placeholder: 'Test Placeholder',
                modelValue: '',
                charLimit: 100,
                startHeight: 100,
                required: false
            }
        });

        expect(wrapper.find('label').text()).toBe('Test Label');
        expect(wrapper.find('textarea').attributes('placeholder')).toBe('Test Placeholder');
    });

    it('shows the correct remaining characters', async () => {
        const wrapper = mount(TextArea, {
            props: {
                modelValue: 'Test',
                charLimit: 100
            }
        });

        expect(wrapper.text()).toContain('96 characters left');
    });

    it('updates the modelValue correctly', async () => {
        const wrapper = mount(TextArea, {
            props: {
                charLimit: 10
            }
        });

        const textarea = wrapper.find('textarea');
        await textarea.setValue('Test value');
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Test value']);
    });

    it('enforces character limit', async () => {
        const wrapper = mount(TextArea, {
            props: {
                modelValue: '12345678901', // 11 characters
                charLimit: 10
            }
        });

        const textarea = wrapper.find('textarea');
        await textarea.trigger('input');
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['1234567890']); // Should trim to 10 characters
    });

    it('displays error message when provided', () => {
        const wrapper = mount(TextArea, {
            props: {
                errorMessage: 'Error message test'
            }
        });

        expect(wrapper.find('.error-message').text()).toBe('Error message test');
    });
});
