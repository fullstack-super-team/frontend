import { describe, it, expect, beforeEach, vi } from 'vitest';
import {formatDate, formatDateWithTime} from "@/utils/dateFormatter.js";


describe('formatDate', () => {
    it('should format the date correctly', () => {
        const date = new Date('2024-01-01T00:00:00.000Z');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('01.01.2024');
    });
});

describe('formatDateWithTime', () => {
    it('should format the date with time correctly', () => {
        const date = new Date('2024-01-01 21:30');
        const formattedDate = formatDateWithTime(date);
        expect(formattedDate).toBe('01.01.2024 21:30');
    });
});