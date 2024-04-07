import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AnswerButton from "@/components/AnswerButton.vue";

describe('AnswerButton', () => {
    it('renders AnswerButton properly', () => {
        const wrapper = mount(AnswerButton, {
            props: {
                answerText: 'test',
                isCorrect: true,
                isAnswerSelected: false,
                isTrueOrFalseQuestion: false
            }
        });
        expect(wrapper.text()).toBe('test');
    });

    /**

    it('renders the correct icon when the answer is selected and correct', () => {
        const wrapper = mount(AnswerButton, {
            props: {
                answerText: 'test',
                isCorrect: true,
                isAnswerSelected: true,
                isTrueOrFalseQuestion: false
            }
        });
        const correctIcon = wrapper.find('img[src="@/assets/correct.png"]');
        expect(correctIcon.exists()).toBe(true);
    });
        // */


});