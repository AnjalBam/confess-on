import Button from 'components/common/Button';
import InputField from 'components/common/Input';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { PostData } from 'services/services.types';
import { AddPostProps } from './AddPost.types';

const AddPost:React.FC<AddPostProps> = ({addPost, isAddPostLoading}) => {
    const initialValues: PostData = {
        description: '',
        visibility: 'public',
    }
    const [post, setPost] = React.useState<PostData>(initialValues);

    const handleSubmit = async (values: PostData, actions: FormikHelpers<PostData>) => {
        actions.resetForm();
        await addPost(values);
    }

    return (
        <div className="p-4 shadowed rounded-lg md:mt-4">
            <Formik initialValues={post} onSubmit={handleSubmit} enableReinitialize>
                {({ isSubmitting }) => {
                    return (
                        <Form className="flex flex-col">
                            <div>
                                <InputField
                                    as="textarea"
                                    name="description"
                                    validate={false}
                                    placeholder="What are you thinking?"
                                    className={'h-32 text-slate-500 bg-light border-2 rounded-lg border-slate-100'}
                                    required
                                />
                            </div>
                            <InputField
                                as="select"
                                name="visibility"
                                className="w-1/2 text-slate-400 self-end bg-light border-2  rounded-lg border-slate-100"
                                validate={false}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="anonymous">Anonymous</option>
                            </InputField>
                            <Button
                                type="submit"
                                isLoading={isSubmitting || isAddPostLoading}
                                disabled={isSubmitting || isAddPostLoading}
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
