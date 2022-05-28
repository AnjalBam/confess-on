import Button from '.';
import {screen, render} from '@testing-library/react'
 
describe('Test Button', () => { 
    it('should render properly', () => {
        render(<Button>Test Button</Button>)
        const buttonText = screen.getByText('Test Button')
        expect(buttonText).toHaveTextContent('Test Button');
    })
 })