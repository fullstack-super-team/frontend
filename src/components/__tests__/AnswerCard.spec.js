import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AnswerCard from "@/components/AnswerCard.vue";

describe('AnswerCard', () => {
    it('renders AnswerCard properly', () => {
        const wrapper = mount(AnswerCard, {
            props: {
                identifier: 'test1',
                answer: { text: 'Answer 1', isCorrect: true },
                deletable: true,
                readonly: false
            }
        });
        const input = wrapper.find('input[type="text"]');
        const checkbox = wrapper.find('input[type="checkbox"]');
        expect(input.element.value).toBe('Answer 1');
        expect(checkbox.element.checked).toBe(true);
    });

    it('emits an update-answer event on input and checkbox change', async () => {
        const wrapper = mount(AnswerCard, {
            props: {
                identifier: 'test2',
                answer: { text: '', isCorrect: false },
                deletable: false,
                readonly: false
            }
        });
        const input = wrapper.find('input[type="text"]');
        await input.setValue('New Answer');
        expect(wrapper.emitted('update-answer')[0][0]).toEqual({ text: 'New Answer', isCorrect: false });

        const checkbox = wrapper.find('input[type="checkbox"]');
        await checkbox.setChecked();
        expect(wrapper.emitted('update-answer')[1][0]).toEqual({ text: 'New Answer', isCorrect: true });
    });

    it('emits a delete-answer event on delete button click', async () => {
        const wrapper = mount(AnswerCard, {
            props: {
                identifier: 'test3',
                answer: { text: 'Answer 3', isCorrect: false },
                deletable: true,
                readonly: false
            }
        });
        const deleteButton = wrapper.find('button.answer-card-btn');
        await deleteButton.trigger('click');
        expect(wrapper.emitted('delete-answer')).toBeTruthy();
    });

    it('does not show delete button when deletable prop is false', () => {
        const wrapper = mount(AnswerCard, {
            props: {
                identifier: 'test4',
                answer: { text: 'Answer 4', isCorrect: false },
                deletable: false,
                readonly: false
            }
        });
        const deleteButton = wrapper.find('button.answer-card-btn');
        expect(deleteButton.exists()).toBe(false);
    });

    it('disables text input when readonly prop is true', () => {
        const wrapper = mount(AnswerCard, {
            props: {
                identifier: 'test5',
                answer: { text: 'Answer 5', isCorrect: true },
                deletable: true,
                readonly: true
            }
        });
        const input = wrapper.find('input[type="text"]');
        expect(input.attributes('disabled')).toBeDefined();
    });
});
