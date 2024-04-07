import { describe, it, expect, beforeEach, vi } from 'vitest';
import {getQuestionTypeLabel, getQuestionTypes, QuestionType} from "@/utils/questionType.js";

describe('QuestionType', () => {
    it('should have the correct values', () => {
        expect(QuestionType.TEXT).toBe('TEXT');
        expect(QuestionType.SLIDE).toBe('SLIDE');
        expect(QuestionType.TRUE_OR_FALSE).toBe('TRUE_OR_FALSE');
    });
});

describe('getQuestionTypes', () => {
    it('should return an array of question types', () => {
        const types = getQuestionTypes();
        expect(types).toEqual([
            {
                label: 'Text',
                value: 'TEXT'
            },
            {
                label: 'Slide',
                value: 'SLIDE'
            },
            {
                label: 'True or False',
                value: 'TRUE_OR_FALSE'
            }
        ]);
    });
});

describe('getQuestionTypeLabel', () => {
    it('should return the correct label for a given question type', () => {
        expect(getQuestionTypeLabel('TEXT')).toBe('Text');
        expect(getQuestionTypeLabel('SLIDE')).toBe('Slide');
        expect(getQuestionTypeLabel('TRUE_OR_FALSE')).toBe('True or False');
    });

    it('should return "Unknown" for an unknown question type', () => {
        expect(getQuestionTypeLabel('unknown')).toBe('Unknown');
    });
});