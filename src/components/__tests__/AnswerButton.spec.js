import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AnswerButton from "@/components/AnswerButton.vue";

describe('AnswerButton', () => {
    it('Plz run', () => {
        const wrapper = mount(AnswerButton, {
            props: {
                answer: 'test',
                correctAnswer: 'test',
                isAnswered: false
            }
        });
        expect(wrapper.text()).toBe('test');
    });
});