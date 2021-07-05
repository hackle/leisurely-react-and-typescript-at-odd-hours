let memoised: Record<number, Function> = {};

function useCallback(id: number, fn: Function) {
    if (!memoised[id]) {
        memoised[id] = fn;
    }

    return memoised[id];
}

function component(props: Record<any, any>) {
    const getName = useCallback(0, () => props.name);

    return getName();
}

describe('closure', () => {
    xit('keeps count of states', () => {
        const name1 = component({ name: 'George' });
        const name2 = component({ name: 'Jerry' });

        expect(name1).toEqual('George');
        expect(name2).toEqual('Jerry');
    })
})

export {};
