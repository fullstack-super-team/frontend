import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from "@/components/Button.vue";

describe('Button', () => {
    it('renders slot content for custom button text', () => {
        const wrapper = mount(Button, {
            slots: {
                default: 'Click Me'
            }
        });
        expect(wrapper.text()).toBe('Click Me');
    });

    it('emits the click event when the button is clicked', async () => {
        const wrapper = mount(Button);
        await wrapper.trigger('click');
        expect(wrapper.emitted()).toHaveProperty('click');
    });

    it('accepts a type prop and sets the button type accordingly', () => {
        const buttonType = 'submit';
        const wrapper = mount(Button, {
            props: { type: buttonType }
        });
        expect(wrapper.find('button').attributes('type')).toBe(buttonType);
    });

    it('has default type "button" when no type prop is provided', () => {
        const wrapper = mount(Button);
        expect(wrapper.find('button').attributes('type')).toBe('button');
    });

    it('applies default styling to the button', () => {
        const wrapper = mount(Button);
        const button = wrapper.find('button');
        expect(button.classes()).toContain('btnClass');
    });
});
