export class ErrorMsg{
    private static instance: ErrorMsg;
    private static error = "";

    public static registerError(error:string): void{
        if (!ErrorMsg.instance) {
            ErrorMsg.instance = new ErrorMsg();
        }
        ErrorMsg.error = error;
        ErrorMsg.raiseError();
        
    }

    private static raiseError(): void {
        if(ErrorMsg.error)
            throw new Error(ErrorMsg.error);
    }
}