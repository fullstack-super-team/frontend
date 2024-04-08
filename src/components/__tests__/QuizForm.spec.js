import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import QuizForm from '@/components/QuizForm.vue';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import {defineComponent} from "vue";

export default defineComponent({
    components: {Input, Button}
})

vi.mock('./Button.vue', () => ({ template: '<Button></Button>' }));
vi.mock('./Input.vue', () => ({ template: '<Input />' }));
vi.mock('./TextArea.vue', () => ({ template: '<TextArea></TextArea>' }));
vi.mock('./CreateQuestion.vue', () => ({ template: '<div></div>', props: ['question', 'questionErrors'], emits: ['update-question', 'delete-question'] }));

describe('QuizForm.vue', () => {
    it('initializes with provided props', () => {
        const wrapper = mount(QuizForm, {
            props: {
                formTitle: 'Create Quiz',
                submitFormText: 'Submit Quiz',
                initialValues: {
                    title: 'Test Quiz',
                    description: 'A quiz for testing.',
                    category: 'general',
                    difficultyLevel: 'easy',
                    questions: [],
                },
                onSubmit: vi.fn(),
            }
        });

        expect(wrapper.props().formTitle).toBe('Create Quiz');
        expect(wrapper.props().submitFormText).toBe('Submit Quiz');
        expect(wrapper.props().initialValues.title).toBe('Test Quiz');
    });

    it('adds a new question to the quiz', async () => {
        const wrapper = mount(QuizForm, {
            props: {
                formTitle: 'Create Quiz',
                onSubmit: vi.fn(),
            }
        });

        await wrapper.vm.addQuestion();
        expect(wrapper.vm.quiz.questions.length).toBeGreaterThan(0);
    });

    it('validates that form is invalid with empty quiz title', async () => {
        const wrapper = mount(QuizForm, {
            props: {
                formTitle: 'Create Quiz',
                onSubmit: vi.fn(),
            }
        });

        await wrapper.vm.emitSubmit();
        expect(wrapper.vm.formErrors.title).not.toBe('');
    });

    it('submits the form when data is valid', async () => {
        const onSubmitMock = vi.fn();
        const wrapper = mount(QuizForm, {
            props: {
                formTitle: 'Create Quiz',
                onSubmit: onSubmitMock,
                initialValues: {
                    title: 'Valid Quiz Title',
                    questions: [{
                        identifier: 'q0',
                        text: 'Valid Question',
                        type: 'text',
                        answers: [{ identifier: 'q0-a0', text: 'Valid Answer', isCorrect: true }]
                    }]
                }
            }
        });

        await wrapper.vm.emitSubmit();
        expect(onSubmitMock).toHaveBeenCalled();
    });


    it('deletes a question from the quiz', async () => {
        const wrapper = mount(QuizForm, {
            props: {
                formTitle: 'Create Quiz',
                onSubmit: vi.fn(),
                initialValues: {
                    title: 'Quiz With Questions',
                    questions: [
                        {
                            identifier: 'q1',
                            text: 'First Question',
                            type: 'text',
                            answers: [{ identifier: 'q1-a1', text: 'First Answer', isCorrect: true }]
                        },
                        {
                            identifier: 'q2',
                            text: 'Second Question',
                            type: 'text',
                            answers: [{ identifier: 'q2-a1', text: 'Second Answer', isCorrect: true }]
                        }
                    ]
                }
            }
        });

        expect(wrapper.vm.quiz.questions.length).toBe(2);

        await wrapper.vm.deleteQuestion('q1');

        expect(wrapper.vm.quiz.questions.length).toBe(1);
        expect(wrapper.vm.quiz.questions.find(q => q.identifier === 'q1')).toBeUndefined();
    });
});
