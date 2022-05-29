import { loginInitialData } from "constant";

export type LoginProps = {
    handleSubmit: (values: typeof loginInitialData) => void;
}