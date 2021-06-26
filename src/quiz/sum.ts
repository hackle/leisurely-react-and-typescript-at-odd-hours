type Product = {
    foo: boolean,
    bar: boolean
};

// let foo: unknown = 1;
// const sum1 = foo + 1; 

// const product: Product = { bar: null, foo: true  }

type Weekend = 'Saturday' | 'Sunday';

type Exclude1<T, U> = T extends U ? never : T

type Sat = Exclude1<Weekend, 'Sunday'>;

let x1: [boolean, string] = [true, 'love'];
let x2 = [true, 'love'] as const;

// function tNumber(wnd: Weekend) {
//     switch (wnd) {
//         case Saturday: return 6;
//         case 'Sunday': return 7;
//     }
// }

const p1 = { foo: 'foo1', bar: 'bar1' } as const;
type KeysOfP1 = keyof (typeof p1);
type ValuesOfP1 = (typeof p1)[KeysOfP1];

const fieldOfP1: KeysOfP1 = 'bar';
const valueOfP1: ValuesOfP1 = 'bar1';

let m1: Product = {foo: true, bar: false};
let m2 = { foo: true } as Product;

// x = [false, 'hate'];


const x = [true, 'love'];

// const isdate = new Date() instanceof Date;

function format(u: boolean | string): string {
    if (typeof u == 'boolean') {
        return u ? `It's true` : `It's false`;
    }

    return u;
}

type Person = { type: 'PERSON', firstName: string, lastName: string };
type Company = { type: 'COMPANY', legalName: string };

// type guard
function isPerson(u: unknown): u is Person {
    return typeof (u as any)?.firstName === 'string';
}

function toName(u: Person | Company): string {
    if (isPerson(u)) {
        return u.firstName;
    }

    return u.legalName;
}

type Hello = `hello ${Uppercase<Weekend>}`;
const h1: Hello = 'hello SATURDAY';

export {};