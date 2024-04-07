import quizModule from "@/stores/quizModule.js";


vi.mock('axios', () => ({
    get: vi.fn(),
    post: vi.fn(),
}));

describe('mutations', () => {
    let state;

    beforeEach(() => {
        state = {
            quizzes: [],
            recentQuizzes: [],
            quiz: {
                questions: [],
                title: "Test Quiz",
                author: {id: 2, firstName: "Test", lastName: "Test"},
                updatedAt: "01.02.2021",
                description: "Testing testing.",
                category: "Test",
                personalScores: [],
                totalPoints: 0,
            },
            searchedQuizzes: []
        };
    });

    it('setQuizzes sets the quizzes state', () => {
        const quizzes = [{id: 1, title: "Test Quiz"}];
        quizModule.mutations.setQuizzes(state, quizzes);
        expect(state.quizzes).toEqual(quizzes);
    });

    it('setQuiz sets the quiz state and calculates totalPoints', () => {
        const quiz = {
            questions: [{points: 1}, {points: 2}],
            difficultyLevel: 'EASY',
            category: 'FOOD',
        };
        quizModule.mutations.setQuiz(state, quiz);
        expect(state.quiz.questions).toEqual(quiz.questions);
        expect(state.quiz.totalPoints).toBe(3);
        expect(state.quiz.category).toBe(quiz.category);
        expect(state.quiz.difficultyLevel).toBe(quiz.difficultyLevel);
    });

    it('setSearchedQuizzes sets the searchedQuizzes state', () => {
        const searchedQuizzes = [{id: 1, title: "Test Quiz"}];
        quizModule.mutations.setSearchedQuizzes(state, searchedQuizzes);
        expect(state.searchedQuizzes).toEqual(searchedQuizzes);
    });

    it('setPersonalScores sets the personalScores state', () => {
        const personalScores = [{id: 1, score: 100}];
        quizModule.mutations.setPersonalScores(state, personalScores);
        expect(state.quiz.personalScores).toEqual(personalScores);
    });

    it('setRecentQuizzes sets the recentQuizzes state', () => {
        const recentQuizzes = [{id: 1, title: "Test Quiz"}];
        quizModule.mutations.setRecentQuizzes(state, recentQuizzes);
        expect(state.recentQuizzes).toEqual(recentQuizzes);
    });
});