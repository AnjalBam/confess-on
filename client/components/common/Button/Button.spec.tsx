import Button from '.';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';

afterEach(cleanup);

describe('Test Button', () => {
    describe('Test default button', () => {
        it('should render properly', () => {
            render(<Button>Test Button</Button>);
            const buttonText = screen.getByTestId('custom-button');

            expect(buttonText).toBeInTheDocument();
            expect(buttonText).toHaveTextContent('Test Button');
            expect(buttonText).toHaveAttribute('type', 'button');
            expect(buttonText).toHaveClass('bg-primary');
        });
    });

    describe('Test Button variants', () => {
        it('should render the primary button', () => {
            render(<Button primary>Test Button</Button>);
            const button = screen.getByTestId('custom-button');

            expect(button).toBeInTheDocument();
            expect(button).toHaveClass('bg-primary');
        });
        it('should render the secondary button', () => {
            render(<Button secondary>Test Button</Button>);
            const button = screen.getByTestId('custom-button');

            expect(button).toBeInTheDocument();
            expect(button).toHaveClass('bg-secondary');
        });

        it('should render the danger button', () => {
            render(<Button danger>Test Button</Button>);
            const button = screen.getByTestId('custom-button');

            expect(button).toBeInTheDocument();
            expect(button).toHaveClass('bg-danger');
        });

        it('should render the success button', () => {
            render(<Button success>Test Button</Button>);
            const button = screen.getByTestId('custom-button');

            expect(button).toBeInTheDocument();
            expect(button).toHaveClass('bg-success');
        });
    });

    describe('Test Button types', () => {
        it('should have default type of button', () => {
            render(<Button>Test Button</Button>);

            const button = screen.getByTestId('custom-button');

            expect(button).toBeInTheDocument();
            expect(button).toHaveAttribute('type', 'button');
        });

        it('should have type of button if button passed', () => {
            render(<Button type="button">Test Button</Button>);

            const button = screen.getByTestId('custom-button');

            expect(button).toBeInTheDocument();
            expect(button).toHaveAttribute('type', 'button');
        });

        it('should have type of submit if submit passed', () => {
            render(<Button type="submit">Test Button</Button>);

            const button = screen.getByTestId('custom-button');

            expect(button).toBeInTheDocument();
            expect(button).toHaveAttribute('type', 'submit');
        });

        it('should have type of reset if reset passed', () => {
            render(<Button type="reset">Test Button</Button>);

            const button = screen.getByTestId('custom-button');

            expect(button).toBeInTheDocument();
            expect(button).toHaveAttribute('type', 'reset');
        });
    });

    describe('Test Button disabled state', () => {
        it('should not be disabled by default', () => {
            render(<Button>Test</Button>);

            const button = screen.getByTestId('custom-button');

            expect(button).not.toBeDisabled();
        });

        it('should be disabled if passed', () => {
            render(<Button disabled>Test</Button>);

            const button = screen.getByTestId('custom-button');

            expect(button).toBeDisabled();
        });
    });

    describe('Test Button children rendering', () => {
        it('should render children properly', () => {
            const htmlContent = (
                <>
                    <span>Test</span> Button{' '}
                    <span data-testid="test-span">Hello</span>
                </>
            );
            const { getByTestId } = render(<Button>{htmlContent}</Button>);

            const button = screen.getByTestId('custom-button');

            expect(button).toBeInTheDocument();
            expect(button).toHaveTextContent('Test Button Hello');
            expect(getByTestId('test-span')).toBeInTheDocument();
        });
    });

    describe('Test Button loading state', () => {
        it('spinner should be visible by default and button should be disabled', () => {
            const { getByTestId } = render(
                <Button isLoading={true}>Test</Button>
            );

            const button = screen.getByTestId('custom-button');
            const spinner = getByTestId('spinner');

            expect(button).toHaveAttribute('disabled');
            expect(spinner).toBeVisible();
        });
    });

    describe('Test Button onClick', () => {
        it('should call onClick callback', () => {
            const onClick = jest.fn();
            render(<Button onClick={onClick}>Test</Button>);

            const button = screen.getByTestId('custom-button');

            fireEvent.click(button);

            expect(onClick).toHaveBeenCalled();
            expect(onClick).toBeCalledTimes(1);
        });
    });
});
