import { describe, it, expect, beforeEach, vi } from 'vitest';
import userModule from "@/stores/userModule.js";


describe('mutations', () => {
    let state;

    beforeEach(() => {
        state = {
            id: "",
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            token: "",
            isLoggedIn: false
        };
    });

    it('setUserInfo sets the user state', () => {
        const user = {
            id: 1,
            firstName: "firstName",
            lastName: "lastName",
            username: "username",
            email: "email",
            token: "token",
            isLoggedIn: true
        };
        userModule.mutations.setUserInfo(state, user);
        expect(state.id).toBe(user.id);
        expect(state.firstName).toBe(user.firstName);
        expect(state.lastName).toBe(user.lastName);
        expect(state.username).toBe(user.username);
        expect(state.email).toBe(user.email);
        expect(state.token).toBe(user.token);
        expect(state.isLoggedIn).toBe(user.isLoggedIn);
    });
});