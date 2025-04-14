import UserSlice, {fetchExit, fetchWithTokenRefresh, setLastURL, initialState} from './UserSlice'
import {mockUser} from "../utils/mockData.ts";

describe('Тестирования слайса данных пользователя', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(UserSlice(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('Должен передать данные пользователя в стейт', () => {
        const action = {
            type: fetchWithTokenRefresh.fulfilled.type,
            payload: mockUser
        }

        const result = UserSlice(initialState, action);

        expect(result.info.name).toEqual(mockUser.user.name)
        expect(result.info.email).toEqual(mockUser.user.email)
    })

    it('Должен сбросить данные пользователя', () => {
        const action = {
            type: fetchExit.fulfilled.type,
        }

        const preLoad = {
            ...initialState,
            info: {
                name: 'test',
                email: 'test@test.ru',
                lastURL: '/',
            }
        }

        const result = UserSlice(preLoad, action);

        expect(result.info).toEqual(initialState.info)
    })

    it('Должен обновить последнюю ссылку, на которой был пользователь', () => {
        const action = {
            type: setLastURL.type,
            payload: '/main'
        }

        const result = UserSlice(initialState, action);

        expect(result.info.lastURL).toEqual('/main');
    })
})