import { atom } from 'recoil';
import EmailMessages from '../mocks/EmailMessages';

export const emptyMessageState = {
    open: false,
}

export const messageControllerState = atom({
    key: 'messageControllerState',
    default: { ...emptyMessageState },
});

export const todoState = atom({
    key: 'todoState',
    default: [],
});

export const inboxState = atom({
    key: 'inboxState',
    default: EmailMessages,
});

export const sentState = atom({
    key: 'sentState',
    default: [],
});

export const draftsState = atom({
    key: 'draftsState',
    default: [],
});