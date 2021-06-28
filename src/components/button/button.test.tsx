import { render,fireEvent } from '@testing-library/react'
import Button from './button'

test('button是否存在文档中', () => {
    const wrapper = render(<Button>default</Button>);
    const element = wrapper.getByText('default');
    expect(element).toBeInTheDocument();
    expect(element.parentElement?.tagName).toEqual('BUTTON');
})

describe('测试button组件', () => {
    test('测试button组件的type属性', () => {
        const wrapper = render(<Button type='primary'>primary</Button>);
        const element = wrapper.getByText('primary');
        expect(element).toBeInTheDocument();
        const dom = element.parentElement;
        expect(dom?.tagName).toEqual('BUTTON');
        expect(dom).toHaveClass('rrw-btn-primary')
    });
    test('测试button组件的点击事件', () => {

        const defaultProps =  {onClick:jest.fn()};
        const wrapper = render(<Button {...defaultProps}>default</Button>);
        const element = wrapper.getByText('default');
        expect(element).toBeInTheDocument();
        const dom = element.parentElement as HTMLElement;
        fireEvent.click(dom);
        expect(defaultProps.onClick).toHaveBeenCalled();
        
    });
})
