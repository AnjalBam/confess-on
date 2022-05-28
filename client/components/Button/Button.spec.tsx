import Button from '.';
import {screen, render} from '@testing-library/react'
 
describe('Test Button', () => { 
    it('should render properly', () => {
        render(<Button>Test Button</Button>)
        const buttonText = screen.getByTestId('custom-button')

        expect(buttonText).toBeInTheDocument();
        expect(buttonText).toHaveTextContent('Test Button');
        expect(buttonText).toHaveAttribute('type', 'button');
        expect(buttonText).toHaveClass('bg-primary');
    })

    it("should render the primary button", () => {
        render(<Button primary>Test Button</Button>)
        const button = screen.getByTestId('custom-button')

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-primary');
    }) 
    it("should render the secondary button", () => {
        render(<Button secondary>Test Button</Button>)
        const button = screen.getByTestId('custom-button')

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-secondary');
    })

    it("should render the danger button", () => {
        render(<Button danger>Test Button</Button>)
        const button = screen.getByTestId('custom-button')

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-danger');
    }) 

    it("should render the success button", () => {
        render(<Button success>Test Button</Button>)
        const button = screen.getByTestId('custom-button')

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-success');
    }) 
 })