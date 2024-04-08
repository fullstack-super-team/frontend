import { mount } from '@vue/test-utils';
import QuizCard from '@/components/QuizCard.vue';
import { describe, it, expect } from 'vitest';

describe('QuizCard', () => {

    it('applies a random background color from the specified array', async () => {
        const quiz = {
            id: 2,
            title: '',
            category: '',
            questions: '',
            numberOfQuestions: 0,
        };

        const wrapper = mount(QuizCard, {
            props: { quiz },
            global: {
                stubs: {
                    RouterLink: true,
                },
            },
        });

        const backgroundColor = wrapper.find('.quiz-card-holder').element.style.backgroundColor;
        const expectedColors = ['#ff914d', '#1792ea', '#78d64f', '#8c52ff'].map(color =>
            rgb(color)
        );
        expect(expectedColors).toContain(backgroundColor);
    });
});

function rgb(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
}
