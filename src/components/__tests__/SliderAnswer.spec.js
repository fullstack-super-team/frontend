import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SliderAnswer from '@/components/SliderAnswer.vue';

// Mock Slider component
const MockSlider = {
    template: '<div></div>',
    props: ['id', 'min', 'max', 'stepSize', 'modelValue', 'isCorrect'],
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const updateModelValue = (newValue) => {
            emit('update:modelValue', newValue);
        };
        return { updateModelValue };
    }
};

describe('SliderAnswer.vue', () => {
    // Test initializing with explicit props
    it('initializes with explicit props', () => {
        const answerProps = {
            min: 0,
            max: 5,
            stepSize: 1,
            correctValue: 3
        };

        const wrapper = mount(SliderAnswer, {
            props: {
                answer: answerProps
            },
            global: {
                stubs: {
                    Slider: MockSlider
                }
            }
        });

        expect(wrapper.vm.props.answer.min).toBe(answerProps.min);
        expect(wrapper.vm.props.answer.max).toBe(answerProps.max);
        expect(wrapper.vm.props.answer.stepSize).toBe(answerProps.stepSize);
        expect(wrapper.vm.props.answer.correctValue).toBe(answerProps.correctValue);
    });

    // Test updating minimum value
    it('updates the minimum value when input changes', async () => {
        const wrapper = mount(SliderAnswer, {
            props: {
                answer: {
                    min: 0,
                    max: 10,
                    stepSize: 1,
                    correctValue: 5
                }
            },
            global: {
                stubs: {
                    Slider: MockSlider
                }
            }
        });

        const minValueInput = wrapper.find('input[id$="_min"]');
        await minValueInput.setValue('1');
        expect(wrapper.vm.props.answer.min).toBe(1);
    });

    // Test updating maximum value
    it('updates the maximum value when input changes', async () => {
        const wrapper = mount(SliderAnswer, {
            props: {
                answer: {
                    min: 0,
                    max: 10,
                    stepSize: 1,
                    correctValue: 5
                }
            },
            global: {
                stubs: {
                    Slider: MockSlider
                }
            }
        });

        const maxValueInput = wrapper.find('input[id$="_max"]');
        await maxValueInput.setValue('10');
        expect(wrapper.vm.props.answer.max).toBe(10);
    });

    // Test updating step size
    it('updates the step size when input changes', async () => {
        const wrapper = mount(SliderAnswer, {
            props: {
                answer: {
                    min: 0,
                    max: 10,
                    stepSize: 1,
                    correctValue: 5
                }
            },
            global: {
                stubs: {
                    Slider: MockSlider
                }
            }
        });

        const stepSizeInput = wrapper.find('input[id$="_stepSize"]');
        await stepSizeInput.setValue('2');
        expect(wrapper.vm.props.answer.stepSize).toBe(2);
    });

    // Additional tests for SliderAnswer.vue

// Test initialization with default props when no props are passed
    it('initializes with default props when no explicit props are provided', () => {
        const defaultAnswerProps = {
            min: 0,
            max: 5,
            stepSize: 1,
            correctValue: 3
        };

        const wrapper = mount(SliderAnswer, {
            global: {
                stubs: {
                    Slider: MockSlider
                }
            }
        });

        expect(wrapper.vm.props.answer.min).toBe(defaultAnswerProps.min);
        expect(wrapper.vm.props.answer.max).toBe(defaultAnswerProps.max);
        expect(wrapper.vm.props.answer.stepSize).toBe(defaultAnswerProps.stepSize);
        expect(wrapper.vm.props.answer.correctValue).toBe(defaultAnswerProps.correctValue);
    });

// Test updating the correct answer value through user input
    it('updates the correct answer value when the corresponding input changes', async () => {
        const initialCorrectValue = 3;
        const newCorrectValue = 4;

        const wrapper = mount(SliderAnswer, {
            props: {
                answer: {
                    min: 0,
                    max: 10,
                    stepSize: 1,
                    correctValue: initialCorrectValue
                }
            },
            global: {
                stubs: {
                    Slider: MockSlider
                }
            }
        });

        const correctValueInput = wrapper.find('input[id$="_correctValue"]');
        await correctValueInput.setValue(newCorrectValue);
        expect(wrapper.vm.props.answer.correctValue).toBe(newCorrectValue);
    });

// Test ensuring that the Slider component receives the correct props
    it('passes the correct props to the Slider component', async () => {
        const answerProps = {
            min: 1,
            max: 10,
            stepSize: 2,
            correctValue: 5
        };

        const wrapper = mount(SliderAnswer, {
            props: {
                answer: answerProps
            },
            global: {
                stubs: {
                    Slider: MockSlider
                }
            }
        });

        const sliderComponent = wrapper.findComponent(MockSlider);
        expect(sliderComponent.props('min')).toBe(answerProps.min);
        expect(sliderComponent.props('max')).toBe(answerProps.max);
        expect(sliderComponent.props('stepSize')).toBe(answerProps.stepSize);
        expect(sliderComponent.props('modelValue')).toBe(answerProps.correctValue);
    });
});
