import {Middleware} from '@reduxjs/toolkit';
import {getSuccessIds, getInProgressIds, formatOrders} from "./functions";

export type WSActionTypes = {
    connect: string;
    disconnect: string;
    onMessage: string;
};

interface WSAction<T = any> {
    type: string;
    payload?: T;
}

interface ConnectActionPayload {
    url: string;
    token?: string;
}

export const createSocketMiddleware = (actions: WSActionTypes): Middleware => {
    return store => {
        let socket: WebSocket | null = null;

        return next => action => {
            const {dispatch, getState} = store;

            // Connect
            if (!action || typeof action !== 'object' || !('type' in action)) {
                return next(action as never);
            }

            const wsAction = action as WSAction;
            if (wsAction.type === actions.connect && !socket) {
                if (!wsAction.payload) {
                    console.error('Payload is required for connect action');
                    return next(wsAction);
                }

                // Добавляем проверку типа для payload
                const payload = wsAction.payload as ConnectActionPayload;
                const {url, token} = payload;
                const wsUrl = token ? `${url}?token=${token}` : url;

                socket = new WebSocket(wsUrl);


                socket.onmessage = (event) => {
                    try {
                        const {total, totalToday, orders} = JSON.parse(event.data);
                        const {ingredients} = getState().Ingredients;

                        const processData = {
                            total,
                            today: totalToday,
                            successId: getSuccessIds(orders),
                            inProgressId: getInProgressIds(orders),
                            orders: formatOrders(orders, ingredients)
                        }
                        dispatch({type: actions.onMessage, payload: processData});
                    } catch (error) {
                        console.error('WS message parse error:', error);
                    }
                };
            }

            // Disconnect
            if (action.type === actions.disconnect && socket) {
                socket.close();
            }

            return next(action);
        };
    };
};