import { describe, it, expect, beforeEach, vi } from 'vitest';
import gameModule from "@/stores/gameModule.js";


vi.mock('axios', () => ({
    get: vi.fn(),
    post: vi.fn(),
}));

describe('mutations', () => {
    let state;

    beforeEach(() => {
        state = {
            quiz: {
                id: 1,
                questions: [],
                currentQuestionNumber: 0,
            },
            answers: [],
            currentQuestion: {
                id: 1,
                text: "",
                type: "",
                answers: [],
            },
            highScoreList: [],
            currentPoints: 0,
            totalPoints: 0,
        };
    });

    it('setQuiz sets the quiz state', () => {
        const payload = {
            id: 1,
            questions: [],
            currentQuestionNumber: 0,
        };
        gameModule.mutations.setQuiz(state, payload);
        expect(state.quiz).toEqual(payload);
    });

    it('setCurrentQuestion updates the currentQuestion state', () => {
        const payload = {
            id: 1,
            text: "",
            type: "",
            answers: [],
        };
        gameModule.mutations.setCurrentQuestion(state, payload);
        expect(state.currentQuestion).toEqual(payload);
    });

    it('setCurrentQuestionNumber updates the currentQuestionNumber in quiz', () => {
        const payload = 1;
        gameModule.mutations.setCurrentQuestionNumber(state, payload);
        expect(state.quiz.currentQuestionNumber).toBe(payload);
    });

    it('addAnswer adds a new answer to the answers array', () => {
        const payload = 'answer';
        gameModule.mutations.addAnswer(state, payload);
        expect(state.answers).toContain(payload);
    });

    it('setAnswers sets the answers array', () => {
        const payload = ['answer1', 'answer2'];
        gameModule.mutations.setAnswers(state, payload);
        expect(state.answers).toEqual(payload);
    });

    it('setHighScoreList updates the highScoreList state', () => {
        const payload = ['score1', 'score2'];
        gameModule.mutations.setHighScoreList(state, payload);
        expect(state.highScoreList).toEqual(payload);
    });

    it('setCurrentPoints sets the currentPoints', () => {
        const payload = 10;
        gameModule.mutations.setCurrentPoints(state, payload);
        expect(state.currentPoints).toBe(payload);
    });

    it('addPoints adds points to currentPoints', () => {
        const payload = 10;
        gameModule.mutations.addPoints(state, payload);
        expect(state.currentPoints).toBe(payload);
    });

    it('setTotalPoints sets the totalPoints state', () => {
        const payload = 100;
        gameModule.mutations.setTotalPoints(state, payload);
        expect(state.totalPoints).toBe(payload);
    });
});