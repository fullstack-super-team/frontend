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



    it('renders the correct icon when the answer is selected and correct', async () => {
        const wrapper = mount(AnswerButton, {
            props: {
                answerText: 'test',
                isCorrect: true,
                isAnswerSelected: true,
                isTrueOrFalseQuestion: false
            }
        });
        const correctIcon = wrapper.find('img');

        expect(correctIcon.exists()).toBe(true);
        expect(correctIcon.attributes('src')).toBe('/src/assets/correct.png');
    });

    it('renders the correct icon when the answer is selected and incorrect', async () => {
        const wrapper = mount(AnswerButton, {
            props: {
                answerText: 'test',
                isCorrect: false,
                isAnswerSelected: true,
                isTrueOrFalseQuestion: false
            }
        });
        const correctIcon = wrapper.find('img');

        expect(correctIcon.exists()).toBe(true);
        expect(correctIcon.attributes('src')).toBe('/src/assets/wrong.png');
    });

    it('renders the correct icon when the answer text is "True", answer is not selected and the question is a true or false question', async () => {
        const wrapper = mount(AnswerButton, {
            props: {
                answerText: 'True',
                isCorrect: true,
                isAnswerSelected: false,
                isTrueOrFalseQuestion: true
            }
        });
        const correctIcon = wrapper.find('img');

        expect(correctIcon.exists()).toBe(true);
        expect(correctIcon.attributes('src')).toBe('/src/assets/thumbsUp.png');
    });

    it('renders the correct icon when the answer text is "False", answer is not selected and the question is a true or false question', async () => {
        const wrapper = mount(AnswerButton, {
            props: {
                answerText: 'False',
                isCorrect: false,
                isAnswerSelected: false,
                isTrueOrFalseQuestion: true
            }
        });
        const correctIcon = wrapper.find('img');

        expect(correctIcon.exists()).toBe(true);
        expect(correctIcon.attributes('src')).toBe('/src/assets/thumbsDown.png');
    });

});