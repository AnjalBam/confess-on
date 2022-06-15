import Button from 'components/common/Button';
import InputField from 'components/common/Input';
import { Form, Formik } from 'formik';
import React from 'react';

const AddPost = () => {
    const [post, setPost] = React.useState({
        description: '',
        visibility: 'public',
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };
    const handleSubmit = (values: typeof post) => {
        console.log(values);
    };
    return (
        <div className="p-4">
            <Formik initialValues={post} onSubmit={handleSubmit}>
                {({ isSubmitting }) => {
                    return (
                        <Form className="flex flex-col">
                            <div>
                                <InputField
                                    as="textarea"
                                    name="description"
                                    validate={false}
                                    placeholder="What are you thinking?"
                                    className={'h-32 text-slate-500'}
                                    required
                                />
                            </div>
                            <InputField
                                as="select"
                                name="visibility"
                                className="w-1/2 text-slate-400 self-end"
                                validate={false}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="anonymous">Anonymous</option>
                            </InputField>
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                disabled={isSubmitting}
                                className="self-end">
                                Post
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default AddPost;
