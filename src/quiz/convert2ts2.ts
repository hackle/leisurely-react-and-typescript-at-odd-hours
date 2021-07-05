
class Eat { 
    food: string | undefined;
}
class Work { profession: string | undefined; slack: number | undefined }
class Sleep { dream: string | undefined; duration: number | undefined }

type SomeEvent = Eat | Work | Sleep;

function handleEvent(event: SomeEvent) : string {
    if (event instanceof Eat) {
        return `Enjoy your ${event.food}`;
    }
    if (event instanceof Sleep) return `You will dream about ${event.dream} for ${event.duration} hours`;
    if (event instanceof Work) return `A job in ${event.profession} is tough but you can always ${event.slack}!`;

    return '';
}

export default {};