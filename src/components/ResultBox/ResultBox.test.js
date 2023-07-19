import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {

    const testCases = [
        { amount: '100', from: 'PLN', to: 'USD' },
        { amount: '20', from: 'USD', to: 'PLN' },
        { amount: '200', from: 'PLN', to: 'USD' },
        { amount: '345', from: 'USD', to: 'PLN' },
        { amount: '550', from: 'PLN', to: 'USD' },
    ];

    for(const testObj of testCases) {
    render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
    }
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('PLN 100.00 = $28.57');
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    render(<ResultBox from='USD' to='PLN' amount={20} />)
    const output = screen.getByTestId('output')
    expect(output).toHaveTextContent('$20.00 = PLN 70.00');
  });

  it('should render proper info when same curreny PLN -> PLN is selected', () => {
    render(<ResultBox from ='PLN' to='PLN' amount={345}/>)
    const output = screen.getByTestId('output')
    expect(output).toHaveTextContent('PLN 345.00 = PLN 345.00');
  });

  it('should render proper info when same curreny USD -> USD is selected', () => {
    render(<ResultBox from ='USD' to='USD' amount={550}/>)
    const output = screen.getByTestId('output')
    expect(output).toHaveTextContent('$550.00 = $550.00');
  });


});