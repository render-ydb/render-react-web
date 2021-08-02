import { render } from '@testing-library/react'
import Icon from './icon'

test('icon是否存在文档中', () => {
    const wrapper = render(<Icon name='AimOutlined'></Icon>);
    const element = wrapper.getByRole('img');
    expect(element).toBeInTheDocument();
})

describe('测试icon组件是否显示对应的主题色', () => {
    test('icon primary主题', () => {
        const wrapper = render(<Icon name='AimOutlined' theme='primary'></Icon>);
        const element = wrapper.getByRole('img');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('rrw-icon-primary')
    });
    test('icon success主题', () => {
        const wrapper = render(<Icon name='AimOutlined' theme='success'></Icon>);
        const element = wrapper.getByRole('img');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('rrw-icon-success')
    });
    test('icon info主题', () => {
        const wrapper = render(<Icon name='AimOutlined' theme='info'></Icon>);
        const element = wrapper.getByRole('img');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('rrw-icon-info')
    });
    test('icon error主题', () => {
        const wrapper = render(<Icon name='AimOutlined' theme='error'></Icon>);
        const element = wrapper.getByRole('img');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('rrw-icon-error')
    });
})
