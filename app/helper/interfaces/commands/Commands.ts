export interface Commands {
    run(): Promise<boolean>

    showResult(): void;

    showError(): void;
}