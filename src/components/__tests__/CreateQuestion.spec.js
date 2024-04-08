import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CreateQuestion from "@/components/CreateQuestion.vue";
import TextArea from "@/components/TextArea.vue";
import SliderAnswer from "@/components/SliderAnswer.vue";
import Button from "@/components/Button.vue";
import AnswerCard from "@/components/AnswerCard.vue";
import { QuestionType } from "@/utils/questionType.js";

// Helper function to mount the component with default props
const mountCreateQuestionWithProps = (propsData) => mount(CreateQuestion, { props: propsData });

describe('CreateQuestion', () => {
    describe('Initialization and rendering', () => {
        it('initializes with the correct default question properties', () => {
            const wrapper = mountCreateQuestionWithProps({
                question: {
                    text: 'Is this a question',
                    type: QuestionType.TEXT,
                    points: 100,
                    answers: [{ identifier: Date.now(), text: 'Yes it is', isCorrect: true }],
                },
            });
            expect(wrapper.vm.question.text).toBe('Is this a question');
        });

        it.each([
            { type: QuestionType.TEXT, component: TextArea },
            { type: QuestionType.SLIDE, component: SliderAnswer },
        ])('renders $component for $type question type', async ({ type, component }) => {
            const wrapper = mountCreateQuestionWithProps({ identifier: 'q1', question: { type } });
            expect(wrapper.findComponent(component).exists()).toBe(true);
        });
    });

    describe('Interactions', () => {
        it('emits update-question event on question type change', async () => {
            const wrapper = mountCreateQuestionWithProps({
                identifier: 'q1',
                question: { text: '', type: QuestionType.TEXT, points: 100, answers: [] },
            });
            await wrapper.find('select').setValue('SLIDE');
            expect(wrapper.emitted('update-question')).toBeTruthy();
        });

        it('allows adding a text answer for TEXT question type', async () => {
            const wrapper = mountCreateQuestionWithProps({
                identifier: 'q1',
                question: { type: QuestionType.TEXT, answers: [{ identifier: 'a1', text: '', isCorrect: false }] },
            });
            await wrapper.findComponent(Button).trigger('click');
            expect(wrapper.findAllComponents(AnswerCard).length).toBe(2);
        });

        it('emits delete-question event on question delete', async () => {
            const wrapper = mountCreateQuestionWithProps({
                identifier: 'q1',
                question: { text: 'Sample Question', type: QuestionType.TEXT, points: 100, answers: [] },
            });
            await wrapper.find('.delete-question-btn').trigger('click');
            expect(wrapper.emitted('delete-question')).toBeTruthy();
        });

        it('updates points value on radio button selection', async () => {
            const wrapper = mountCreateQuestionWithProps({
                question: { text: '', type: QuestionType.TEXT, points: 100, answers: [] },
            });
            await wrapper.find('input[value="200"]').setChecked();
            expect(wrapper.emitted('update-question')[0][0].points).toBe(200);
        });

        it.each([100, 200, 300])('updates points value on radio button selection', async (pointsValue) => {
            const wrapper = mountCreateQuestionWithProps({
                question: { text: '', type: QuestionType.TEXT, points: 100, answers: [] },
            });
            await wrapper.find(`input[value="${pointsValue}"]`).setValue(pointsValue);
            expect(wrapper.emitted('update-question')[0][0].points).toBe(pointsValue);
        });
    });

    describe('Question type handling', () => {
        it('correctly handles TRUE_OR_FALSE question type', async () => {
            const wrapper = mountCreateQuestionWithProps({
                question: { type: QuestionType.TRUE_OR_FALSE, answers: [] },
            });
            await wrapper.find('select').setValue(QuestionType.TRUE_OR_FALSE);
            expect(wrapper.vm.localQuestion.answers.length).toBe(2);
            expect(wrapper.vm.localQuestion.answers.map(a => a.text)).toEqual(['True', 'False']);
            expect(wrapper.findAllComponents(AnswerCard).length).toBe(2);
        });
    });

    describe('Answer handling', () => {
        it('emits delete-answer event on answer delete', async () => {
            const wrapper = mountCreateQuestionWithProps({
                identifier: 'q1',
                question: { text: 'Sample Question', type: QuestionType.TEXT, points: 100, answers: [{ identifier: 'a1', text: 'Answer 1', isCorrect: false }] },
            });
            const answerCard = wrapper.findComponent(AnswerCard);
            await answerCard.vm.$emit('delete-answer');
            expect(wrapper.emitted('update-question')[0][0].answers).toEqual([]);
        });

        it('correctly updates an answer and emits update-question event', async () => {
            const initialAnswer = { identifier: 'a1', text: 'Original Answer', isCorrect: false };
            const updatedAnswerText = 'Updated Answer';
            const wrapper = mountCreateQuestionWithProps({
                question: { text: 'Sample Question', type: QuestionType.TEXT, points: 100, answers: [initialAnswer] },
            });

            wrapper.vm.updateAnswer({ ...initialAnswer, text: updatedAnswerText }, initialAnswer.identifier);
            expect(wrapper.emitted('update-question')).toBeTruthy();
            const emittedEvent = wrapper.emitted('update-question')[0][0];
            expect(emittedEvent.answers.find(a => a.identifier === initialAnswer.identifier).text).toBe(updatedAnswerText);
        });

        it('allows creating a TEXT question, adding answers, changing type, and deleting it', async () => {
            const wrapper = mountCreateQuestionWithProps({
                question: { text: '', type: QuestionType.TEXT, points: 100, answers: [] },
            });
            await wrapper.find('textarea').setValue('What is Vue?');
            await wrapper.findComponent(Button).trigger('click');
            await wrapper.find('select').setValue(QuestionType.SLIDE);
            expect(wrapper.findComponent(SliderAnswer).exists()).toBe(true);
            await wrapper.find('.delete-question-btn').trigger('click');
            expect(wrapper.emitted('delete-question')).toBeTruthy();
        });
    });

    describe('Error handling', () => {
        it('enforces character limit in TextArea component', async () => {
            const wrapper = mountCreateQuestionWithProps({
                question: { text: '', type: QuestionType.TEXT, points: 100, answers: [] },
            });
            const longText = 'a'.repeat(250); // Assuming the limit is 200 characters
            await wrapper.find('textarea').setValue(longText);
            expect(wrapper.vm.localQuestion.text.length).toBeLessThanOrEqual(200);
        });

        it('prevents adding more than 4 answers for TEXT question type', async () => {
            const wrapper = mountCreateQuestionWithProps({
                question: {
                    type: QuestionType.TEXT,
                    answers: [
                        { identifier: 'a1', text: 'Answer 1', isCorrect: false },
                        { identifier: 'a2', text: 'Answer 2', isCorrect: false },
                        { identifier: 'a3', text: 'Answer 3', isCorrect: false },
                        { identifier: 'a4', text: 'Answer 4', isCorrect: false },
                    ],
                },
            });
            await wrapper.findComponent(Button).trigger('click'); // Attempt to add a fifth answer
            expect(wrapper.vm.localQuestion.answers.length).toBe(4); // Should still only have 4 answers
        });
    });
});
