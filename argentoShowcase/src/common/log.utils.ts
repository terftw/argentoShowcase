export function logError(e: unknown): Error {
    let message: string = (e as any).toString();
    if (e instanceof Error) {
        message = e.message;
    }

    console.error(message);
    return new Error(message);
}