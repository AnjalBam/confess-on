import { ErrorMessage, Field, FieldAttributes, useField } from "formik";
import { FC } from "react";

const InputField: FC<FieldAttributes<any>> = ({ name, ...rest }) => {
    const [field, meta, helpers] = useField(name);
    return (
        <div className="mb-2">
            <Field
                className={`px-4 py-2 w-full rounded-lg shadow-sm ${
                    meta.touched &&
                    (meta.error
                        ? "border-2 border-red-300"
                        : "border-2 border-green-300")
                } focus:outline-none`}
                name={name}
                {...rest}
            />
            <ErrorMessage
                name={name}
                component="p"
                className="text-sm text-right text-red-400"
            />
        </div>
    );
};

export default InputField;
