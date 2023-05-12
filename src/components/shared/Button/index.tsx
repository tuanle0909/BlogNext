import cls from 'classnames';
import IconLoading from '../IconLoading';
import './button.module.css';

type Props = {
  type: string,
  loading: boolean,
  loadingPos: string,
  size: string,
  as: string,
  htmlType: any,
  className: string,
  children: string,
  onClick: any
}
function Button({
  type = 'default',
  loading = true,
  loadingPos = 'left',
  size = '',
  as = 'button',
  htmlType = '',
  className = '',
  children = '',
  onClick = null,
  ...restProps
}: Props) {
  const classes = cls(
    'btn',
    {
      'btn-default': type === 'default',
      'btn-category': type === 'category',
      'btn-primary': type === 'primary',
      'btn-size-large': size === 'large',
    },
    className
  );

  const content = (
    <>
      {loading && loadingPos === 'left' && <IconLoading width={10} />}
      {children}
      {loading && loadingPos === 'right' && <IconLoading width={10} />}
    </>
  );

  const injectedProps = {
    className: classes,
    type: htmlType,
    onClick: onClick,
    ...restProps,
  };

  if (as === 'a') {
    return <a {...injectedProps}>{content}</a>;
  }

  return <button {...injectedProps}>{content}</button>;
}

export default Button;
